import Generator from 'yeoman-generator';
import chalk from 'chalk';
import { IGeneratorOptions } from '@wyntau/generator-shared';
import ora from 'ora';

export default class extends Generator<IGeneratorOptions> {
  async writing(): Promise<void> {
    const devDependencies = ['typescript'];
    ora.promise(this.addDevDependencies(devDependencies), {
      text: `Resolving package devDependencies ${chalk.red(devDependencies.join(', '))}`,
    });

    const dependencies = ['typescript'];
    ora.promise(this.addDependencies(dependencies), {
      text: `Resolving package dependencies ${chalk.red(dependencies.join(', '))}`,
    });
  }

  end(): void {
    this.log(`✨  请通过 \`${chalk.red('npx tsc --init')}\` 初始化 tsconfig.json`);
  }
}
