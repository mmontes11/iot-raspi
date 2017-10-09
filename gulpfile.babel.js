import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import del from 'del';
import runSequence from 'run-sequence';

const plugins = gulpLoadPlugins();

const paths = {
    js: ['./**/*.js', '!dist/**', '!node_modules/**', "!lib/iot_client/**"],
    nonJs: ['./package.json']
};

gulp.task('clean', () =>
    del(['dist/**', '!dist'])
);

gulp.task('copy', () => {
    gulp.src([...paths.nonJs])
        .pipe(plugins.newer('dist'))
        .pipe(gulp.dest('dist'));
    gulp.src('lib/iot_client/dist/**')
        .pipe(plugins.newer('dist/lib/iot_client'))
        .pipe(gulp.dest('dist/lib/iot_client'));
});

gulp.task('babel', () =>
    gulp.src([...paths.js, '!gulpfile.babel.js'], {base: '.'})
        .pipe(plugins.newer('dist'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel())
        .pipe(plugins.sourcemaps.write('.', {
            includeContent: false,
            sourceRoot(file) {
                return path.relative(file.path, __dirname);
            }
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('default', ['clean'], () => {
    runSequence(
        ['copy', 'babel']
    );
});
