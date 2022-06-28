var gulp = require("gulp");
var stylus = require("gulp-stylus");

gulp.task("styles", function (task) {
  gulp.src("style.styl").pipe(stylus()).pipe(gulp.dest("./"));
  task();
});

gulp.task("watch:styles", function () {
  gulp.watch("**/*.styl", gulp.series("styles"));
});
