import Generator from 'yeoman-generator';
import ora from 'ora';
import chalk from 'chalk';

export default class extends Generator {
  async writing(): Promise<void> {
    this.fs.extendJSON(this.destinationPath('package.json'), { scripts: { prepare: 'husky install || exit 0' } });

    const devDependencies = ['husky'];

    const spinner = ora(`Resolving package devDependencies ${chalk.red(devDependencies.join(', '))}`).start();
    await this.addDevDependencies(devDependencies);
    spinner.succeed();
  }
}
