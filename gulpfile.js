// Include gulp
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var clean = require('gulp-clean');
var exit = require('gulp-exit');
var coverageEnforcer = require('gulp-istanbul-enforcer');
var jscs = require('gulp-jscs');
var gutil = require('gulp-util');

//
var paths = {
  sourceFiles: './lib/**/*.js',
  testFiles: 'test/**/*.js',
  gulpFile: 'gulpfile.js'
};

gulp.task('test', ['lint','style'],  function () {
  gulp.src(paths.testFiles)
    .pipe(mocha({reporter: 'spec', timeout: 15000}))
    .on('error', function (error) {
      gutil.log(gutil.colors.red(error.message));
    })
    .pipe(exit());

});

gulp.task('style', function () {
  gulp.src([paths.sourceFiles, paths.testFiles, paths.gulpFile])
    .pipe(jscs());
});

gulp.task('cover', ['lint', 'style'], function (cb) {
  var options = {
    thresholds: {
      statements: 80,
      branches: 70,
      functions: 84,
      lines: 88
    },
    coverageDirectory: './coverage',
    rootDirectory: ''
  };

  gulp.src('coverage')
    .pipe(clean());
  gulp.src(paths.sourceFiles)
    .pipe(istanbul()) // Covering files
    .on('end', function () {
      gulp.src(paths.testFiles)
        .pipe(mocha({reporter: 'spec', timeout: 15000}))
        .on('error', function (error) {
          gutil.log(gutil.colors.red(error.message));
        })
        .pipe(istanbul.writeReports()) // Creating the reports
        .on('end', function () {
          gulp.src('.')
          .pipe(coverageEnforcer(options))
          .on('end', cb)
          .pipe(exit());
        });
    });
});

gulp.task('lint', function () {
  gulp.src([paths.sourceFiles, paths.testFiles, paths.gulpFile])
    .pipe(jshint('.jshintrc'));
});
