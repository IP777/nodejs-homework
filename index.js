const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const contactRouter = require("./api/contacts/contacts.router");
const authRouter = require("./api/auth/auth.router");
const usersRouter = require("./api/users/users.router");

//Настройки окружения
const PORT = process.env.PORT || 3010;
const MONGO_URL = process.env.MONGO_URL;

//Прослойки
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(cors());
app.use(express.static(__dirname + "/public"));

//Подключения роутов
app.use("/api/contacts/", contactRouter);
app.use("/auth/", authRouter);
app.use("/users/", usersRouter);

//Глобальная обработка ошибки
app.use((err, req, res, next) => {
	console.log(err);
	const { message, status } = err;

	res.status(status || 500).send({
		message,
	});
});

//Подключения mongoose
mongoose.connect(
	MONGO_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	},
	(err) => {
		if (err) {
			console.log("Database fallen :(");
			process.exit(1);
		}
		console.log("Database connection successful");
	}
);

//Подключения сервера
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
