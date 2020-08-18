const userModel = require("../auth/auth.model");
const path = require("path");
require("dotenv").config();

//Настройки окружения
const PORT = process.env.PORT || 3010;

async function findByTokenUser(req, res, next) {
	const { user } = req;
	try {
		res.status(200).send({
			email: user.email,
			subscription: user.subscription,
		});
	} catch (err) {
		next(err);
	}
}

async function updateSubUser(req, res, next) {
	const { email, sub } = req.query;
	try {
		//Проверка все ли поля заполнены
		if (!email || !sub) {
			throw new Error("Subscribe or email not find(");
		}
		//Проверка правильное ли значение  Subscribe
		switch (sub) {
			case "pro":
				break;
			case "free":
				break;
			case "premium":
				break;
			default:
				throw new Error("Subscribe not valide");
		}

		await userModel.findOneAndUpdate(
			{ email: email },
			{ $set: { subscription: sub } },
			{ new: true }
		);

		res.status(200).send(
			`User with email ${email} update to subscribe: ${sub}`
		);
	} catch (err) {
		err.status = 404;
		next(err);
	}
}

async function updateAvatar(req, res, next) {
	try {
		const filter = { token: req.user.token };
		const avatarUrl = `http://localhost:${PORT}/images/${req.file.filename}`;

		await userModel.findOneAndUpdate(
			filter,
			{
				$set: {
					avatarURL: avatarUrl,
				},
			},
			{ new: true }
		);

		res.send({ avatarURL: avatarUrl });
	} catch (err) {
		next(err);
	}
}

module.exports = {
	findByTokenUser,
	updateSubUser,
	updateAvatar,
};
