var gulp = require('gulp');

gulp.task('build', function (cb) {
    return gulp.src("boilerplate/**/*")
        .pipe(gulp.dest("generator-jetfire/generators/app/templates"), cb);
});