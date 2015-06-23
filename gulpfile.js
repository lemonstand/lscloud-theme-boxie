var gulp = require('gulp');

// Include plugins
var jshint = require('gulp-jshint');
var bower = require('gulp-bower');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require("gulp-notify");

// Lint
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify(
            function (file) {
              if (file.jshint.success) {
                return false;
              }

              var errors = file.jshint.results.map(function (data) {
                if (data.error) {
                  return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                }
              }).join("\n");
              return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
            }
        ));
});

// Compile less
gulp.task('less', function() {
    return gulp.src('resources/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('resources/css'));
});

// Concat & minify JS
gulp.task('scripts', function() {
    return gulp.src('resources/js/*.js')
        .pipe(concat('_all.js'))
        .pipe(gulp.dest('resources/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('resources/js'));
});

// Watch for changes
gulp.task('watch', function() {
    gulp.watch('resources/js/*.js', ['lint', 'scripts']);
    gulp.watch('resources/less/*.less', ['less']);
});

// Default task
gulp.task('default', ['lint', 'less', 'scripts', 'watch']);