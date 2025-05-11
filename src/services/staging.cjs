const fs = require("fs/promises");
const Repository = require("../services/repository.cjs");
const { TermColor } = require("../util/term-color.cjs");
const { join } = require("node:path");
const Verify = require("../util/verify.cjs");

class Staging {
	constructor() {
		this.repository = new Repository();
		this.termColor = new TermColor(process);
	}

	async _writeFileStage(files) {
		let message;
		const fileStagePath = join(
			this.repository.getRepositoryPath(),
			"staging.json"
		);

		for (let i = 0; i < files.length; ++i) {
			const regex = /^.+\..+$/gim;
			const isValid = regex.test(files[i]);

			if (!isValid) {
				return this.termColor.colors.red(`Invalid file: ${files[i]}`);
			}

			const stageFile = {
				file: files[i],
				path: join(this.repository.getProjectPath(), files[i]),
			};

			const fileExist = await Verify.verifyExistanceAsync(stageFile.path);

			if (!fileExist) {
				return this.termColor.colors.red(
					`File ${stageFile.file} does not exist`
				);
			}

			const stageContent = JSON.stringify(stageFile);

			const buffer = Buffer.from(`${stageContent}\n`);

			await fs.appendFile(fileStagePath, buffer);
		}

		return this.termColor.colors.green(`Added success`);
	}

	async addToStage(files) {
		const repositoryPath = this.repository.getRepositoryPath();

		if (!Repository.verifyRepositorySync(repositoryPath)) {
			return this.termColor.colors.yellow("There's no repository in here");
		}

		return await this._writeFileStage(files);
	}
}

module.exports = Staging;
