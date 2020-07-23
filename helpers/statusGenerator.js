function statusGenerator() {
	const status = ["free", "premium", "pro"];
	const random = Math.floor(Math.random() * 2);
	return status[random];
}

module.exports = statusGenerator();
