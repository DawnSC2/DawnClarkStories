const { src, dest, series, parallel, watch } = require('gulp');
const eslint = require('gulp-eslint');
const prettier = require('gulp-prettier');

function lint() {
  return src(['**/*.js', '!node_modules/**', '!build/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function prettify() {
  return src(['**/*.js', '!node_modules/**', '!build/**'])
    .pipe(prettier())
    .pipe(dest(file => file.base));
}

exports.lint = lint;
exports.prettify = prettify;
exports.default = series(lint, prettify);
