"use strict";

const path = require("path");
const Vinyl = require("vinyl");
const throughObj = require("through2").obj;

module.exports = ({ data, sequences }) => {
	return throughObj(function (file, encoding, callback) {
		const context = this;

		if (file.isNull()) {
			return callback(null, file);
		}

		const fileName = path.basename(file.path);
		const sequence = sequences[fileName] || null;

		if (sequence) {
			const sequenceData = data[sequence.data];
			sequenceData.forEach((it) => {
				const newFile = new Vinyl({
					cwd: file.cwd,
					base: file.base,
					path: path.join(
						path.dirname(file.path),
						sequence.dest,
						`${it[sequence.fileName]}.html`
					),
					stat: file.stat,
					contents: file.contents,
					data: { [sequence.templateData]: it },
				});

				context.push(newFile);
			});
		} else {
			context.push(file);
		}

		return callback();
	});
};
