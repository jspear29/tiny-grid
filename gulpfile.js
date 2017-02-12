'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const connect = require('gulp-connect');

gulp.task('scripts', function() {
  browserify('src/js/index.js')
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('docs/js'))
    .pipe(connect.reload());
});

// move html/templates/whatever
gulp.task('assets', function() {
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('docs/'))
    .pipe(connect.reload());
});

// compile the sass
gulp.task('sass', function() {

});

// move the vendor stuff here
gulp.task('vendor', function() {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('docs/css/'))
});

// watch my stuffs
gulp.task('watch', function() {
  gulp.watch(['src/**/*.html'], ['assets']);
  gulp.watch(['src/**/*.js'], ['scripts']);
});

// dev server
gulp.task('serve', function() {
  connect.server({
    root: 'docs',
    livereload: true
  });
});

gulp.task('default', ['scripts', 'assets', 'vendor', 'sass', 'serve', 'watch']);
