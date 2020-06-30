const argv = require("yargs").argv;

const contactsFunc = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			contactsFunc.listContacts().then((resp) => console.log(resp));
			break;

		case "get":
			contactsFunc.getContactById(id).then((resp) => console.log(resp));
			break;

		case "add":
			contactsFunc.addContact(name, email, phone);
			break;

		case "remove":
			contactsFunc.removeContact(id);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);

/*
# Получаем и выводим весь список контакстов в виде таблицы (console.table)
node index.js --action="list"

# Получаем контакт по id
node index.js --action="get" --id=5

# Добавялем контакт
node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"

# Удаляем контакт
node index.js --action="remove" --id=3
*/
