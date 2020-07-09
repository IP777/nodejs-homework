const Joi = require("@hapi/joi");

function reqHeaders(req, res, next) {
	if (req.headers["content-type"] !== "application/json") {
		res.status(400).send("Not application/json");
	} else {
		next();
	}
}

function userByID(req, res, next) {
	const schema = Joi.object({
		contactId: Joi.string().pattern(/^\d+$/),
	});
	const result = schema.validate(req.params);
	if (result.error) {
		res.status(400).send({
			message: result.error.details[0].message,
		});
	}
	next();
}

function createUser(req, res, next) {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().required(),
		phone: Joi.string().required(),
	});
	const result = schema.validate(req.body);
	if (result.error) {
		res.status(400).send({
			message: result.error.details[0].message,
		});
	}
	next();
}

function upUser(req, res, next) {
	const userSchema = Joi.object({
		name: Joi.string(),
		email: Joi.string(),
		phone: Joi.string(),
	}).min(1);
	const result = userSchema.validate(req.body);
	if (result.error) {
		res.status(400).send(result.error.details[0].message);
	}
	next();
}

module.exports = {
	userByID,
	createUser,
	reqHeaders,
	upUser,
};
