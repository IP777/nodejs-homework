// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

async function sendMail(email, vertificationToken) {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: email,
		from: process.env.MY_EMAIL,
		subject: "Sending with Twilio SendGrid is Fun",
		text: "and easy to do anywhere, even with Node.js",
		html: `<a href="http://localhost:3010/auth/verify/${vertificationToken}">Vertificate you token</a>`,
	};

	const [response] = await sgMail.send(msg);

	console.log(response);
	return response;
}

module.exports = { sendMail };
