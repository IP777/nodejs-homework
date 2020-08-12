const { Router } = require("express");
const usersRouter = Router();
const token = require("../auth/auth.middleware");
const controller = require("./users.controller");

usersRouter.get("/current", token.authorize, controller.findByTokenUser);
usersRouter.patch("/", token.authorize, controller.updateSubUser);
usersRouter.patch("/avatars", controller.userUpdate);

module.exports = usersRouter;
