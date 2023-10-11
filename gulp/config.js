"use strict";

module.exports = {
    root: {
        src: "src",
        build: "build",
    },

    assets: {
        src: ["src/assets/**/*.*"],
        build: "build",
    },

    sprite: {
        src: "src/sprite/**/*.svg",
        build: "build/images",
        file: "sprite.svg",
    },

    styles: {
        main: { src: "src/styles/main.scss" },
        vendor: { src: "src/styles/vendor.scss" },
        build: `build/css`,
    },

    templates: {
        src: "src/templates",
        pages: "src/templates/pages/**/*.njk",
        build: "build",
    },

    scripts: {
        src: "src/js/**/*.js",
        build: "build/js",
    },

    watchers: {
        assets: "src/assets/**/*.*",
        sprite: "src/sprite/**/*.svg",
        styles: {
            main: "src/styles/**/*.scss",
            vendor: "src/styles/vendor.scss",
        },
        templates: "src/templates/**/*.njk",
        scripts: "src/js/**/*.js",
    },

    port: 8081,

    dataSource: "config.json",
};
