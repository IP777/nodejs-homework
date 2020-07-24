const { Router } = require("express");
const usersRouter = Router();
const token = require("./auth.middleware");
const controller = require("./users.controller");

usersRouter.get("/current", token.authorize, controller.findByTokenUser);
usersRouter.patch("/:sub", controller.updateSubUser);

module.exports = usersRouter;
