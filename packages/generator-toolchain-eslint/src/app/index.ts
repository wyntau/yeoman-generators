import Generator from 'yeoman-generator';

export interface IOptions {
  toolchainTypescript: boolean;
  toolchainPrettier: boolean;

  targetReact: boolean;
  targetReactWithHooks: boolean;

  targetVue: boolean;

  withMonorepo: boolean;
}

export interface IProps {
  options?: IOptions;
  [x: string]: any;
}

export default class extends Generator<IOptions> {
  props: IProps = {};

  initializing(): void {
    this.option('toolchain-typescript', { type: Boolean, description: '启用 typescript 支持', default: true });
    this.option('toolchain-prettier', { type: Boolean, description: '启用 prettier 支持', default: true });
    this.option('with-monorepo', { type: Boolean, description: '启用 monorepo 支持', default: false });
  }

  async prompting(): Promise<void> {
    this.props = await this.prompt<IProps>([
      {
        type: 'confirm',
        name: 'options.toolchainTypescript',
        message: '启用 typescript 支持',
        default: this.options.toolchainTypescript ?? true,
        when: this.options.toolchainTypescript === undefined || this.options.toolchainTypescript === null,
      },
      {
        type: 'confirm',
        name: 'options.toolchainPrettier',
        message: '启用 prettier 支持',
        default: this.options.toolchainPrettier ?? true,
        when: this.options.toolchainPrettier === undefined || this.options.toolchainPrettier === null,
      },
      {
        type: 'confirm',
        name: 'options.targetReact',
        message: '启用 react 支持',
        default: this.options.targetReact ?? false,
        when: this.options.targetReact === undefined || this.options.targetReact === null,
      },
      {
        type: 'confirm',
        name: 'options.targetReactWithHooks',
        message: '启用 react hooks 支持',
        default: this.options.targetReactWithHooks ?? false,
        when: (answers) =>
          (this.options.targetReactWithHooks === undefined || this.options.targetReactWithHooks === null) &&
          answers.options?.targetReact === true,
      },
      {
        type: 'confirm',
        name: 'options.targetVue',
        message: '启用 vue 支持',
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

  writing(): void {
    this.addDevDependencies(['eslint']);
    this.fs.copy(this.templatePath('.'), this.destinationPath('.'), { globOptions: { dot: true } });

    if (!this.options.toolchainTypescript && !this.options.withMonorepo && !this.options.toolchainPrettier) {
      return;
    }

    const eslintJson: any = this.fs.readJSON(this.destinationPath('.eslintrc.json'));

    if (this.options.toolchainTypescript) {
      this.addDevDependencies(['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser', 'typescript']);

      this.fs.append(this.destinationPath('.eslintignore'), '*.js\n*.d.ts\n');

      eslintJson.parser = '@typescript-eslint/parser';
      eslintJson.parserOptions.project.push('./tsconfig.json');
      eslintJson.extends.push('plugin:@typescript-eslint/recommended');
    }

    if (this.options.targetReact) {
      this.addDevDependencies(['eslint-plugin-react']);
      eslintJson.extends.push('plugin:react/recommended');
    }

    if (this.options.targetReactWithHooks) {
      this.addDevDependencies(['eslint-plugin-react-hooks']);
      eslintJson.extends.push('plugin:react-hooks/recommended');
    }

    if (this.options.targetVue) {
      this.addDevDependencies(['eslint-plugin-vue', 'vue-eslint-parser']);
      eslintJson.extends.push('plugin:vue/recommended');

      if (this.options.toolchainTypescript) {
        eslintJson.parserOptions.parser = eslintJson.parser;
      }

      eslintJson.parser = 'vue-eslint-parser';
    }

    if (this.options.toolchainPrettier) {
      this.addDevDependencies(['eslint-config-prettier', 'eslint-plugin-prettier', 'prettier']);
      eslintJson.extends.push('plugin:prettier/recommended');
    }

    if (this.options.withMonorepo && this.options.toolchainTypescript) {
      eslintJson.parserOptions.project.push('./packages/**/tsconfig.json');
    }

    this.fs.writeJSON(this.destinationPath('.eslintrc.json'), eslintJson);
  }
}
