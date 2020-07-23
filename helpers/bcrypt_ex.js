const bcrypt = require("bcrypt");

const myPlaintextPassword = "pit5199745";

async function main(pass) {
	const saltRounds = 10;

	// const hashPass = await bcrypt.hash(
	// 	myPlaintextPassword,
	// 	saltRounds,
	// 	function (err, hash) {
	// 		// Store hash in your password DB.
	// 		console.log("hash", hash);
	// 		console.log("err", err);
	// 	}
	// );

	const hashPass = await bcrypt.hash(myPlaintextPassword, saltRounds);
	console.log("Hash-Pass", hashPass);

	const result = await bcrypt.compare(myPlaintextPassword, hashPass);
	console.log("result", myPlaintextPassword, "=", hashPass, "-", result);
}

main();
