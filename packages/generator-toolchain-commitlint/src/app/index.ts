import Generator from 'yeoman-generator';
import { IGeneratorOptions } from '@wyntau/generator-shared';
import ora from 'ora';
import chalk from 'chalk';

export default class extends Generator<IGeneratorOptions> {
  async writing(): Promise<void> {
    this.fs.copy(this.templatePath('.'), this.destinationPath('.'), {
      globOptions: { dot: true },
    });

    const devDependencies = ['@commitlint/cli', '@commitlint/config-conventional'];

    ora.promise(this.addDevDependencies(devDependencies), {
      text: `Resolving package devDependencies ${chalk.red(devDependencies.join(', '))}`,
    });
  }
}
