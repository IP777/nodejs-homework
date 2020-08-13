const Joi = require("@hapi/joi");

function loginUser(req, res, next) {
	const schema = Joi.object({
		email: Joi.string().required(),
		password: Joi.string().required(),
	});
	const result = schema.validate(req.body);
	if (result.error) {
		result.error.status = 400;
		next(result.error);
	}
	next();
}

module.exports = {
	loginUser,
};
