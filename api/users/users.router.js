const { Router } = require("express");
const usersRouter = Router();
const token = require("../auth/auth.middleware");
const controller = require("./users.controller");
const middleware = require("./users.middleware");
const { minificationFile } = require("../middleware/imageMinifacator");

usersRouter.get("/current", token.authorize, controller.findByTokenUser);
usersRouter.patch("/", token.authorize, controller.updateSubUser);
usersRouter.patch(
	"/avatars",
	token.authorize,
	middleware.upload,
	minificationFile,
	controller.updateAvatar
);

module.exports = usersRouter;
