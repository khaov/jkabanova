"use strict";

const { src, dest } = require("gulp");
const consola = require("consola");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const gulpIf = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass")(require("sass"));

const { styles } = require("../config");

const isProduction = process.env.NODE_ENV === "production";

const plugins = [
	require("postcss-easy-import")(),
	require("autoprefixer")(),
	...(isProduction ? [require("cssnano")()] : []),
];

module.exports = () =>
	src(styles.main.src)
		.pipe(
			plumber({
				errorHandler: notify.onError((error) => {
					consola.error(error.message);
				}),
			})
		)
		.pipe(gulpIf(!isProduction, sourcemaps.init()))
		.pipe(sass())
		.pipe(postcss(plugins))
		.pipe(gulpIf(!isProduction, sourcemaps.write()))
		.pipe(dest(styles.build));
