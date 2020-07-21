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

app.use((err, req, res, next) => {
	const { message, status } = err;

	res.status(status || 500).send(message);
});

mongoose.connect(
	process.env.MONGO_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	},
	(err) => {
		if (err) {
			process.exit(1);
		}
		console.log("Database connection successful");
	}
);

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}!`);
});
