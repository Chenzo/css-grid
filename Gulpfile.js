

var gulp = require('gulp'),
	sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

var browserSync = require('browser-sync').create();



//Task - compiles SCSS files into a single compressed CSS file with a sourcemap
gulp.task('styles', function() {
    gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('./www/css/'))
        .pipe(browserSync.stream());        
});



gulp.task('default', ['styles'] ,function() { //'styles', 
	browserSync.init({
	    proxy: 'http://localhost:8088'
	});
    gulp.watch('./src/scss/**/*.scss',['styles']);
});


