const gulp = require('gulp');
const eslint = require('gulp-eslint');
const prettier = require('gulp-prettier');

gulp.task('lint', () => {
  return gulp
    .src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('prettify', () => {
  return gulp
    .src(['**/*.js', '!node_modules/**'])
    .pipe(prettier())
    .pipe(gulp.dest(file => file.base));
});

gulp.task('default', gulp.series('lint', 'prettify'));
