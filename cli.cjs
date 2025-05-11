const { stdin, argv } = require("node:process");
const Main = require("./src/core/main.cjs");
// Instantiate the main class and control the user interactivity in cli
// Quick remember
// Project != Repository
// repositoryPath = projectPath + .minigit/

async function cli() {
	const [, , command, ...parameters] = process.argv;
	const minigit = new Main();

	switch (command) {
		case "init":
			const started = minigit.init();
			console.log(started);
			break;
		case "add":
			const staged = await minigit.add(parameters);
			console.log(staged);
			break;
		case "commit":
			const commited = await minigit.commit();
			console.log(commited);
			break;
		default:
			console.log("Invalid command");
			break;
	}
}

cli();
