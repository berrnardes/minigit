// Class
// Init a repository in a project if not exist
// Verify the existance for files and folder in repository

const { join } = require("node:path");
const { existsSync, mkdirSync, writeFileSync } = require("node:fs");
const { TermColor } = require("../util/term-color.cjs");

class Repository {
	constructor(projectPath = process.cwd()) {
		this.termColor = new TermColor(process);
		this.projectPath = projectPath;
		this.repositoryPath = join(projectPath, ".minigit");
		this.stagingPath = join(this.repositoryPath, "staging.json");
		this.commitPath = join(this.repositoryPath, "commits");
	}

	// In sync way, verify if repository is already
	// initialised in a specific path
	static verifyRepositorySync(repositoryPath) {
		const pathExists = existsSync(repositoryPath);

		if (pathExists) {
			return true;
		}
		return false;
	}
	// Will create .minigit folder
	// inside will create staging.json and commit folder
	initRepository() {
		if (!Repository.verifyRepositorySync(this.repositoryPath)) {
			mkdirSync(this.repositoryPath);
			mkdirSync(this.commitPath);
			return this.termColor.colors.blue("Minigit is now watching this project");
		}

		return this.termColor.colors.yellow("Minigit has already been started");
	}

	getProjectPath() {
		return this.projectPath;
	}
	getRepositoryPath() {
		return this.repositoryPath;
	}
	getStagingPath() {
		return this.stagingPath;
	}
	getCommitPath() {
		return this.commitPath;
	}
}

module.exports = Repository;
