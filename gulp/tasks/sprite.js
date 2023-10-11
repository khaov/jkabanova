"use strict";

const { src, dest } = require("gulp");
const createSprite = require("gulp-svgstore");
const rename = require("gulp-rename");
const { sprite } = require("../config");

module.exports = () =>
	src(sprite.src)
		.pipe(
			createSprite({
				inlineSvg: true,
			})
		)
		.pipe(rename(sprite.file))
		.pipe(dest(sprite.build));
