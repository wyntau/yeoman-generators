import Generator from 'yeoman-generator';
import ora from 'ora';
import chalk from 'chalk';
import { IGeneratorOptions, GeneratorOptions } from '@wyntau/generator-shared';

export type IGeneratorToolchainLernaOptions = Pick<IGeneratorOptions, 'toolchainYarn'>;

export default class GeneratorToolchainLerna extends Generator<IGeneratorToolchainLernaOptions> {
  initializing(): void {
    this.option(GeneratorOptions.toolchainYarn.optionKey, {
      type: Boolean,
      description: GeneratorOptions.toolchainYarn.message,
    });
  }

  async prompting(): Promise<void> {
    const options = await this.prompt([
      {
        type: 'confirm',
        name: GeneratorOptions.toolchainYarn.promptKey,
        message: GeneratorOptions.toolchainYarn.message,
        default: this.options.toolchainYarn,
        when: this.options.toolchainYarn === null || this.options.toolchainYarn === undefined,
      },
    ]);
    this.options = Object.assign({}, this.options, options);
  }

  async writing(): Promise<void> {
    const contextData = { npmClient: this.options.toolchainYarn ? 'yarn' : 'npm' };

    this.fs.copyTpl(this.templatePath('.'), this.destinationPath('.'), contextData, undefined, {
      globOptions: { dot: true },
    });

    const devDependencies = ['lerna'];
    const spinner = ora(`Resolving devDependencies ${chalk.red(devDependencies.join(', '))}`).start();
    await this.addDevDependencies(devDependencies);
    spinner.succeed();
  }
}
