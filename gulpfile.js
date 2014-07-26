// Include gulp
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var argv    = require('yargs').argv;
var stylish = require('jshint-stylish');

var paths = {
  sourceFiles: 'lib/**/*.js',
  testFiles: 'test/**/*.js',
  gulpFile: 'gulpfile.js'
};

/* jshint camelcase: false */
gulp.task('style', function () {
  gulp.src([paths.sourceFiles, paths.testFiles, paths.gulpFile])
    .pipe(plugins.jscs());
});

gulp.task('cover', function () {
  return gulp.src(paths.sourceFiles)
    .pipe(plugins.istanbul());
});

gulp.task('testCI', ['lint', 'style', 'cover'], function () {
  var options = {
    dir: process.env.COVERAGE_DIR + '/coverage',
    reporters: ['lcov', 'json', 'text', 'text-summary'],
    reportOpts: {dir: process.env.COVERAGE_DIR + '/coverage'}
  };

  return gulp.src(paths.testFiles)
    .pipe(plugins.mocha({reporter: 'spec', timeout: 15000, grep: argv.grep}))
    .on('error', function (error) {
      plugins.util.log(plugins.util.colors.red(error.message));
      process.exit(1);
    })
    .pipe(plugins.istanbul.writeReports(options))
    .pipe(plugins.exit());
});

gulp.task('test', ['lint', 'style'], function () {
  return gulp.src(paths.testFiles)
    .pipe(plugins.mocha({reporter: 'spec', timeout: 15000, grep: argv.grep}))
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

gulp.task('lint', function () {
  gulp.src([paths.sourceFiles, paths.testFiles, paths.gulpFile])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('lint-nofail', function () {
  gulp.src([paths.sourceFiles, paths.testFiles, paths.gulpFile])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish));
});

gulp.task('start', ['lint-nofail', 'style'], function () {
  plugins.nodemon({
    script: 'src/index.js',
    ext: 'js',
    nodeArgs: argv.debug ? ['debug'] : []
  })
    .on('restart', ['lint-nofail', 'style'])
    .on('error', function () {
      console.log('error');
    })
    .on('restart', function () {
      console.log('Server restarted...');
    });
});
