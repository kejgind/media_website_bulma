/*
  Load required dev dependencies
*/
const gulp = require('gulp');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const livereload = require('gulp-livereload');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

/*
  1. Create server for new Project (change server name and port number if needed)
*/
gulp.task('connect', function() {
  connect.server({
    name: 'media bulma server',
    root: 'dist',
    port: 3000,
    livereload: true
  });
});

/*
  2. Copy needed bootstrap, fontawesome, jquery files to dist folder
*/
gulp.task('copy-js', function(){
	return gulp.src([

	])
		.pipe(gulp.dest('dist/assets/js'))
});

gulp.task('copy-fonts', function(){
  return gulp.src([
    'src/fonts/*/*'
  ])
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('copy-css', function(){
	return gulp.src([

  ])
		.pipe(gulp.dest('dist/assets/css'))
});

gulp.task('copy', ['copy-js', 'copy-fonts', 'copy-css']);

/*
  3. Minify images and move to dist/img folder
*/
gulp.task('imagemin', function(){
  return gulp.src('src/img/*')
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3})
      ]))
    .pipe(gulp.dest('dist/assets/img'));
});

/*
  4 - Compile HTML, SCSS and JS files and move to distribution folder (dist/js and dist/css),
  and do live reload on browser
*/
gulp.task('html', function(){
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('js', function(){
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(connect.reload());
});

gulp.task('sass', function(){
  return gulp.src('src/scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    // .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: [
          "last 2 versions"
        ]
    }))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(connect.reload());
});

/*
  4 - Watch for changes in source project files
*/
gulp.task('watch', function () {
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/scss/main.scss', ['sass']);
  gulp.watch('src/js/*.js', ['js']);
});

/*
  5 - Run server with watch and live reload of project files
*/
gulp.task('default', ['connect', 'html', 'sass', 'js', 'watch']);

/*
  6. Copy dist folder to docs folder for github pages
*/
gulp.task('docs', function(){
  return gulp.src([
    'dist/*.html',
    'dist/*/*',
    'dist/*/*/*',
    'dist/*/*/*/*'
])
    .pipe(gulp.dest('docs'));
});
