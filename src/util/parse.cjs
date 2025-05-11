class Parse {
	// Parse the staging file and transform into a array of objects
	static parseStagingFile(content) {
		const fileContent = String(content);
		const contentLine = fileContent.split("\n");
		const contentParsed = [];

		contentLine.forEach((line) => {
			const cleaner = /((?<=:")[^.]+\.[a-z]+)/gim;
			const infos = line.match(cleaner);

			contentParsed.push({
				file: infos[0],
				path: infos[1],
			});
		});

		return contentParsed;
	}
}

module.exports = Parse;
