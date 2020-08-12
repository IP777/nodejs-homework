const Avatar = require("avatar-builder");
const fs = require("fs");

async function generateAvatar(req, res, next) {
	try {
		const avatar = Avatar.identiconBuilder(128);
		const FOLDER = "tmp/";
		const NAME = "ava-" + Date.now() + ".png";

		avatar.create("gabriel").then((buffer) => {
			fs.writeFileSync(FOLDER + NAME, buffer);
		});

		//Генерирую фаил и отправляю дальше
		req.file = {
			path: FOLDER + NAME,
			destination: "tmp",
			filename: NAME,
		};

		next();
	} catch (err) {
		next(err);
	}
}

module.exports = { generateAvatar };
