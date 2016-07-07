"use strict";

var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    include = require('gulp-html-tag-include');

gulp.task('develop', ['watch', 'server']);

gulp.task('build', ['styles', 'html', 'copy']);

gulp.task('styles', () => {
    return gulp.src('./src/styles/main.css')
        .pipe(cleanCSS())
        .pipe(autoprefixer({browsers: ['last 3 versions']}))
        .pipe(gulp.dest('./build/styles/'));
});

gulp.task('html', () => {
    return gulp.src('./src/*.html')
        .pipe(include())
        .pipe(gulp.dest('./build/'));
});

gulp.task('copy', ['copy-images', 'copy-fonts', 'copy-scripts', 'copy-static']);

gulp.task('copy-images', () => gulp.src('./src/images/*').pipe(gulp.dest('./build/images/')));
gulp.task('copy-fonts', () => gulp.src('./src/fonts/*').pipe(gulp.dest('./build/fonts/')));
gulp.task('copy-scripts', () => gulp.src('./src/scripts/*').pipe(gulp.dest('./build/scripts/')));
gulp.task('copy-static', () => gulp.src('./src/static/*').pipe(gulp.dest('./build/')));

gulp.task('watch', ['build'], () => {
    gulp.watch('./src/scripts/*.js', ['copy-scripts']);
    gulp.watch('./src/fonts/**/*', ['copy-fonts']);
    gulp.watch('./src/images/**/*', ['copy-images']);

    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/styles/**/*', ['styles']);
});

gulp.task('server', () => {
    browserSync({
        files: './build/**/*',
        server: {
            baseDir: './build/'
        }
    });
});