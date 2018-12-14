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
    root: 'docs',
    livereload: true
  });
});
gulp.task('html', function(){
  return gulp.src('app/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('docs/'))
    .pipe(connect.reload())
});

gulp.task('index', function(){
  return gulp.src('app/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('docs/'))
});

gulp.task('css', function(){
  return gulp.src('app/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(gulp.dest('docs/css'))
    .pipe(connect.reload())
});
gulp.task('imagemin', () =>
    gulp.src('app/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('docs/images'))
);
gulp.task('js', () =>
  gulp.src('app/js/**/*')
  .pipe(concat('main.js'))
  // .pipe(uglify())
  .pipe(gulp.dest('docs/js'))
);

gulp.task('php', () =>
  gulp.src('app/php/**/*')
  .pipe(gulp.dest('docs/php'))
);

gulp.task('pugi18n', function () {
  var options = {
    i18n: {
      dest: 'docs',
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
  gulp.watch(['./app/php/**/*'], ['php']);
});

gulp.task('default', [ 'php', 'pugi18n', 'css', 'js', 'connect', 'watch']);