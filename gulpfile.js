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
gulp.task('connect', _ => {
  connect.server({
    name: 'media bulma server',
    root: 'dist',
    port: 3000,
    livereload: true
  });
});

/*
  2. In first step copy bulma-extensions JS files to src/js/bulma,
  in second step get copy all needed JS and fontawesome files to dist folder.
  Remember to add needed JS files to HTML files.
*/
gulp.task('bulma-js', _ => {
	return gulp.src('node_modules/bulma-extensions/*/*.min.js')
		.pipe(gulp.dest('src/js/bulma'))
});


gulp.task('copy-js', _ => {
	return gulp.src()
		.pipe(gulp.dest('dist/assets/js'))
});

gulp.task('copy-fonts', _ => {
  return gulp.src([
    'src/fonts/*/*'
  ])
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('copy', ['copy-js', 'copy-fonts']);

/*
  3. Minify images and move to dist/img folder
*/
gulp.task('imagemin', _ => {
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
gulp.task('html', _ => {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('js', _ => {
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(connect.reload());
});

gulp.task('sass', _ => {
  return gulp.src('src/scss/*.scss')
    // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
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
gulp.task('watch', _ => {
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['js']);
});

/*
  5 - Run server with watch and live reload of project files
*/
gulp.task('default', ['connect', 'html', 'sass', 'js', 'watch']);

/*
  6. Copy dist folder to docs folder for github pages
*/
gulp.task('docs', _ => {
  return gulp.src([
    'dist/*.html',
    'dist/*/*',
    'dist/*/*/*',
    'dist/*/*/*/*'
])
    .pipe(gulp.dest('docs'));
});
