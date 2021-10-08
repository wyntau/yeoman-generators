import Generator from 'yeoman-generator';
import ora from 'ora';
import chalk from 'chalk';
import { IGeneratorStarterTypescriptOptions } from '@wyntau/generator-starter-typescript';

export interface IGeneratorMiniprogramOptions {
  appid: string;
  projectName: string;
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
    this.composeWith(require.resolve('@wyntau/generator-starter-typescript/generators/app'), {
      toolchainYarn: true,
      toolchainLerna: false,
      targetReact: false,
      targetReactWithJsxRuntime: false,
      targetVue: false,
    } as IGeneratorStarterTypescriptOptions);
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
