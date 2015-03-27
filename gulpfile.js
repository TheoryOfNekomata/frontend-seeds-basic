/*global require*/

(function(gulp, undefined) {
    "use strict";

    gulp.task("styles", function() {
        var utils = {
            compile: require("gulp-sass"),
            compress: require("gulp-uglifycss"),
            rename: require("gulp-rename")
        };

        gulp.src("style.sass")
            .pipe(utils.compile({ indentedSyntax: true }))
            .pipe(utils.compress())
            .pipe(utils.rename("style.min.css"))
            .pipe(gulp.dest("."));
    });

    gulp.task("scripts", function() {
        var utils = {
            compress: require("gulp-uglify"),
            concat: require("gulp-concat")
        };

        gulp.src([
            "lib/jquery/dist/jquery.js",
            "lib/bootstrap-sass/assets/javascripts/bootstrap.js",
            "app/js/src/**/*.js"
        ])
            .pipe(utils.concat("script.min.js"))
            .pipe(utils.compress())
            .pipe(gulp.dest("."));
    });

    gulp.task("templates-index", function() {
        var utils = {
            compress: require("gulp-minify-html"),
            rename: require("gulp-rename")
        };

        gulp.src("index.src.html")
            .pipe(utils.rename("index.html"))
            .pipe(utils.compress({ empty: true }))
            .pipe(gulp.dest("."));
    });

    gulp.task("templates-auxiliary", function() {
        var utils = {
            compress: require("gulp-minify-html")
        };

        gulp.src("./app/html/src/**/*.html")
            .pipe(utils.compress({ empty: true }))
            .pipe(gulp.dest("./app/html"));
    });

    gulp.task("templates", ["templates-index", "templates-auxiliary"]);

    gulp.task("watch", function() {
        gulp.watch(["./app/sass/**/*.sass", "style.sass"], ["styles"]);
        gulp.watch(["./app/js/**/*.js"], ["scripts"]);
        gulp.watch(["./app/html/src/**/*.html", "index.src.html"], ["templates"]);
    });

    gulp.task("test", function() {
        // TODO test script
    });

    gulp.task("default", ["styles", "scripts", "templates"]);

})(require("gulp"));
