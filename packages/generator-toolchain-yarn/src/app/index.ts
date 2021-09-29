import Generator from 'yeoman-generator';
import { IGeneratorOptions, GeneratorOptions } from '@wyntau/generator-shared';

export type IGeneratorToolchainYarnOptions = Pick<IGeneratorOptions, 'toolchainLerna'>;

export default class GeneratorToolchainYarn extends Generator<IGeneratorToolchainYarnOptions> {
  initializing(): void {
    this.env.options.nodePackageManager = 'yarn';

    this.option(GeneratorOptions.toolchainLerna.optionKey, {
      type: Boolean,
      description: GeneratorOptions.toolchainLerna.message,
    });
  }

  async prompting(): Promise<void> {
    const options = await this.prompt<IGeneratorToolchainYarnOptions>([
      {
        type: 'confirm',
        name: GeneratorOptions.toolchainLerna.promptKey,
        message: GeneratorOptions.toolchainLerna.message,
        default: this.options.toolchainLerna ?? true,
        when: this.options.toolchainLerna === undefined || this.options.toolchainLerna === null,
      },
    ]);

    this.options = Object.assign(this.options, options);
  }

  writing(): void {
    this.fs.copy(this.templatePath('.yarnrc'), this.destinationPath('.yarnrc'));
    this.fs.append(this.destinationPath('.npmrc'), '\nengine-strict = true\n');
    this.fs.extendJSON(this.destinationPath('package.json'), {
      engines: {
        npm: 'use-yarn-please',
      },
    });

    if (this.options.toolchainLerna) {
      this.fs.extendJSON(this.destinationPath('package.json'), { private: true, workspaces: ['packages/*'] });
    }
  }
}
