const gulp = require('gulp'),
	babel = require('gulp-babel'),
	mocha = require('gulp-mocha')

gulp.task('default', ['build', 'test'])

gulp.task('build', () => {
	gulp.src('index.js')
	.pipe(babel())
	.pipe(gulp.dest('dist'))
})

gulp.task('test', () => {
	gulp.src('test/**/*.js')
		.pipe(mocha())
})