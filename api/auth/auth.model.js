const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userShema = new Schema({
	email: {
		type: String,
		validate: (value) => value.includes("@"),
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	subscription: {
		type: String,
		enum: ["free", "pro", "premium"],
		default: "free",
	},
	avatarURL: String,
	token: {
		type: String,
	},
});

const userModel = mongoose.model("users", userShema);

module.exports = userModel;
