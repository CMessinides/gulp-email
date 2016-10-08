// require gulp and plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefix = require('autoprefixer'),
    inline = require('gulp-inline-css'),
    minify = require('gulp-htmlmin'),
    browserSync = require('browser-sync').create();

// alias the browser-sync reload
var reload = browserSync.reload;

// tell browser-sync to watch the public directory
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './pub/'
    }
  });
});

// compile the css with the required vendor prefixes
gulp.task('sass', function() {
  gulp.src('./src/sass/main.scss')
      .pipe(sass())
      //.pipe(autoprefix('last 2 version'))
      .pipe(gulp.dest('./src/css/'))
});

// inline the css and minify the html email
gulp.task('build', function() {
  gulp.src('./src/index.html')
      .pipe(inline())
      .pipe(minify({ collapseWhitespace: true }))
      .pipe(gulp.dest('./pub/'));
});

// watch for changes and rebuild the email as needed
gulp.task('watch', ['sass', 'browser-sync'], function() {
  gulp.watch('./src/**/*', ['sass', 'build']);
});

gulp.task('default', ['sass', 'browser-sync', 'build', 'watch']);
