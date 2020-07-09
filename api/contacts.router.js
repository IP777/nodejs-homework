const { Router } = require("express");
const contactRouter = Router();

const validator = require("../helpers/validator");
const controller = require("./contacts.controller");

contactRouter.get("/", controller.getAllUser);

contactRouter.get("/:contactId", validator.userByID, controller.getUserByID);

contactRouter.post("/", validator.createUser, controller.createUser);

contactRouter.delete(
	"/:contactId",
	validator.userByID,
	controller.deleteUserByID
);

contactRouter.patch(
	"/:contactId",
	validator.reqHeaders,
	validator.userByID,
	validator.upUser,
	controller.updateUser
);

module.exports = contactRouter;
