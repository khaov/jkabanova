"use strict";

const path = require("path");
const fs = require("fs");
const { src, dest } = require("gulp");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const gulpIf = require("gulp-if");
const nunjucksRender = require("gulp-nunjucks-render");
const htmlmin = require("gulp-htmlmin");

const expandSequences = require("../libs/expand-sequences");

const { templates, dataSource } = require("../config");

const isProduction = process.env.NODE_ENV === "production";

const { data, sequences } = JSON.parse(
	fs.readFileSync(path.resolve(process.cwd(), dataSource), "utf8")
);

module.exports = () =>
	src(templates.pages)
		.pipe(
			plumber({
				errorHandler: notify.onError((error) => {
					console.log(`plugin: ${error.plugin}`);
					console.log(`name: ${error.name}`);
					console.log(`message: ${error.message}`);
					console.log(`fileName: ${error.fileName}`);
				}),
			})
		)
		.pipe(expandSequences({ data, sequences }))
		.pipe(
			nunjucksRender({
				path: templates.src,
				data,
				envOptions: {
					throwOnUndefined: !isProduction,
					trimBlocks: true,
				},
			})
		)
		.pipe(gulpIf(isProduction, htmlmin({ collapseWhitespace: true })))
		.pipe(dest(templates.build));
