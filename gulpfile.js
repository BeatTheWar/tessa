var gulp = require('gulp');
var browserSync = require('browser-sync');
var packageJson = require('./package.json');
var usemin = require('gulp-usemin');
var wrap = require('gulp-wrap');
var minifyCss = require('gulp-minify-css');
var minifyJs = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyHTML = require('gulp-minify-html');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var less = require('gulp-less');
var path = require('path');


var paths = {
    styles: 'app/styles/**/*.*',
    images: 'app/images/**/*.*',
    font: 'app/fonts/**/*.*',
    templates: 'app/views/*.html',
    index: 'app/index.html'
};


gulp.task('less', function() {
    return gulp.src('./styles/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./styles/css'));
});

gulp.task('clean', function() {
    gulp.src('dist').pipe(clean({
        force: true
    }));
});


gulp.task('copy', function() {
    gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({
                keepSpecialComments: 0
            }), 'concat'],
            js1: [minifyJs(), 'concat']
        }))
        .pipe(gulp.dest('dist'))
    gulp.src(paths.font)
        .pipe(gulp.dest('dist/fonts'))
    gulp.src(paths.templates)
        .pipe(gulp.dest('dist/views'))
    gulp.src(paths.images)
        .pipe(gulp.dest('dist/images'));
});



gulp.task('serve', function() {
    browserSync.init({
        notify: false,
        port: 9003,
        server: "./app",
        routes: {
            "bower_components": "../bower_components"
        },
        ui: {
            port: 24680
        }
    });

    gulp.watch(['app/index.html', 'app/scripts/**/*.*', 'app/styles/*.*', 'app/views/*.*'])
        .on('change', browserSync.reload);
});


gulp.task('dist', ['clean', 'copy']);
