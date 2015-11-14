'use strict';

var gulp       = require('gulp');
var plugins    = require('gulp-load-plugins')();
var del        = require('del');
var argv       = require('yargs').argv;
var vinylPaths = require('vinyl-paths');

var paths = {
  sourceFiles: 'lib/**/*.js',
  testFiles: 'test/**/*.js',
  gulpFile: 'gulpfile.js'
};

var envVars = {
  COVERAGE_DIR: '.'
};

var TIMEOUT = 30000;

gulp.task('cover', function () {
  if (process.env.NODE_ENV !== 'test') {
    Object.keys(envVars).forEach(function (key) {
      process.env[key] = envVars[key];
    });
  }
  return gulp.src(paths.sourceFiles)
    .pipe(plugins.istanbul());
});

gulp.task('coveralls', function () {
  gulp.src('coverage/**/lcov.info')
    .pipe(plugins.coveralls());
});

gulp.task('testCI', ['cover'], function () {
  if (process.env.NODE_ENV !== 'test') {
    gulp.src(process.env.COVERAGE_DIR + '/coverage')
      .pipe(vinylPaths(del));
    Object.keys(envVars).forEach(function (key) {
      process.env[key] = envVars[key];
    });
  }

  var options = {
    dir: process.env.COVERAGE_DIR + '/coverage',
    reporters: ['lcov', 'json', 'text', 'text-summary'],
    reportOpts: { dir: process.env.COVERAGE_DIR + '/coverage' }
  };

  return gulp.src(paths.testFiles)
    .pipe(plugins.mocha({
      reporter: 'spec',
      timeout: TIMEOUT,
      grep: argv.grep
    }))
    .on('error', function (error) {
      plugins.util.log(plugins.util.colors.red(error.message));
      process.exit(1);
    })
    .pipe(plugins.istanbul.writeReports(options))
    .pipe(plugins.exit());
});

gulp.task('test', function () {
  return gulp.src(paths.testFiles)
    .pipe(plugins.mocha({
      reporter: 'spec',
      timeout: TIMEOUT,
      grep: argv.grep
    }))
    .on('error', function (error) {
      plugins.util.log(plugins.util.colors.red(error.message));
    })
    .pipe(plugins.exit());
});

gulp.task('enforce', function () {
  return gulp.src('.')
    .pipe(plugins.istanbulEnforcer({
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100
      },
      coverageDirectory: process.env.COVERAGE_DIR,
      rootDirectory: ''
    }))
    .on('error', function (error) {
      plugins.util.log(plugins.util.colors.red(error.message));
      process.exit(1);
    })
    .pipe(plugins.exit());
});
