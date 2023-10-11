"use strict";

const browserSync = require("browser-sync");

const { root, port } = require("../config");

module.exports = () => {
	browserSync.init({
		port,
		ghostMode: false,
		https: false,
		open: false,
		server: {
			ui: false,
			notify: false,
			baseDir: root.build,
		},
	});

	browserSync.watch(root.build).on("change", browserSync.reload);
};
