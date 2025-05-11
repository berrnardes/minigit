// Will instantiate all classes responsable for app works

const Stage = require("../services/staging.cjs");
const Repository = require("../services/repository.cjs");
const { join } = require("node:path");
const { TermColor } = require("../util/term-color.cjs");
const Backup = require("../services/backup.cjs");

class Main {
	constructor() {
		this.repository = new Repository();
		this.stage = new Stage();
		this.backup = new Backup();
	}

	init() {
		return this.repository.initRepository();
	}

	async add(files) {
		return await this.stage.addToStage(files);
	}

	async commit() {
		return await this.backup.createCommit();
	}
}

module.exports = Main;
