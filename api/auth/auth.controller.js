const userModel = require("./auth.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const uuid = require("uuid");
//const sgMail = require("@sendgrid/mail");
const { sendMail } = require("./email.client");
require("dotenv").config();

//Настройки окружения
const PORT = process.env.PORT || 3010;

//helpers---
function statusGenerator() {
	const status = ["free", "premium", "pro"];
	const random = Math.floor(Math.random() * 2);
	return status[random];
}
//----------

async function registerUser(req, res, next) {
	const { email, password } = req.body;
	const { filename } = req.file;

	try {
		const hashPass = await bcrypt.hash(password, saltRounds);
		const verificationToken = uuid.v4();

		sendMail(email, verificationToken);

		const createContact = new userModel({
			email,
			password: hashPass,
			subscription: statusGenerator(),
			avatarURL: `http://localhost:${PORT}/images/${filename}`,
			verificationToken,
		});

		const newContact = await createContact.save();

		res.status(201).send({
			email: newContact.email,
			password: newContact.password,
		});
	} catch (err) {
		if (err.code) {
			const error = new Error(`Email in use`);
			error.status = 409;
			next(error);
		}
		err.status = 400;
		next(err);
	}
}

async function loginUser(req, res, next) {
	const { email, password } = req.body;
	try {
		const user = await userModel.findOne({ email: email });
		const result = await bcrypt.compare(password, user.password);
		if (!result) {
			throw new Error();
		}

		//Генерирую токен из id
		const token = jwt.sign(
			{
				id: user._id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES }
		);

		//Добавляю к пользователю токен
		await userModel.findOneAndUpdate(
			{ _id: user._id },
			{ $set: { token: token } },
			{ new: true }
		);

		res.status(201).send({
			email: user.email,
			subscription: user.subscription,
		});
	} catch (err) {
		next(err);
	}
}

async function logoutUser(req, res, next) {
	const { user } = req;
	try {
		await userModel.replaceOne(
			{ _id: user._id },
			{
				email: user.email,
				password: user.password,
				subscription: user.subscription,
			}
		);

		res.status(204).send("User disconnect");
	} catch (err) {
		next(err);
	}
}

async function vertificationMail(req, res, next) {
	const { verificationToken } = req.params;
	try {
		const user = await userModel.findOneAndUpdate(
			{ verificationToken: verificationToken },
			{
				verificationToken: null,
			}
		);

		if (!user) {
			const error = new Error("User not found or already verified");
			error.status = 404;
			throw error;
		}

		res.send("Congratulation your account is vitrified");
	} catch (err) {
		next(err);
	}
}

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	vertificationMail,
};
