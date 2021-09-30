import Generator from 'yeoman-generator';
import { IGeneratorOptions, GeneratorOptions } from '@wyntau/generator-shared';
import { IGeneratorToolchainEslintOptions } from '@wyntau/generator-toolchain-eslint';
import { IGeneratorToolchainLernaOptions } from '@wyntau/generator-toolchain-lerna';
import chalk from 'chalk';

export type IGeneratorStarterTypescriptOptions = Pick<
  IGeneratorOptions,
  'toolchainYarn' | 'toolchainLerna' | 'targetReact' | 'targetReactWithJsxRuntime' | 'targetVue'
>;

export default class GeneratorStarterTypescript extends Generator<IGeneratorStarterTypescriptOptions> {
  constructor(args: string | string[], options: IGeneratorStarterTypescriptOptions) {
    super(args, options);
    this.option(GeneratorOptions.toolchainYarn.optionKey, {
      type: Boolean,
      description: GeneratorOptions.toolchainYarn.message,
      default: true,
    });
    this.option(GeneratorOptions.toolchainLerna.optionKey, {
      type: Boolean,
      description: GeneratorOptions.toolchainLerna.message,
      default: false,
    });
    this.option(GeneratorOptions.targetReact.optionKey, {
      type: Boolean,
      description: GeneratorOptions.targetReact.message,
      default: false,
    });
    this.option(GeneratorOptions.targetReactWithJsxRuntime.optionKey, {
      type: Boolean,
      description: GeneratorOptions.targetReactWithJsxRuntime.message,
      default: false,
    });
    this.option(GeneratorOptions.targetVue.optionKey, {
      type: Boolean,
      description: GeneratorOptions.targetVue.message,
      default: false,
    });
  }

  default(): void {
    //#region shared
    this.composeWith(require.resolve('@wyntau/generator-shared/generators/app'), {
      toolchainYarn: this.options.toolchainYarn,
    } as IGeneratorOptions);
    //#endregion

    //#region npm related
    this.composeWith(require.resolve('@wyntau/generator-toolchain-npm/generators/app'));
    this.composeWith(require.resolve('@wyntau/generator-toolchain-nvm/generators/app'));
    if (this.options.toolchainYarn) {
      this.composeWith(require.resolve('@wyntau/generator-toolchain-yarn/generators/app'));
    }
    if (this.options.toolchainLerna) {
      this.composeWith(require.resolve('@wyntau/generator-toolchain-lerna/generators/app'), {
        toolchainYarn: this.options.toolchainYarn,
      } as IGeneratorToolchainLernaOptions);
    }
    //#endregion

    //#region typescript
    this.composeWith(require.resolve('@wyntau/generator-toolchain-typescript/generators/app'));
    //#endregion

    //#region code quality
    this.composeWith(require.resolve('@wyntau/generator-toolchain-prettier/generators/app'));
    this.composeWith(require.resolve('@wyntau/generator-toolchain-eslint/generators/app'), {
      toolchainTypescript: true,
      toolchainPrettier: true,
      toolchainLerna: this.options.toolchainLerna,
      targetReact: this.options.targetReact,
      targetReactWithJsxRuntime: this.options.targetReactWithJsxRuntime,
      targetVue: this.options.targetVue,
    } as IGeneratorToolchainEslintOptions);
    this.composeWith(require.resolve('@wyntau/generator-toolchain-husky/generators/app'));
    this.composeWith(require.resolve('@wyntau/generator-toolchain-commitlint/generators/app'));
    this.composeWith(require.resolve('@wyntau/generator-toolchain-lint-staged/generators/app'));
    //#endregion

    //#region patches
    this.composeWith(require.resolve('@wyntau/generator-toolchain-patch-package/generators/app'));
    //#endregion
  }

  end(): void {
    this.log(`✨  请通过 \`${chalk.red('npx tsc --init')}\` 初始化 tsconfig.json`);
  }
}
