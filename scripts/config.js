const path = require('path');
const fs = require('fs');
const replace = require('rollup-plugin-replace');
const vue = require('rollup-plugin-vue');
const resolve = require('rollup-plugin-node-resolve');
const postcss = require('rollup-plugin-postcss');
const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const filesize = require('filesize');
const gzipSize = require('gzip-size');
const { uglify } = require('rollup-plugin-uglify');
const { minify } = require('terser');

const version = process.env.VERSION || require('../package.json').version;

const common = {
  banner:
    `/**
    * Vue-page-designer v${version}
    * (c) ${new Date().getFullYear()} fireyy
    * @license WTFPL
    */`,
  paths: {
    input: path.join(__dirname, '../src/index.js'),
    src: path.join(__dirname, '../src/'),
    dist: path.join(__dirname, '../dist/')
  },
  builds: {
    umd: {
      file: 'vue-page-designer.js',
      format: 'umd',
      name: 'vuePageDesigner',
      env: 'development'
    },
    umdMin: {
      file: 'vue-page-designer.min.js',
      format: 'umd',
      name: 'vuePageDesigner',
      env: 'production'
    },
    esm: {
      file: 'vue-page-designer.esm.js',
      format: 'es'
    }
  }
};

function genConfig (options) {
  const config = {
    description: '',
    input: {
      external: ['vue'],
      input: options.input || common.paths.input,
      plugins: [
        commonjs(),
        replace({ __VERSION__: version }),
        postcss({
          extract: true
        }),
        vue({ css: false }),
        resolve(),
        buble({ exclude: 'node_modules/**' })
      ]
    },
    output: {
      globals: {
        'vue': 'Vue'
      },
      banner: common.banner,
      name: options.name,
      format: options.format,
      file: path.join(common.paths.dist, options.file)
    }
  };

  if (options.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(options.env)
    }));
  }

  if (options.env === 'production') {
    config.input.plugins.push(uglify({}, minify));
  }

  return config;
};

const configs = Object.keys(common.builds).reduce((prev, key) => {
  prev[key] = genConfig(common.builds[key]);

  return prev;
}, {});

module.exports = {
  configs,
  uglifyOptions: common.uglifyOptions,
  paths: common.paths,
  utils: {
    stats ({ path }) {
      const code = fs.readFileSync(path);
      const { size } = fs.statSync(path);
      const gzipped = gzipSize.sync(code);

      return `| Size: ${filesize(size)} | Gzip: ${filesize(gzipped)}`;
    }
  }
};
