"use strict";

const {
	root: { build },
} = require("../config");

module.exports = async () => await require("del")(build);
