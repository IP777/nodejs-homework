const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "../db/contacts.json");

const fsPromises = fs.promises;

//--------------------------------------check Error-----------------------------
const checkToNaN = (arg) => {
	if (isNaN(arg)) {
		throw new Error("Ups you sent incorrect query parameters.((");
	}
};

const checkToUndefined = (arg) => {
	if (arg === undefined) {
		throw new Error(`Ups contact is not found.(`);
	}
};

const checkUndefinedIndex = (arg) => {
	if (arg === -1) {
		throw new Error(`Ups contact is not found.(`);
	}
};
//-----------------------------------------------------------------------------

async function listContacts() {
	try {
		const data = await fsPromises.readFile(contactsPath, "utf-8");
		return JSON.parse(data);
	} catch (error) {
		throw new Error(error);
	}
}

async function getContactById(contactId) {
	try {
		checkToNaN(contactId);
		const numberId = Number(contactId);

		const data = await listContacts();

		const findContact = data.find((contact) => contact.id === numberId);
		checkToUndefined(findContact);

		return findContact;
	} catch (error) {
		throw new Error(error);
	}
}

async function removeContact(contactId) {
	try {
		checkToNaN(contactId);
		const numberId = Number(contactId);

		const data = await listContacts();

		const findContact = data.find((contact) => contact.id === numberId);
		console.log(findContact);
		checkToUndefined(findContact);

		const filteredData = data.filter((contact) => contact.id !== numberId);

		const dataToJSON = JSON.stringify(filteredData);

		await fsPromises.writeFile(contactsPath, dataToJSON, "utf-8");

		return { message: `contact deleted` };
	} catch (error) {
		throw new Error(error);
	}
}

async function addContact({ id, name, email, phone }) {
	try {
		const newContactObj = {
			id: id,
			name: name,
			email: email,
			phone: phone,
		};

		const data = await listContacts();

		const combinateArr = data.concat(newContactObj);
		const dataToJSON = JSON.stringify(combinateArr);

		await fsPromises.writeFile(contactsPath, dataToJSON, "utf-8");

		return `Add object to contact list : 
	${JSON.stringify(newContactObj)}`;
	} catch {
		throw new Error(error);
	}
}

async function udateContact(id, contact) {
	try {
		checkToNaN(id);

		const numberId = Number(id);

		const data = await listContacts();

		const contactIndex = data.findIndex((user) => user.id === numberId);
		checkUndefinedIndex(contactIndex);

		data[contactIndex] = {
			...data[contactIndex],
			...contact,
		};
		const dataToJSON = JSON.stringify(data);

		await fsPromises.writeFile(contactsPath, dataToJSON, "utf-8");

		return `Update object on contact list :
		 ${JSON.stringify(data[contactIndex])}`;
	} catch {
		throw new Error(error);
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	udateContact,
};
