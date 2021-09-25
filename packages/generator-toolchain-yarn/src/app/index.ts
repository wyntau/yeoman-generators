import Generator from 'yeoman-generator';
import chalk from 'chalk';

export default class extends Generator {
  initializing(): void {
    this.env.options.nodePackageManager = 'yarn';
  }

  writing(): void {
    this.fs.copy(this.templatePath('.yarnrc'), this.destinationPath('.yarnrc'));
    this.fs.extendJSON(this.destinationPath('package.json'), {
      engines: {
        npm: 'use-yarn-please',
      },
    });
  }

  end(): void {
    this.log(['', `✨  初始化完毕, 请通过 \`${chalk.red('yarn init')}\` 补充项目信息`, ''].join('\n'));
  }
}
