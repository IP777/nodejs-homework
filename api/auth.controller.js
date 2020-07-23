const userModel = require("./auth.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const uuid = require("uuid");

//helpers---
function statusGenerator() {
	const status = ["free", "premium", "pro"];
	const random = Math.floor(Math.random() * 2);
	return status[random];
}
//----------

async function registerUser(req, res, next) {
	try {
		const hashPass = await bcrypt.hash(req.body.password, saltRounds);
		console.log(statusGenerator());

		const newContact = {
			...req.body,
			password: hashPass,
			token: uuid.v4(),
			subscription: statusGenerator(),
		};

		res.status(201).send(newContact);
	} catch (err) {
		err.status = 404;
		next(err);
	}
}

module.exports = {
	registerUser,
};
