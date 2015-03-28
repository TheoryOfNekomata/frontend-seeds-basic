/*global require*/

(function(gulp, undefined) {
    "use strict";

    /*
     * Settings
     */

    var watchGlobs = {
        styles: {
            main: "./app/src/sass/style.sass",
            aux: ["./app/src/sass/**/*.@(sass|scss)"]
        },
        scripts: {
            main: "./app/src/js/**/*.js",
            aux: []
        },
        templates: {
            main: "./index.src.@(htm|html)",
            aux: ["./app/src/html/**/*.@(htm|html)"]
        }
    };

    /*
     * Tasks
     */

    gulp.task("styles", function() {
        var utils = {
            compile: require("gulp-sass"),
            compress: require("gulp-uglifycss"),
            rename: require("gulp-rename")
        };

        gulp.src(watchGlobs.styles.main)
            .pipe(utils.compile({ indentedSyntax: true }))
            .pipe(utils.compress())
            .pipe(utils.rename("style.min.css"))
            .pipe(gulp.dest("./app/build/css"));
    });

    gulp.task("scripts", function() {
        var utils = {
            compress: require("gulp-uglify"),
            concat: require("gulp-concat")
        };

        var scriptBuildGlobs = [
            "./lib/modernizr/modernizr.js",
            "./lib/jquery/dist/jquery.js",
            "./lib/jquery-placeholder/jquery.placeholder.js",
            "./lib/fastclick/lib/fastclick.js",
            "./lib/foundation/js/foundation/foundation.js",
            "./lib/foundation/js/foundation/foundation.abide.js",
            "./lib/foundation/js/foundation/foundation.accordion.js",
            "./lib/foundation/js/foundation/foundation.alert.js",
            "./lib/foundation/js/foundation/foundation.clearing.js",
            "./lib/foundation/js/foundation/foundation.dropdown.js",
            "./lib/foundation/js/foundation/foundation.equalizer.js",
            "./lib/foundation/js/foundation/foundation.interchange.js",
            "./lib/jquery.cookie/jquery.cookie.js", "lib/foundation/js/foundation/foundation.joyride.js",
            "./lib/foundation/js/foundation/foundation.magellan.js",
            "./lib/foundation/js/foundation/foundation.offcanvas.js",
            "./lib/foundation/js/foundation/foundation.orbit.js",
            "./lib/foundation/js/foundation/foundation.reveal.js",
            "./lib/foundation/js/foundation/foundation.slider.js",
            "./lib/foundation/js/foundation/foundation.tab.js",
            "./lib/foundation/js/foundation/foundation.tooltip.js",
            "./lib/foundation/js/foundation/foundation.topbar.js",
            watchGlobs.scripts.main
        ];

        watchGlobs.scripts.aux.forEach(function(watchGlob) {
            scriptBuildGlobs.push(watchGlob);
        });

        gulp.src(scriptBuildGlobs)
            .pipe(utils.concat("script.min.js"))
            .pipe(utils.compress())
            .pipe(gulp.dest("./app/build/js"));
    });

    gulp.task("templates-index", function() {
        var utils = {
            compress: require("gulp-minify-html"),
            rename: require("gulp-rename")
        };

        gulp.src(watchGlobs.templates.main)
            .pipe(utils.rename("index.html"))
            .pipe(utils.compress({ empty: true }))
            .pipe(gulp.dest("."));
    });

    gulp.task("templates-auxiliary", function() {
        var utils = {
            compress: require("gulp-minify-html")
        };

        gulp.src(watchGlobs.templates.aux)
            .pipe(utils.compress({ empty: true }))
            .pipe(gulp.dest("./app/build/html"));
    });

    gulp.task("templates", ["templates-index", "templates-auxiliary"]);

    gulp.task("watch", function() {
        var styleWatchGlobs = watchGlobs.styles.aux;
        styleWatchGlobs.push(watchGlobs.styles.main);

        gulp.watch(styleWatchGlobs, ["styles"]);

        var scriptWatchGlobs = watchGlobs.scripts.aux;
        scriptWatchGlobs.push(watchGlobs.scripts.main);

        gulp.watch(scriptWatchGlobs, ["scripts"]);

        gulp.watch(watchGlobs.templates.main, ["templates-index"]);

        gulp.watch(watchGlobs.templates.aux, ["templates-auxiliary"]);
    });

    gulp.task("test", function() {
        // TODO test script
    });

    gulp.task("default", ["styles", "scripts", "templates"]);

})(require("gulp"));
