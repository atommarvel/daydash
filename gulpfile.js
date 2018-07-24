const gulp = require('gulp');
const del = require('del');
const zip = require('gulp-zip');

const manifest = require('./manifest.json');
const paths = {
    build: "./build",
    builds: "./builds"
};

gulp.task('copyFiles', () => {
   return gulp.src([
       'img/**',
       'dist/**',
       'lib/**',
       '*.html',
       'src/scss/*.css',
       'manifest.json'
   ], {base: '.'})
       .pipe(gulp.dest(paths.build))
});

gulp.task('cleanup', () => {
    return del(paths.build)
});

gulp.task('zipExtension', () => {
   return gulp.src(`${paths.build}/**`)
       .pipe(zip(`daydash-${getVersionNumber()}.zip`))
       .pipe(gulp.dest(paths.builds));
});

gulp.task('default', gulp.series('copyFiles', 'zipExtension', 'cleanup'));

function getVersionNumber() {
    return manifest.version;
}