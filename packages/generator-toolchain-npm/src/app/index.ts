import Generator from 'yeoman-generator';
import chalk from 'chalk';

export interface IOptions {
  toolchainYarn: boolean;
}

export default class extends Generator<IOptions> {
  writing(): void {
    this.fs.copy(this.templatePath('.npmrc'), this.destinationPath('.npmrc'));
  }

  end(): void {
    const initCommand = this.options.toolchainYarn ? 'yarn init' : 'npm init';
    this.log(['', `✨  初始化完毕, 请通过 \`${chalk.red(initCommand)}\` 补充项目信息`, ''].join('\n'));
  }
}
