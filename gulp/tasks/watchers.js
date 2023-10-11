"use strict";

const { watch, series } = require("gulp");

const {
    watchers: { assets, sprite, templates, styles, scripts },
} = require("../config");

module.exports = () => {
    watch(assets, series("assets"));
    watch(sprite, series("sprite"));
    watch(styles.main, series("styles:main"));
    watch(styles.vendor, series("styles:vendor"));
    watch(templates, series("templates"));
    watch(scripts, series("scripts"));
};
