const { series, src, dest, watch } = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

/**
 * Helper: Compile TypeScript
 */
function compile() {
    return tsProject
        .src()
        .pipe(tsProject())
        .pipe(dest('dist'));
}

/**
 * Helper: Copy required files in build project
 */
function copyFiles() {
    return src('src/commands/init/template/*.java').pipe(
        dest('dist/commands/init/template'),
    );
}

/**
 * Task: Build project
 */
const build = series(compile, copyFiles);
exports.default = build;
exports.build = build;

/**
 * Task: Constatnly watch for changes and recompile
 */
exports.watch = function() {
    build();
    watch('src/**/*.js', compile);
};
