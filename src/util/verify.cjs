const fs = require("node:fs/promises");

class Verify {
	static async verifyExistanceAsync(path) {
		const isFile = /^.+\..+$/gim.test(path);

		if (!isFile) {
			try {
				fs.opendir(path);

				return true;
			} catch (err) {
				return false;
			}
		}

		try {
			await fs.open(path);
			return true;
		} catch (err) {
			return false;
		}
	}
}

module.exports = Verify;
