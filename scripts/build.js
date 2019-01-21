const chalk = require('chalk');
const mkdirpNode = require('mkdirp');
const { promisify } = require('util');
const { rollup } = require('rollup');
const { paths, configs, utils } = require('./config');
const mkdirp = promisify(mkdirpNode);

async function buildConfig (build) {
  await mkdirp(paths.dist);
  const bundleName = build.output.file.replace(paths.dist, '');
  console.log(chalk.cyan(`📦  Generating ${bundleName}...`));

  const bundle = await rollup(build.input);
  await bundle.write(build.output);

  console.log(chalk.green(`👍  ${bundleName} ${utils.stats({ path: build.output.file })}`));
}

async function build () {
  await Promise.all(Object.keys(configs).map(key => {
    return buildConfig(configs[key]).catch(err => {
      console.log(err);
    });
  }));
  process.exit(0);
}

build();
