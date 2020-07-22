const Contact = require("./contacts.model");

async function getAllUser(req, res) {
	const getContactList = await Contact.find();

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

// {
// 	"name": "Shiman",
// 	"email": "Shiman@egetlacus.ca",
// 	"phone": "88888888",
// 	"password": "321456"
// }

async function createUser(err, req, res) {
	try {
		const newContact = await Contact.create({ ...req.body });
		res.status(201).send(newContact);
	} catch (error) {
		//res.status(201).send(err.message);
		//throw err;
		err(error);
	}
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
