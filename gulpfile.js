const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

function buildStyles() {
  return src('sass/main.scss')
    .pipe(sourcemaps.init()) // Initialize source maps
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS()) // Minify the CSS
    .pipe(sourcemaps.write('./maps')) // Write source maps to a separate directory
    .pipe(dest('css'));
}

function watchTask() {
   // Use a glob pattern to watch all .scss files in nested folders
   watch('sass/**/*.scss', buildStyles);
 }

exports.default = series(buildStyles, watchTask);
