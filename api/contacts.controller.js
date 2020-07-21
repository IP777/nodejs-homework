//const contactsFunc = require("./contacts");
const contact = require("./contacts.model");

async function getAllUser(req, res) {
	const getContactList = await contact.find();
	res.status(200).send(getContactList);
}

async function getUserByID(req, res) {
	const { contactId } = req.params;

	const getContact = await contact.findById(id);

	if (!getContact) {
		const err = new Error(`User with id ${id} does not exist`);
		err.status = 404;
		throw err;
	}

	res.send(getContact);
}

async function createUser(req, res) {
	const newContact = await contact.create({ ...req.body });

	res.status(201).send(newContact);
}

async function deleteUserByID(req, res, next) {
	const { contactId } = req.params;

	const deleteContact = await User.findOneAndDelete({ _id: contactId });

	res.send(deleteContact);
}

async function updateUser(req, res) {
	const { contactId } = req.params;

	const userUpdate = await User.findOneAndUpdate(
		{ _id: contactId },
		{ $set: { ...req.body } },
		{ new: true }
	);

	res.send(userUpdate);
}

module.exports = {
	getAllUser,
	getUserByID,
	createUser,
	deleteUserByID,
	updateUser,
};
