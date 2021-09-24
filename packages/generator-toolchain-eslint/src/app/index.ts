import Generator from 'yeoman-generator';

export interface IOptions {
  toolchainTypescript: boolean;
  toolchainPrettier: boolean;
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

      eslintJson.parserOptions.project.push('./tsconfig.json');
      eslintJson.extends.push('plugin:@typescript-eslint/recommended');
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
