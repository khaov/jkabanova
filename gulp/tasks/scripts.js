"use strict";

const { src, lastRun, dest } = require("gulp");
const newer = require("gulp-newer");
const { scripts } = require("../config");

module.exports = () =>
    src(scripts.src, { since: lastRun("assets") })
        .pipe(newer(scripts.build))
        .pipe(dest(scripts.build));
