const userModel = require("../auth/auth.model");

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
//?sub=pro&email=shiman777@vestibul.co.uk
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

module.exports = {
	findByTokenUser,
	updateSubUser,
};
