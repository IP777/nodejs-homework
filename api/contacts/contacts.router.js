const { Router } = require("express");
const contactRouter = Router();
const token = require("../auth/auth.middleware");
const controller = require("./contacts.controller");

contactRouter.get("/", controller.getAllUser);

contactRouter.get("/:contactId", controller.getUserByID);

contactRouter.post("/", controller.createUser);

contactRouter.delete("/:contactId", token.authorize, controller.deleteUserByID);

contactRouter.patch("/:contactId", token.authorize, controller.updateUser);

module.exports = contactRouter;
