const gulp = require("gulp"),
  babel = require("gulp-babel"),
  mocha = require("gulp-mocha"),
  register = require("babel-core/register");

gulp.task("build", () => {
  return gulp
    .src("index.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task("test", () => {
  return gulp.src("test/**/*.js").pipe(
    mocha({
      globals: {
        chai: require("chai").should()
      }
    })
  );
});

gulp.task("default", gulp.series("build", "test"));
