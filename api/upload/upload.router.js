const { Router } = require("express");
const uploadRouter = Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: "public",
	filename: function (req, file, cb) {
		console.log("file", file);
		const { originalname } = file;
		const ext = path.parse(originalname).ext;
		cb(null, Date.now() + ext);
	},
});

const upload = multer({ storage });

uploadRouter.post(
	"/form-data",
	upload.single("file_example"),
	(req, res, next) => {
		//console.log("req.file", req.file);
		//console.log("req.body", req.body);

		res.status(200).send("image sending");
	}
);

const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

async function minificationFile(req, res, next) {
	const files = await imagemin(["images/*.{jpg,png}"], {
		destination: "build/images",
		plugins: [
			imageminJpegtran(),
			imageminPngquant({
				quality: [0.6, 0.8],
			}),
		],
	});

	console.log(files);
}

module.exports = uploadRouter;
