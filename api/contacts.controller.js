const contactsFunc = require("./contacts");
//Id генераторы
const uuid = require("uuid");
const castomIdGenerator = () => Math.round(Math.random() * 1000);

function getAllUser(req, res) {
	contactsFunc
		.listContacts()
		.then((resp) => res.status(200).send(resp))
		.catch((error) => res.status(404).send(error.message));
}

function getUserByID(req, res) {
	const { contactId } = req.params;

	contactsFunc
		.getContactById(contactId)
		.then((resp) => {
			res.status(200).send(resp);
		})
		.catch((error) => res.status(404).send(error.message));
}

function createUser(req, res) {
	//Использовал кастомный генератор так как он генерирует числовое id, в базе используются числовые id
	const id = castomIdGenerator();
	// const id =  uuid.v4()

	const newUser = { ...req.body, id };

	contactsFunc
		.addContact(newUser)
		.then((resp) => {
			res.status(200).send(resp);
		})
		.catch((error) => res.status(404).send(error.message));
}

function deleteUserByID(req, res) {
	const { contactId } = req.params;

	contactsFunc
		.removeContact(contactId)
		.then((resp) => {
			res.status(200).send(resp);
		})
		.catch((error) => res.status(404).send(error.message));
}

function updateUser(req, res) {
	const { contactId } = req.params;

	const newUser = { ...req.body, id: contactId };

	contactsFunc
		.udateContact(newUser)
		.then((resp) => {
			res.status(200).send(resp);
		})
		.catch((error) => res.status(404).send(error.message));
}

module.exports = {
	getAllUser,
	getUserByID,
	createUser,
	deleteUserByID,
	updateUser,
};
