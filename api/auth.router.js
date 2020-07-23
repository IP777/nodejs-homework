const { Router } = require("express");
const authRouter = Router();
const controller = require("./auth.controller");

authRouter.post("/register", controller.registerUser);

module.exports = authRouter;
