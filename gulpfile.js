"use strict";

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    include = require('gulp-html-tag-include'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    argv = require('yargs').argv,
    sequence = require('gulp-sequence'),
    ghPages = require('gulp-gh-pages'),
    nodemon = require('gulp-nodemon');

gulp.task('default', ['watch', 'server']);

gulp.task('build', callback => {
    sequence('clean', ['styles', 'scripts', 'html', 'images', 'copy'])(callback);
});

gulp.task('styles', () => {
    return gulp.src('./src/styles/main.css')
        .pipe(cleanCSS())
        .pipe(autoprefixer({browsers: ['last 3 versions']}))
        .pipe(gulp.dest('./www/styles/'));
});

gulp.task('scripts', () => {
    return gulp.src('./src/scripts/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./www/scripts/'));
});

gulp.task('html', () => {
    return gulp.src('./src/*.html')
        .pipe(include())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./www/'));
});

gulp.task('images', () => {
    return gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./www/images/'));
});

gulp.task('clean', () => gulp.src('./www').pipe(clean()));

gulp.task('copy', ['copy-fonts', 'copy-static']);

gulp.task('copy-fonts', () => gulp.src('./src/fonts/*').pipe(gulp.dest('./www/fonts/')));
gulp.task('copy-static', () => gulp.src('./src/static/*').pipe(gulp.dest('./www/')));

gulp.task('watch', ['build'], () => {
    gulp.watch('./src/fonts/**/*', ['copy-fonts']);

    gulp.watch('./src/scripts/*.js', ['scripts']);
    gulp.watch('./src/images/**/*', ['images']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/styles/**/*', ['styles']);
});

gulp.task('server', () => {
  nodemon({
    script: 'server',
    watch: ['server','.env'],
  });
});

gulp.task('deploy-prefix', () => {
    return gulp.src('./www/**/*.html')
        .pipe(prefix('/gandalf.landing.web'))
        .pipe(gulp.dest('./www'));
});

gulp.task('deploy', ['deploy-prefix'], () => gulp.src('./www/**/*').pipe(ghPages()));

gulp.task('production', callback => {
    argv.production = true;
    sequence('build', callback);
});
