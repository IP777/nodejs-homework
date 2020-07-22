const { Router } = require("express");
const contactRouter = Router();

const controller = require("./contacts.controller");

contactRouter.get("/", controller.getAllUser);

contactRouter.get("/:contactId", controller.getUserByID);

contactRouter.post("/", controller.createUser);

contactRouter.delete("/:contactId", controller.deleteUserByID);

contactRouter.patch("/:contactId", controller.updateUser);

module.exports = contactRouter;
