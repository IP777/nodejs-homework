const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: "tmp",
	filename: function (req, file, cb) {
		const { originalname } = file;
		const ext = path.parse(originalname).ext;
		const name = originalname.slice(0, -4);
		cb(null, name + "-" + Date.now() + ext);
	},
});

const upload = multer({ storage }).single("file_example");

module.exports = { upload };
