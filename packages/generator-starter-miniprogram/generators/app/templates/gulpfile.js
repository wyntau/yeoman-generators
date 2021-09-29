const gulp = require('gulp');
const gulpClean = require('gulp-clean');
const gulpReplace = require('gulp-replace');
const { usingComponentsPathRewriter } = require('@wyntau/gulp-mp').plugins;
const { nodeModulesComponentsPathFinder } = require('@wyntau/gulp-mp').tools;
const { rollupWatch, rollupBuild, tjsEntries, distPath, miniprogramRoot } = require('./rollup.config');

gulp.task('rollupBuild', rollupBuild);
gulp.task('rollupWatch', rollupWatch);

const extraFiles = [
  `${miniprogramRoot}/modules/login/**`,
]
gulp.task('extraFiles', () => {
  return gulp.src(extraFiles, {base: miniprogramRoot}).pipe(gulp.dest(distPath))
})

const copyFiles = [
  `${miniprogramRoot}/**/*.+(wxml|wxss|scss|wxs|json|map)`,
  `${miniprogramRoot}/**/*.+(png|jpg|jpeg|gif|mp3)`
];
gulp.task('copyFiles', () => {
  return gulp
    .src(copyFiles, {base: miniprogramRoot})
    .pipe(usingComponentsPathRewriter())
    .pipe(gulp.dest(distPath))
});

gulp.task('nodeModuleComponents', (cb) => {
  const copyPaths = nodeModulesComponentsPathFinder({inputFiles: copyFiles, ignoreFiles: extraFiles})

  if(!copyPaths.length){
    return cb();
  }

  return gulp
    .src(copyPaths, {base: nodeModulesPath, allowEmpty: true})
    .pipe(usingComponentsPathRewriter())
    .pipe(gulp.dest(`${distPath}/npm_modules`));
});

/* 清除dist目录 */
gulp.task('clean', () => {
  return gulp.src(distPath, { allowEmpty: true }).pipe(gulpClean());
});

/* 打包project.config */
gulp.task('projectConfig', () => {
  return gulp
    .src(`project.config.json`)
    .pipe(gulpReplace('dist/', ''))
    .pipe(gulp.dest(distPath));
});

/* watch */
gulp.task('watch', () => {
  rollupWatch();
  gulp.watch(tjsEntries, gulp.series('rollupWatch'));
  gulp.watch(copyFiles, gulp.series('copyFiles'));
});

/* build */
gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel('projectConfig', 'extraFiles'),
    gulp.parallel('rollupBuild', 'copyFiles', 'nodeModuleComponents')
  )
);
