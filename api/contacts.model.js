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
});

const userModel = mongoose.model("contact", userShema);

module.exports = userModel;
