import Generator from 'yeoman-generator';
import ora from 'ora';
import chalk from 'chalk';
import { IGeneratorOptions } from '@wyntau/generator-shared';
import { IGeneratorToolchainEslintOptions } from '@wyntau/generator-toolchain-eslint';

export interface IGeneratorMiniprogramOptions {
  appid: string;
  projectName: string;
  mmp: boolean;
  mmpAppid: string;
}

export default class GeneratorMiniprogram extends Generator<IGeneratorMiniprogramOptions> {
  initializing(): void {
    this.option('appid', { type: String, description: '微信小程序 appid' });
    this.option('project-name', { type: String, description: '项目名称' });
  }
  async prompting(): Promise<void> {
    const props = await this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称',
        default: this.options.projectName,
        when: this.options.projectName == null || this.options.projectName === undefined,
      },
      {
        type: 'input',
        name: 'appid',
        message: '请输入微信小程序 appid',
        default: this.options.appid,
        when: this.options.projectName === null || this.options.projectName === undefined,
      },
    ]);

    this.options = Object.assign({}, this.options, props);
  }

  default(): void {
    this.composeWith(require.resolve('@wyntau/generator-shared'), { toolchainYarn: true } as IGeneratorOptions);
    this.composeWith(require.resolve('@wyntau/generator-toolchain-npm'));
    this.composeWith(require.resolve('@wyntau/generator-toolchain-yarn'));
    this.composeWith(require.resolve('@wyntau/generator-toolchain-nvm'));

    this.composeWith(require.resolve('@wyntau/generator-toolchain-typescript/generators/app'));

    this.composeWith(require.resolve('@wyntau/generator-toolchain-prettier/generators/app'));
    this.composeWith(require.resolve('@wyntau/generator-toolchain-eslint/generators/app'), {
      toolchainTypescript: true,
      toolchainPrettier: true,
      toolchainLerna: false,
      targetReact: false,
      targetVue: false,
    } as IGeneratorToolchainEslintOptions);

    this.composeWith(require.resolve('@wyntau/generator-toolchain-husky/generators/app'));
    this.composeWith(require.resolve('@wyntau/generator-toolchain-commitlint/generators/app'));
    this.composeWith(require.resolve('@wyntau/generator-toolchain-lint-staged/generators/app'));

    this.composeWith(require.resolve('@wyntau/generator-toolchain-patch-package/generators/app'));
  }

  async writing(): Promise<void> {
    this.fs.copyTpl(this.templatePath('.'), this.destinationPath('.'), this.options, undefined, {
      globOptions: { dot: true },
    });

    const devDependencies = [
      'miniprogram-api-typings',

      'gulp',
      'gulp-clean',
      'gulp-replace',
      '@wyntau/gulp-mp',
      'glob',

      'rollup',
      '@rollup/plugin-typescript',
      '@rollup/plugin-commonjs',
      '@rollup/plugin-node-resolve',
      '@rollup/plugin-replace',
      'rollup-plugin-rename@1.0.1',
      'rollup-plugin-terser',
      'fancy-log',
    ];
    const spinner = ora(`Resolving devDependencies ${chalk.red(devDependencies.join(', '))}`).start();
    await this.addDevDependencies(devDependencies);
    spinner.succeed();
  }
}
