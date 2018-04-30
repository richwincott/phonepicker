const gulp = require('gulp');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-csso');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');
const pump = require('pump');
const browserSync = require('browser-sync');

const js = require('./js');
const css = require('./css');

let devMode = false;

gulp.task('css', function(cb) {
    pump([
        gulp.src(css),
        minifyCSS(),
        concat('main.css'),
        gulp.dest('./build/css'),
        browserSync.reload({
          stream: true
        })
    ], cb); 
});

gulp.task('js', function(cb) {
    pump([
        gulp.src(js),
        gulpif(!devMode, babel()),
        gulpif(!devMode, uglify()),
        concat('scripts.js'),
        gulp.dest('./build/js'),
        browserSync.reload({
          stream: true
        })
    ], cb);
});

gulp.task('html', function(cb) {
    pump([
        gulp.src('./src/public/**/*.*'),
        gulp.dest('./build'),
        browserSync.reload({
          stream: true
        })
    ], cb);
});

gulp.task('build', function() {
    gulp.start([ 'html', 'css', 'js' ]);
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        open: false,
        server: {
          baseDir: "build"
        }
    })
});

gulp.task('start', function() {
    devMode = true;
    gulp.start(['build', 'browser-sync']);
    gulp.watch('./src/css/**/*.css', ['css']);
    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch('./src/public/**/*.*', ['html']);
})