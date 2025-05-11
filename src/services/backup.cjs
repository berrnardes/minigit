// GET FILES IN THE PROJECTS
// READ THE CONTENT
// WRITE A COPY IN AN SHA FOLDER NAME
// DELETE stagin.json FILE
const Repository = require("../services/repository.cjs");
const { TermColor } = require("../util/term-color.cjs");
const fs = require("node:fs/promises");
const { join } = require("node:path");
const Parse = require("../util/parse.cjs");
const { randomUUID } = require("node:crypto");

class Backup {
	constructor(projectPath = process.cwd()) {
		this.projectPath = projectPath;
		this.repository = new Repository();
		this.termColor = new TermColor();
	}

	async _dealStagingFileContent() {
		const stagingFilePath = this.repository.getStagingPath();
		const stagingFileHandle = await fs.open(stagingFilePath);
		const stagingFileLength = (await stagingFileHandle.stat()).size;
		const buff = Buffer.alloc(stagingFileLength);

		const stagingFileContent = (await stagingFileHandle.read(buff)).buffer
			.toString("utf-8")
			.trim();

		stagingFileHandle.close();
		return Parse.parseStagingFile(stagingFileContent);
	}

	async _createCommitStagingDir() {
		const commitDirPath = this.repository.getCommitPath();
		const folderName = randomUUID();
		const folderPath = join(commitDirPath, folderName);

		await fs.mkdir(folderPath, { recursive: true });
		return folderPath;
	}

	async _getCommitStagingContent(filePath) {
		const fileHandle = await fs.open(filePath);
		const fileLength = (await fileHandle.stat()).size;
		const buff = Buffer.alloc(fileLength);

		const content = (await fileHandle.read(buff)).buffer.toString(
			"utf-8",
			0,
			buff.length
		);

		fileHandle.close();

		return content;
	}

	async createCommit() {
		const stagingFilePath = this.repository.getStagingPath();

		// This way of verifying is redundant?
		const isRepo = Repository.verifyRepositorySync(
			this.repository.getRepositoryPath()
		);
		if (!isRepo) {
			return this.termColor.colors.yellow("There's no repository in here");
		}

		const isStaging = Repository.verifyRepositorySync(stagingFilePath);

		if (!isStaging) {
			return this.termColor.colors.yellow("There is nothing to commit");
		}

		const stagingFiles = await this._dealStagingFileContent();

		const stagingCommitDir = await this._createCommitStagingDir();

		for (let i = 0; i < stagingFiles.length; i++) {
			const copyFilePath = join(stagingCommitDir, stagingFiles[i].file);
			const copyFileHandle = await fs.open(copyFilePath, "w");

			const contentStaging = await this._getCommitStagingContent(
				stagingFiles[i].path
			);

			await copyFileHandle.write(contentStaging);

			copyFileHandle.close();
		}
		// Remove staging.json file

		await fs.rm(this.repository.getStagingPath());

		return this.termColor.colors.blue("All changes were committed");
	}
}

module.exports = Backup;
