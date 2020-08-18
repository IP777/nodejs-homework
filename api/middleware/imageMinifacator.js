const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const fs = require("fs");
const path = require("path");

async function minificationFile(req, res, next) {
	try {
		const MINIFY_DIR = "public/images";
		//Доступ к файлу через req.file.path не работает" поэтому написал так..
		const filePath = req.file.destination + "/" + req.file.filename;

		await imagemin([filePath], {
			destination: MINIFY_DIR,
			plugins: [
				imageminJpegtran(),
				imageminPngquant({
					quality: [0.6, 0.8],
				}),
			],
		});
		//Удаление файла
		await fs.promises.unlink(req.file.path);

		req.file = {
			...req.file,
			path: path.join(MINIFY_DIR, req.file.filename),
			destination: MINIFY_DIR,
		};

		next();
	} catch (err) {
		next(err);
	}
}

module.exports = { minificationFile };
