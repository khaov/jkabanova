"use strict";

const { src, lastRun, dest } = require("gulp");
const newer = require("gulp-newer");
const { assets } = require("../config");

module.exports = () =>
	src(assets.src, { since: lastRun("assets") })
		.pipe(newer(assets.build))
		.pipe(dest(assets.build));
