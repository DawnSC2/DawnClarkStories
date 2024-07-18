const { src, dest, parallel } = require('gulp');
const eslint = require('gulp-eslint');
const prettier = require('gulp-prettier');
const stylelint = require('gulp-stylelint');

function lintJS() {
  return src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function lintCSS() {
  return src(['**/*.css', '!node_modules/**'])
    .pipe(stylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
}

function formatJS() {
  return src(['**/*.js', '!node_modules/**'])
    .pipe(prettier())
    .pipe(dest((file) => file.base));
}

function formatCSS() {
  return src(['**/*.css', '!node_modules/**'])
    .pipe(prettier())
    .pipe(dest((file) => file.base));
}

exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.formatJS = formatJS;
exports.formatCSS = formatCSS;
exports.lint = parallel(lintJS, lintCSS);
exports.format = parallel(formatJS, formatCSS);
exports.default = parallel(lintJS, lintCSS, formatJS, formatCSS);
