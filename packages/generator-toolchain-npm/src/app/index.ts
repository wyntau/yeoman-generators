import Generator from 'yeoman-generator';
import chalk from 'chalk';
import { IGeneratorOptions } from '@wyntau/generator-shared';

export type IGeneratorToolchainNpmOptions = Pick<IGeneratorOptions, 'toolchainNpm'>;

export default class GeneratorToolchainNpm extends Generator<IGeneratorToolchainNpmOptions> {
  end(): void {
    if (!this.options.toolchainNpm) {
      return;
    }
    this.log(['', `✨  请通过 \`${chalk.red('npm init')}\` 补充项目信息`, ''].join('\n'));
  }
}
