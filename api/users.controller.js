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
	const { sub } = req.params;
	console.log(sub);
	res.status(200).send("patch OK " + sub);
}

module.exports = {
	findByTokenUser,
	updateSubUser,
};
