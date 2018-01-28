var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');
 
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});
gulp.task('html', function(){
  return gulp.src('app/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload())
});

gulp.task('css', function(){
  return gulp.src('app/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload())
});
gulp.task('imagemin', () =>
    gulp.src('app/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
);
gulp.task('watch', function () {
  gulp.watch(['./app/pug/*.pug'], ['html']);
  gulp.watch(['./app/pug/*/*.pug'], ['html']);
  gulp.watch(['./app/scss/*.scss'], ['css']);
  gulp.watch(['./app/scss/*/*.scss'], ['css']);
});
gulp.task('default', [ 'html', 'css','connect', 'watch']);