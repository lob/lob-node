// Include gulp
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

//
var paths = {
  sourceFiles: './lib/**/*.js',
  testFiles: 'test/**/*.js'
};

gulp.task('test', function() {
  gulp.src('')
  .pipe(mocha({reporter: 'spec', timeout: 5000}));
});

gulp.task('cover', function (cb) {
  gulp.src(paths.sourceFiles)
    .pipe(istanbul()) // Covering files
    .on('end', function () {
      gulp.src(paths.testFiles)
        .pipe(mocha({reporter: 'spec', timeout: 5000}))
        .pipe(istanbul.writeReports()) // Creating the reports
        .on('end', cb);
    });
});


gulp.task('lint', function() {
  gulp.src([paths.sourceFiles, paths.testFiles])
    .pipe(jshint('.jshintrc')).pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('code', ['lint'], function() {
  nodemon({
    script:'src/index.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  })
    .on('change', ['lint'])
    .on('error', function() {
      console.log('error');
    })
    .on('restart', function() {
      console.log('Server restarted...');
    });
});

// gulp.task('dev', ['server', 'watch']);
