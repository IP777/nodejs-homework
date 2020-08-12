const { Router } = require("express");
const authRouter = Router();
const controller = require("./auth.controller");
const validator = require("../../helpers/validator");
const token = require("./auth.middleware");
const { generateAvatar } = require("../middleware/avatarGenerator");
const { minificationFile } = require("../middleware/imageMinifacator");

authRouter.post(
	"/register",
	generateAvatar,
	minificationFile,
	controller.registerUser
);
authRouter.post("/login", validator.loginUser, controller.loginUser);
authRouter.post("/logout", token.authorize, controller.logoutUser);

module.exports = authRouter;
