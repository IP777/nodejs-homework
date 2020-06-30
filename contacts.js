const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const fsPromises = fs.promises;

async function listContacts() {
	try {
		const data = await fsPromises.readFile(contactsPath, "utf-8");
		return JSON.parse(data);
	} catch (error) {
		console.log(error);
	}
}

async function getContactById(contactId) {
	try {
		const data = await listContacts();
		const findContact = data.find((contact) => contact.id === contactId);

		return findContact;
	} catch (error) {
		console.log(error);
	}
}

async function removeContact(contactId) {
	try {
		const data = await listContacts();
		const filteredData = data.filter((contact) => contact.id !== contactId);

		console.log("Remove contact ", await getContactById(contactId));

		const dataToJSON = JSON.stringify(filteredData);

		await fsPromises.writeFile(contactsPath, dataToJSON, "utf-8");
	} catch (error) {
		console.log(error);
	}
}

async function addContact(name, email, phone) {
	const newContactObj = {
		id: Math.round(Math.random() * 1000),
		name: name,
		email: email,
		phone: phone,
	};

	const data = await listContacts();

	const combinateArr = data.concat(newContactObj);
	const dataToJSON = JSON.stringify(combinateArr);

	console.log("Add to contact list ", newContactObj);
	await fsPromises.writeFile(contactsPath, dataToJSON, "utf-8");
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
