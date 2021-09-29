import Generator from 'yeoman-generator';
import { IGeneratorOptions } from '@wyntau/generator-shared';
import { IGeneratorToolchainEslintOptions } from '@wyntau/generator-toolchain-eslint';
import chalk from 'chalk';

export default class extends Generator<IGeneratorOptions> {
  default(): void {
    this.composeWith(require.resolve('@wyntau/generator-shared/generators/app'), { toolchainYarn: true });
    this.composeWith(require.resolve('@wyntau/generator-toolchain-npm/generators/app'));
    this.composeWith(require.resolve('@wyntau/generator-toolchain-nvm/generators/app'));
    this.composeWith(require.resolve('@wyntau/generator-toolchain-yarn/generators/app'));

    this.composeWith(require.resolve('@wyntau/generator-toolchain-typescript/generators/app'));

    this.composeWith(require.resolve('@wyntau/generator-toolchain-prettier/generators/app'));
    this.composeWith(require.resolve('@wyntau/generator-toolchain-eslint/generators/app'), {
      toolchainTypescript: true,
      toolchainPrettier: true,
      targetReact: false,
      targetVue: false,
    } as IGeneratorToolchainEslintOptions);

    this.composeWith(require.resolve('@wyntau/generator-toolchain-husky/generators/app'));
    this.composeWith(require.resolve('@wyntau/generator-toolchain-commitlint/generators/app'));
    this.composeWith(require.resolve('@wyntau/generator-toolchain-lint-staged/generators/app'));

    this.composeWith(require.resolve('@wyntau/generator-toolchain-patch-package/generators/app'));
  }

  end(): void {
    this.log(`✨  请通过 \`${chalk.red('npx tsc --init')}\` 初始化 tsconfig.json`);
  }
}
