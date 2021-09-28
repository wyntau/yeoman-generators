import Generator from 'yeoman-generator';
import chalk from 'chalk';
import { IGeneratorOptions } from '@wyntau/generator-shared';

export type IGeneratorToolchainNpmOptions = Pick<IGeneratorOptions, 'toolchainNpm'>;

export default class GeneratorToolchainNpm extends Generator<IGeneratorToolchainNpmOptions> {
  writing(): void {
    this.fs.copy(this.templatePath('.'), this.destinationPath('.'), { globOptions: { dot: true } });
  }
}
