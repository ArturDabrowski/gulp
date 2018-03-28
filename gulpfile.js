// 'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps')

var babel = require('gulp-babel');

// ******** Watchers

gulp.task('watch', function () {
    gulp.watch('./assets/**/*.scss', ['sass']);
    gulp.watch('./assets/**/*.js', ['concatJS']);
});

gulp.task('sass-watch', function () {
    gulp.watch('./assets/**/*.scss', ['sass']);
});

gulp.task('js-watch', function () {
    gulp.watch('./assets/**/*.js', ['concatJS']);
});

// ******** Function (tasks for watchers and for manual use)

gulp.task('sass', function () {
    return gulp.src('./assets/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('concatJS',function(){
    return gulp.src(
        [
            './assets/js/views/config.js',
        //Mixins
            './assets/js/views/mixins/event-bus.js',
            './assets/js/views/mixins/social-mixin.js',
            './assets/js/views/components/data-mixin.js',
        //---component mixins
            './assets/js/views/components/drag_drop_input/drag_drop_input_mixin.js',
        //Components
            './assets/js/views/components/drag_drop_input/drag_drop_input.js',
        //Views
            './assets/js/views/components/drag_drop_input/drag_drop_example.js',
            './assets/js/views/email-gate.js',
            './assets/js/views/first-view.js',
            './assets/js/main.js',
        ])
    // .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./assets/js/compiled'))
})

// Concat external JS
gulp.task('concatJSPlugins',function(){
    return gulp.src(
        [
            './assets/js/external/promise.js',
            './assets/js/external/jquery-3.2.1.min.js',
            './assets/js/external/jquery.mask.js',
            './assets/js/external/vue.js',
            './assets/js/external/axios.min.js',
            './assets/js/limcors.js',
            './assets/js/external/lodash.min.js',
        ])
        // .pipe(uglify())
        .pipe(concat('external.js'))
        .pipe(gulp.dest('./assets/js/compiled'))
})
