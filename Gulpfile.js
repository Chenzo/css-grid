
const { src, dest, watch, series } = require('gulp');
const terser = require('gulp-terser');
const sass = require('gulp-sass')(require('sass'));

//var sourcemaps = require('gulp-sourcemaps');

var browsersync = require('browser-sync').create();

function scssTask(){
    return src('./src/scss/**/*.scss', { sourcemaps: true })
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(dest('./www/css/', { sourcemaps: '.' }));
  }


// JavaScript Task
function jsTask(){
    return src('./src/js/**/*.js', { sourcemaps: true })
      .pipe(terser())
      .pipe(dest('./www/js/', { sourcemaps: '.' }));
  }  


  function browsersyncServe(cb){
    browsersync.init({
        proxy: 'http://localhost:8088'
      /* server: {
        baseDir: './www'
      }   */  
    });
    cb();
  }

  function browsersyncReload(cb){
    browsersync.reload();
    cb();
  }



  // Watch Task
function watchTask(){
    watch('*.html', browsersyncReload);
    watch(['./src/scss/**/*.scss', './src/js/**/*.js'], series(scssTask, jsTask, browsersyncReload));
  }

// Default Gulp Task
exports.default = series(
    scssTask,
    jsTask,
    browsersyncServe,
    watchTask
  );