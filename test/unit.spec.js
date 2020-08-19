const { require } = require("yargs");

require("should");

function sum(a, b) {
	return a + b;
}

describe("Unit tests example", () => {
	describe("example", () => {
		it("should return result", () => {
			const result = sum(2, 3);

			result.should.be.eql(5);
		});
	});
});
