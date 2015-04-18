/*global require*/

(function(gulp, undefined) {
    "use strict";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Settings
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var watchGlobs = {
        styles: {
            main: ["./app/src/sass/style.@(sass|scss)"],
            aux: ["./app/src/sass/**/*.@(sass|scss)"]
        },
        scripts: {
            main: ["./app/src/js/**/*.js"],
            aux: []
        },
        templates: {
            main: "./index.src.@(htm|html)",
            aux: ["./app/src/html/**/*.@(htm|html)"]
        }
    };

    var depGlobs = {
        styles: [],
        scripts: [
            "lib/jquery/dist/jquery.js",
            "lib/bootstrap-sass/assets/javascripts/bootstrap.js"
        ],
        templates: []
    };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Tasks
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /* ====== *
     * Styles *
     * ====== */

    gulp.task("styles-full", function() {
        var utils = {
            compile: require("gulp-sass"),
            compress: require("gulp-uglifycss"),
            rename: require("gulp-rename")
        };

        var sources = watchGlobs.styles.main;

        gulp.src(sources)
            .pipe(utils.compile({ indentedSyntax: true }))
            .pipe(utils.rename("style.css"))
            .pipe(gulp.dest("./app/build/css"));
    });

    gulp.task("styles-min", function() {
        var utils = {
            compile: require("gulp-sass"),
            compress: require("gulp-uglifycss"),
            rename: require("gulp-rename")
        };

        var sources = watchGlobs.styles.main;

        gulp.src(sources)
            .pipe(utils.compile({ indentedSyntax: true }))
            .pipe(utils.compress())
            .pipe(utils.rename("style.min.css"))
            .pipe(gulp.dest("./app/build/css"));
    });

    gulp.task("styles", ["styles-full", "styles-min"]);

    /* ======= *
     * Scripts *
     * ======= */

    gulp.task("scripts-full", function() {
        var utils = {
            compress: require("gulp-uglify"),
            concat: require("gulp-concat")
        };

        var sources = depGlobs.scripts
            .concat(watchGlobs.scripts.main)
            .concat(watchGlobs.scripts.aux);

        gulp.src(sources)
            .pipe(utils.concat("script.js"))
            .pipe(gulp.dest("./app/build/js"));
    });

    gulp.task("scripts-min", function() {
        var utils = {
            compress: require("gulp-uglify"),
            concat: require("gulp-concat")
        };

        var sources = depGlobs.scripts
            .concat(watchGlobs.scripts.main)
            .concat(watchGlobs.scripts.aux);

        gulp.src(sources)
            .pipe(utils.concat("script.min.js"))
            .pipe(utils.compress())
            .pipe(gulp.dest("./app/build/js"));
    });

    gulp.task("scripts", ["scripts-full", "scripts-min"]);

    /* ========= *
     * Templates *
     * ========= */

    gulp.task("templates-index", function() {
        var utils = {
            compress: require("gulp-minify-html"),
            rename: require("gulp-rename")
        };

        var sources = watchGlobs.templates.main;

        gulp.src(sources)
            .pipe(utils.rename("index.html"))
            .pipe(utils.compress({ empty: true }))
            .pipe(gulp.dest("."));
    });

    gulp.task("templates-auxiliary", function() {
        var utils = {
            compress: require("gulp-minify-html")
        };

        var sources = watchGlobs.templates.aux;

        gulp.src(sources)
            .pipe(utils.compress({ empty: true }))
            .pipe(gulp.dest("./app/build/html"));
    });

    gulp.task("templates", ["templates-index", "templates-auxiliary"]);

    /* ======= *
     * Testing *
     * ======= */

    gulp.task("test-sample", function() {

    });

    gulp.task("test", [
        "test-sample"
    ]);

    /* ============ *
     * Entry Points *
     * ============ */

    gulp.task("default", ["styles", "scripts", "templates"]);

    gulp.task("watch", ["default"], function() {
        var sources = {
            styles: watchGlobs.styles.main
                .concat(watchGlobs.styles.aux),

            scripts: watchGlobs.scripts.main
                .concat(watchGlobs.scripts.aux),

            templates: {
                main: watchGlobs.templates.main,
                aux: watchGlobs.templates.aux
            }
        };

        gulp.watch(sources.styles, ["styles"]);
        gulp.watch(sources.scripts, ["scripts"]);
        gulp.watch(sources.templates.main, ["templates-index"]);
        gulp.watch(sources.templates.aux, ["templates-auxiliary"]);
    });

})(require("gulp"));
