var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const connect = require('gulp-connect');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var pugI18n = require('gulp-i18n-pug');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
 
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

gulp.task('index', function(){
  return gulp.src('app/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/'))
});

gulp.task('css', function(){
  return gulp.src('app/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload())
});
gulp.task('imagemin', () =>
    gulp.src('app/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
);
gulp.task('js', () =>
  gulp.src('app/js/**/*')
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/js'))
);

gulp.task('pugi18n', function () {
  var options = {
    i18n: {
      dest: 'build',
      locales: 'app/locales/*.*'
    },
    pretty: false
  };
  return gulp.src('app/pug/*.pug')
    .pipe(pugI18n(options))
    .pipe(gulp.dest(options.i18n.dest))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/pug/*.pug'], ['pugi18n']);
  gulp.watch(['./app/pug/*/*.pug'], ['pugi18n']);
  gulp.watch(['./app/scss/*.scss'], ['css']);
  gulp.watch(['./app/scss/*/*.scss'], ['css']);
  gulp.watch(['./app/js/**/*'], ['js']);
});

gulp.task('default', [ 'pugi18n', 'css', 'js', 'connect', 'watch']);