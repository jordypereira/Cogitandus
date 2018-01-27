var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('html', function(){
  return gulp.src('app/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/'))
});

gulp.task('css', function(){
  return gulp.src('app/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('build/css'))
});
gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});
gulp.task('imagemin', () =>
    gulp.src('app/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
);

gulp.task('default', [ 'html', 'css']);