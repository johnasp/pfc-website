const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename'); // Import gulp-rename

function buildUnminifiedStyles() {
  return src('sass/main.scss')
    .pipe(sourcemaps.init()) // Initialize source maps
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps')) // Write source maps to a separate directory
    .pipe(dest('css')); // Export unminified CSS
}

function buildMinifiedStyles() {
  return src('sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS()) // Minify the CSS
    .pipe(rename('main.min.css')) // Rename the minified file to main.min.css
    .pipe(dest('css')); // Export minified CSS
}

function watchTask() {
  // Use a glob pattern to watch all .scss files in nested folders
  watch('sass/**/*.scss', series(buildUnminifiedStyles, buildMinifiedStyles));
}

exports.default = parallel(buildUnminifiedStyles, buildMinifiedStyles, watchTask);
