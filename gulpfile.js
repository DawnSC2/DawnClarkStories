const { src, dest, parallel } = require('gulp'); // Removed 'watch' from here
const eslint = require('gulp-eslint');
const prettier = require('gulp-prettier');

function lint() {
  return src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function format() {
  return src(['**/*.js', '!node_modules/**'])
    .pipe(prettier())
    .pipe(dest((file) => file.base)); // Fixed Prettier error
}

exports.lint = lint;
exports.format = format;
exports.default = parallel(lint, format);
