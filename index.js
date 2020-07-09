const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const contactRouter = require("./api/contacts.router");

dotenv.config();
const PORT = process.env.PORT || 3010;

//Прослойка для обработки запросов от json
app.use(express.json());
//Прослойка для обработки запросов от формы
app.use(express.urlencoded({ extended: true }));
//Настройки плагина Morgan
app.use(morgan("combined"));
app.use(cors());

app.use("/api/contacts/", contactRouter);

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}!`);
});
