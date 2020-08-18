const { Router } = require("express");
const uploadRouter = Router();
const controller = require("./upload.controller");
const { minificationFile } = require("../middleware/imageMinifacator");

uploadRouter.post(
	"/form-data",
	controller.upload,
	minificationFile,
	(req, res, next) => {
		res.status(200).send(req.file.filename + " - image sending");
	}
);

module.exports = uploadRouter;
