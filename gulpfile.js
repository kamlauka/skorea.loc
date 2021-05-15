var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var server = require("browser-sync").create();


gulp.task("sass", function() {
    return gulp.src("scss/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(server.stream());
});


gulp.task("serve", gulp.series(["sass"], function () {
    server.init({
        server: {
            baseDir: '.'
        },
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("scss/*.scss", gulp.parallel(["sass"]));
    gulp.watch("*.html").on("change", server.reload);
}));



gulp.task('def', gulp.series('sass', 'serve'));



