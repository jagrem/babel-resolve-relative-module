const gulp = require('gulp'),
	babel = require('gulp-babel'),
	mocha = require('gulp-mocha'),
	register = require('babel/register'),
	polyfill = require('babel/polyfill')


gulp.task('default', ['build', 'test'])

gulp.task('build', () => {
	gulp.src('index.js')
	.pipe(babel())
	.pipe(gulp.dest('dist'))
})

gulp.task('test', () => {
	gulp.src('test/**/*.js')
		.pipe(mocha({
			globals: {
				chai: require('chai').should()
			}
		}))
})