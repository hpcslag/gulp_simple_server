//NPM Package Install (Shell): npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr --save-dev
/*
	gulp    = require('gulp'),                 BaseLibrary
    imagemin = require('gulp-imagemin'),       Img Compression
    sass = require('gulp-ruby-sass'),          SASS
    minifycss = require('gulp-minify-css'),    CSS Compression
    jshint = require('gulp-jshint'),           JS Check
    uglify  = require('gulp-uglify'),          JS Compression
    rename = require('gulp-rename'),           Rename
    concat  = require('gulp-concat'),          Merge Files
    clean = require('gulp-clean'),             Clean Folder
    tinylr = require('tiny-lr'),               Livereload (Auto)
    server = tinylr(),						   
    port = 8080,
    livereload = require('gulp-livereload');   Livereload
    
    Install Gulp => npm install gulp
    Install LiveReload => npm install gulp gulp-livereload --save-dev
    Install Chrome Plug-in LiveReload: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en
    Install NPM http-server => npm install -g http-server，RUN: http-server
*/
var gulp    = require('gulp'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify  = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat  = require('gulp-concat'),
    clean = require('gulp-clean'),
    tinylr = require('tiny-lr'),
    server = tinylr(),
    port = 35729,
    livereload = require('gulp-livereload');

// HTML Handle
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(htmlDst))
});

// Style Handle
gulp.task('css', function () {
    var cssSrc = './src/scss/*.scss',
        cssDst = './dist/css';

    gulp.src(cssSrc)
        .pipe(sass({ style: 'expanded'}))
        .pipe(gulp.dest(cssDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(gulp.dest(cssDst));
});

// images Handle
gulp.task('images', function(){
    var imgSrc = './src/images/**/*',
        imgDst = './dist/images';
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(livereload(server))
        .pipe(gulp.dest(imgDst));
})

// js Handle
gulp.task('js', function () {
    var jsSrc = './src/js/*.js',
        jsDst ='./dist/js';

    gulp.src(jsSrc)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(livereload(server))
        .pipe(gulp.dest(jsDst));
});

// cleand style css,js,images
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/js', './dist/images'], {read: false})
        .pipe(clean());
});

// defalut tasks clean image,style,js,rebuild,run, gulp
gulp.task('default', ['clean'], function(){
    gulp.start('html','css','images','js');
});

// listen task ，Run gulp watch
gulp.task('watch',function(){

    server.listen(port, function(err){
        if (err) {
            return console.log(err);
        }

        // listen html
        gulp.watch('./src/*.html', function(event){
            gulp.run('html');
        })

        // listen css
        gulp.watch('./src/scss/*.scss', function(){
            gulp.run('css');
        });

        // listen images
        gulp.watch('./src/images/**/*', function(){
            gulp.run('images');
        });

        // listen js
        gulp.watch('./src/js/*.js', function(){
            gulp.run('js');
        });

    });
});