import Generator from 'yeoman-generator';
import chalk from 'chalk';
import { IGeneratorOptions } from '@wyntau/generator-shared';
import ora from 'ora';

export default class extends Generator<IGeneratorOptions> {
  async writing(): Promise<void> {
    const devDependencies = ['typescript'];
    const dependencies = ['tslib'];

    const spinner = ora(
      `Resolving package devDependencies ${chalk.red(devDependencies.join(', '))}, dependencies ${chalk.red(
        dependencies.join(', ')
      )}`
    ).start();
    await this.addDevDependencies(devDependencies);
    await this.addDependencies(dependencies);
    spinner.succeed();
  }

  end(): void {
    this.log(`✨  请通过 \`${chalk.red('npx tsc --init')}\` 初始化 tsconfig.json`);
  }
}
