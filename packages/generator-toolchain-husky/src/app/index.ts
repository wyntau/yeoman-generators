import Generator from 'yeoman-generator';
import ora from 'ora';
import chalk from 'chalk';

export default class extends Generator {
  async writing(): Promise<void> {
    this.fs.extendJSON(this.destinationPath('package.json'), { scripts: { prepare: 'husky install || exit 0' } });

    const devDependencies = ['husky'];
    ora.promise(this.addDevDependencies(devDependencies), {
      text: `Resolving package devDependencies ${chalk.red(devDependencies.join(', '))}`,
    });
  }
}
