const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userShema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		validate: (value) => value.includes("@"),
	},
	phone: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	subscription: {
		type: String,
		required: true,
	},
});

const userModel = mongoose.model("contacts", userShema);

module.exports = userModel;
