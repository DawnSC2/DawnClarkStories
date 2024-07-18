const { src, dest, parallel, watch } = require('gulp');
const eslint = require('gulp-eslint');
const prettier = require('gulp-prettier');

function lint() {
  return src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function prettify() {
  return src(['**/*.js', '!node_modules/**'])
    .pipe(prettier())
    .pipe(dest(file => file.base));
}

exports.lint = lint;
exports.prettify = prettify;
exports.default = parallel(lint, prettify);
