const contactsFunc = require("./contacts");
//Id генераторы
//const uuid = require("uuid");
const castomIdGenerator = () => Math.round(Math.random() * 1000);

async function getAllUser(req, res) {
	try {
		const reqContactList = await contactsFunc.listContacts();
		res.status(200).send(reqContactList);
	} catch (err) {
		next(err);
	}
}

async function getUserByID(req, res, next) {
	const { contactId } = req.params;

	try {
		const reqContact = await contactsFunc.getContactById(contactId);
		res.status(200).send(reqContact);
	} catch (err) {
		next(err);
	}
}

async function createUser(req, res, next) {
	//Использовал кастомный генератор для генерации числового id, в базе используются числовые id
	const id = castomIdGenerator();
	// const id =  uuid.v4()
	const newUser = { ...req.body, id };

	try {
		const reqContact = await contactsFunc.addContact(newUser);
		res.status(201).send(reqContact);
	} catch (err) {
		next(err);
	}
}

async function deleteUserByID(req, res, next) {
	const { contactId } = req.params;

	try {
		const reqContact = await contactsFunc.removeContact(contactId);
		res.status(200).send(reqContact);
	} catch (err) {
		next(err);
	}
}

async function updateUser(req, res, next) {
	const { contactId } = req.params;
	const newUser = req.body;

	try {
		const reqContact = await contactsFunc.udateContact(contactId, newUser);
		res.status(200).send(reqContact);
	} catch (err) {
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
