import Generator from 'yeoman-generator';
import ora from 'ora';
import chalk from 'chalk';

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
        message: '请输入项目名称',
        default: this.options.projectName,
        when: this.options.projectName == null || this.options.projectName === undefined,
      },
      {
        type: 'input',
        message: '请输入微信小程序 appid',
        default: this.options.appid,
        when: this.options.projectName == null || this.options.projectName === undefined,
      },
    ]);

    this.options = Object.assign({}, this.options, props);
  }

  async writing(): Promise<void> {
    this.fs.copyTpl(this.templatePath('.'), this.destinationPath('.'), this.options, undefined, {
      globOptions: { dot: true },
    });

    const devDependencies = ['miniprogram-api-typings'];
    const spinner = ora(`Resolving package devDependencies ${chalk.red(devDependencies.join(', '))}`).start();
    await this.addDevDependencies(devDependencies);
    spinner.succeed();
  }
}
