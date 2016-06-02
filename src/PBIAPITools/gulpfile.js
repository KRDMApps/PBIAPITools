var ts = require('gulp-typescript');
var gulp = require('gulp');
var clean = require('gulp-clean');

var destPath = './wwwroot/js/';

// Delete the dist directory
gulp.task('clean', function () {
    gulp.src('./wwwroot/app/')
        .pipe(clean());
    return gulp.src(destPath)
        .pipe(clean());
});

//Moves Angular 2 & related scripts to wwwroot folder of ASP.NET Core app
gulp.task("scriptsNStyles", () => {
    gulp.src([
            'es6-shim/**',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/**',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'jquery/dist/**',
            'bootstrap/dist/js/**',
            'ng2-bs3-modal/**/*.js',
    ], {
        cwd: "node_modules/**"
    })
        .pipe(gulp.dest("./wwwroot/js"));

    //gulp.src([
    //'node_modules/bootstrap/dist/css/**'
    //]).pipe(gulp.dest('./wwwroot/css'));

    gulp.src([
    'node_modules/bootstrap/dist/fonts/**'
    ]).pipe(gulp.dest('./wwwroot/fonts'));

    gulp.src([
    'scripts/**'
    ]).pipe(gulp.dest('./wwwroot/app'));

    gulp.src([
    'system.config.js'
    ]).pipe(gulp.dest('./wwwroot'));
});

//ts - task to transpile TypeScript files to JavaScript using Gulp-TypeScript 
var tsProject = ts.createProject('tsconfig.json');
gulp.task('ts', function (done) {
    var tsResult = gulp.src([
            "scripts/*.ts"
    ])
        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest('./wwwroot/app'));
});

gulp.task('watch', ['watch.ts']);

gulp.task('watch.ts', ['ts'], function () {
    return gulp.watch('scripts/*.ts', ['ts']);
});

gulp.task('default', ['scriptsNStyles', 'ts', 'watch']);