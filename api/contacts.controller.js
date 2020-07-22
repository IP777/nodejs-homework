const Contact = require("./contacts.model");

async function getAllUser(req, res) {
	const getContactList = await Contact.find();
	console.log(getContactList);
	res.status(200).send(getContactList);
}

async function getUserByID(req, res) {
	const { contactId } = req.params;

	const getContact = await Contact.findById(contactId);

	if (!getContact) {
		const err = new Error(`User with id ${contactId} does not exist`);
		err.status = 404;
		throw err;
	}

	res.send(getContact);
}

async function createUser(req, res) {
	try {
		const newContact = await Contact.create({ ...req.body });
	} catch (err) {
		//res.status(201).send(err);
		throw err;
	}

	res.status(201).send(newContact);
}

async function deleteUserByID(req, res, next) {
	const { contactId } = req.params;

	const deleteContact = await Contact.findOneAndDelete({ _id: contactId });

	res.send(deleteContact);
}

async function updateUser(req, res) {
	const { contactId } = req.params;

	const userUpdate = await Contact.findOneAndUpdate(
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
