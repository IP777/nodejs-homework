const Contact = require("./contacts.model");
const uuid = require("uuid");

function statusGenerator() {
	const status = ["free", "premium", "pro"];
	const random = Math.floor(Math.random() * 2);
	return status[random];
}

async function getAllUser(req, res) {
	const getContactList = await Contact.find();

	res.status(200).send(getContactList);
}

async function getUserByID(req, res, next) {
	const { contactId } = req.params;
	try {
		const getContact = await Contact.findById(contactId);

		if (!getContact) {
			const err = new Error(`User with id ${contactId} does not exist`);
			err.status = 404;
			throw err;
		}

		res.status(200).send(getContact);
	} catch (err) {
		next(err);
	}
}

async function createUser(req, res, next) {
	try {
		const token = uuid.v4();
		const subscription = statusGenerator();

		const newContact = await Contact.create({
			...req.body,
			token,
			subscription,
		});

		res.status(201).send(newContact);
	} catch (err) {
		err.status = 404;
		next(err);
	}
}

async function deleteUserByID(req, res, next) {
	const { contactId } = req.params;
	try {
		const deleteContact = await Contact.findOneAndDelete({
			_id: contactId,
		});

		if (!deleteContact) {
			const err = new Error(`User with id ${contactId} does not exist`);
			err.status = 404;
			throw err;
		}

		res.send(deleteContact);
	} catch (err) {
		next(err);
	}
}

async function updateUser(req, res) {
	const { contactId } = req.params;
	try {
		const userUpdate = await Contact.findOneAndUpdate(
			{ _id: contactId },
			{ $set: { ...req.body } },
			{ new: true }
		);

		res.status(200).send(userUpdate);
	} catch (err) {
		err.status = 404;
		next(err);
	}
}

module.exports = {
	getAllUser,
	getUserByID,
	createUser,
	deleteUserByID,
	updateUser,
};
