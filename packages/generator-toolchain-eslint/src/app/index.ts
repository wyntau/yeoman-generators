import Generator from 'yeoman-generator';
import { IGeneratorOptions, GeneratorOptions } from '@wyntau/generator-shared';
import ora from 'ora';
import chalk from 'chalk';

export interface IGeneratorToolchainEslintOptions
  extends Pick<IGeneratorOptions, 'toolchainTypescript' | 'toolchainPrettier' | 'targetReact' | 'targetVue'> {
  withMonorepo: boolean;
}

export interface IProps {
  options?: IGeneratorToolchainEslintOptions;
  [x: string]: any;
}

export default class GeneratorToolchainEslint extends Generator<IGeneratorToolchainEslintOptions> {
  props: IProps = {};

  constructor(args: string | string[], options: IGeneratorToolchainEslintOptions) {
    super(args, options);
    this.option(GeneratorOptions.toolchainTypescript.optionKey, {
      type: Boolean,
      description: GeneratorOptions.toolchainTypescript.message,
      default: true,
    });
    this.option(GeneratorOptions.toolchainPrettier.optionKey, {
      type: Boolean,
      description: GeneratorOptions.toolchainPrettier.message,
      default: true,
    });
    this.option('with-monorepo', { type: Boolean, description: '启用 monorepo 支持', default: false });
  }

  async prompting(): Promise<void> {
    this.props = await this.prompt<IProps>([
      {
        type: 'confirm',
        name: GeneratorOptions.toolchainTypescript.promptKey,
        message: GeneratorOptions.toolchainTypescript.message,
        default: this.options.toolchainTypescript ?? true,
        when: this.options.toolchainTypescript === undefined || this.options.toolchainTypescript === null,
      },
      {
        type: 'confirm',
        name: GeneratorOptions.toolchainPrettier.promptKey,
        message: GeneratorOptions.toolchainPrettier.message,
        default: this.options.toolchainPrettier ?? true,
        when: this.options.toolchainPrettier === undefined || this.options.toolchainPrettier === null,
      },
      {
        type: 'confirm',
        name: GeneratorOptions.targetReact.promptKey,
        message: GeneratorOptions.targetReact.message,
        default: this.options.targetReact ?? false,
        when: this.options.targetReact === undefined || this.options.targetReact === null,
      },
      {
        type: 'confirm',
        name: GeneratorOptions.targetVue.promptKey,
        message: GeneratorOptions.targetVue.message,
        default: this.options.targetVue ?? false,
        when: (answers) =>
          (this.options.targetVue === undefined || this.options.targetVue === null) &&
          answers.options?.targetReact !== true,
      },
      {
        type: 'confirm',
        name: 'options.withMonorepo',
        message: '启用 monorepo 支持',
        default: this.options.withMonorepo ?? false,
        when: this.options.withMonorepo === undefined || this.options.withMonorepo === null,
      },
    ]);

    this.options = Object.assign(this.options, this.props.options);
  }

  async writing(): Promise<void> {
    const devDependencies: Array<string> = [];

    devDependencies.push('eslint');
    this.fs.copy(this.templatePath('.'), this.destinationPath('.'), { globOptions: { dot: true } });
    this.fs.extendJSON(this.destinationPath('package.json'), {
      scripts: { eslint: 'DEBUG=eslint:cli-engine eslint .', 'eslint-fix': 'DEBUG=eslint:cli-engine eslint --fix .' },
    });

    if (!this.options.toolchainTypescript && !this.options.withMonorepo && !this.options.toolchainPrettier) {
      return;
    }

    const eslintJson: any = this.fs.readJSON(this.destinationPath('.eslintrc.json'));

    if (this.options.toolchainTypescript) {
      devDependencies.push('@typescript-eslint/eslint-plugin', '@typescript-eslint/parser', 'typescript');

      this.fs.append(this.destinationPath('.eslintignore'), '*.js\n*.d.ts\n');

      eslintJson.parser = '@typescript-eslint/parser';
      eslintJson.parserOptions.project.push('./tsconfig.json');
      eslintJson.extends.push('plugin:@typescript-eslint/recommended');
    }

    if (this.options.targetReact) {
      devDependencies.push('eslint-plugin-react', 'eslint-plugin-react-hooks');
      eslintJson.extends.push('plugin:react/recommended', 'plugin:react-hooks/recommended');
    }

    if (this.options.targetVue) {
      devDependencies.push('eslint-plugin-vue', 'vue-eslint-parser');
      eslintJson.extends.push('plugin:vue/recommended');

      if (this.options.toolchainTypescript) {
        eslintJson.parserOptions.parser = eslintJson.parser;
      }

      eslintJson.parser = 'vue-eslint-parser';
    }

    if (this.options.toolchainPrettier) {
      devDependencies.push('eslint-config-prettier', 'eslint-plugin-prettier', 'prettier');
      eslintJson.extends.push('plugin:prettier/recommended');
    }

    if (this.options.withMonorepo && this.options.toolchainTypescript) {
      eslintJson.parserOptions.project.push('./packages/**/tsconfig.json');
    }

    this.fs.writeJSON(this.destinationPath('.eslintrc.json'), eslintJson);

    const spinner = ora(`Resolving devDependencies ${chalk.red(devDependencies.join(', '))}`).start();
    await this.addDevDependencies(devDependencies);
    spinner.succeed();
  }
}
