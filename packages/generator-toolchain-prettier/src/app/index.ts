import Generator from 'yeoman-generator';
import ora from 'ora';
import chalk from 'chalk';

export default class extends Generator {
  async writing(): Promise<void> {
    this.fs.copy(this.templatePath('.'), this.destinationPath('.'), { globOptions: { dot: true } });

    const devDependencies = ['prettier'];
    const spinner = ora(`Resolving devDependencies ${chalk.red(devDependencies.join(', '))}`).start();
    await this.addDevDependencies(devDependencies);
    spinner.succeed();
  }
}
