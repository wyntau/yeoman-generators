import Generator from 'yeoman-generator';
import ora from 'ora';
import chalk from 'chalk';

export default class extends Generator {
  async writing(): Promise<void> {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      scripts: { postinstall: 'patch-package', 'patch-package': "patch-package --exclude 'the-file-not-exist'" },
    });

    const devDependencies = ['patch-package', 'postinstall-postinstall'];
    const spinner = ora(`Resolving devDependencies ${chalk.red(devDependencies.join(', '))}`).start();
    await this.addDevDependencies(devDependencies);
    spinner.succeed();
  }
}
