const rollup = require('rollup');
const rollupTypescript = require('@rollup/plugin-typescript');
const rollupCommonjs = require('@rollup/plugin-commonjs');
const rollupResolve = require('@rollup/plugin-node-resolve').nodeResolve;
const rollupReplace = require('@rollup/plugin-replace');
const rollupRename = require('rollup-plugin-rename').default;
const rollupTerser = require('rollup-plugin-terser').terser;
const fancyLog = require('fancy-log');
const glob = require('glob');
const pkg = require('./package.json');

const distPath = exports.distPath = './dist';
const miniprogramRoot = exports.miniprogramRoot = './miniprogram';
const tjsEntries = exports.tjsEntries = [
  `${miniprogramRoot}/app.ts`,
  `${miniprogramRoot}/pages/**/index.ts`,
  `${miniprogramRoot}/components/**/index.ts`,
  `${miniprogramRoot}/**/components/**/index.ts`,
  `${miniprogramRoot}/custom-tab-bar/**/index.ts`
];

function getRollupConfig(){
  return {
    input: tjsEntries.map(item => glob.sync(item)).reduce((result, cur) => result.concat(cur), []),
    plugins: [
      rollupReplace({
        __VERSION__: JSON.stringify(pkg.version),
        __ENV__: JSON.stringify(process.env.ENV || 'test')
      }),
      rollupResolve({
        browser: true,
      }),
      rollupCommonjs(),
      rollupTypescript({
        typescript: require('typescript')
      }),
      rollupTerser({
        mangle: {
          safari10: true
        }
      }),
      rollupRename({
        matchAll: true,
        map: input => input && input.replace(/node_modules/g, "npm_modules")
      })
    ],
    output: {
      dir: distPath,
      preserveModules: true,
      preserveModulesRoot: 'miniprogram',
      format: 'commonjs',
      exports: 'auto',
      sourcemap: false,
    },
    watch: {
      buildDelay: 30,
    }
  }
}

function onEvent(event){
  switch(event.code){
    case 'BUNDLE_END':
      fancyLog('Rollup (re)build complete');
    default:
      return;
  }
}

let rollupWatcher;
exports.rollupWatch = (callback) => {
  if(rollupWatcher){
    rollupWatcher.off('event', onEvent);
    rollupWatcher.close();
    rollupWatcher = null;
  }

  const rollupConfig = getRollupConfig();
  rollupWatcher = rollup.watch(rollupConfig);
  rollupWatcher.on('event', onEvent);

  callback && callback();
}

exports.rollupBuild = async () => {
  const rollupConfig = getRollupConfig();
  const bundles = await rollup.rollup(rollupConfig);
  await bundles.write(rollupConfig.output);
}