"use strict";

const tasks = require("./gulp/tasks");
const { task, series, parallel } = require("gulp");

task("del", tasks.del);
task("assets", tasks.assets);
task("sprite", tasks.sprite);
task("styles:main", tasks["styles-main"]);
task("styles:vendor", tasks["styles-vendor"]);
task("templates", tasks.templates);
task("scripts", tasks.scripts);
task("serve", tasks.serve);
task("watchers", tasks.watchers);

task(
    "build",
    series(
        "del",
        parallel(
            "assets",
            "styles:main",
            "styles:vendor",
            "sprite",
            "templates",
            "scripts"
        )
    )
);

task("default", series("build", parallel("watchers", "serve")));
