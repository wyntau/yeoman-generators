import Generator from 'yeoman-generator';
import chalk from 'chalk';

export interface IOptions {
  toolchainNpm: boolean;
}

export default class extends Generator<IOptions> {
  writing(): void {
    this.fs.copy(this.templatePath('.npmrc'), this.destinationPath('.npmrc'));
  }

  end(): void {
    if (!this.options.toolchainNpm) {
      return;
    }
    this.log(['', `✨  初始化完毕, 请通过 \`${chalk.red('npm init')}\` 补充项目信息`, ''].join('\n'));
  }
}
