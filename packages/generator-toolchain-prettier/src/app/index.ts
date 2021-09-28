import Generator from 'yeoman-generator';
import ora from 'ora';
import chalk from 'chalk';

export default class extends Generator {
  async writing(): Promise<void> {
    this.fs.copy(this.templatePath('.'), this.destinationPath('.'), { globOptions: { dot: true } });

    const devDependencies = ['prettier'];
    ora.promise(this.addDevDependencies(devDependencies), {
      text: `Resolving package devDependencies ${chalk.red(devDependencies.join(', '))}`,
    });
  }
}
