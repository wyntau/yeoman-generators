import Generator from 'yeoman-generator';

export interface IOptions {
  toolchainsTypescript: boolean;
  toolchainsPrettier: boolean;
  withMonorepo: boolean;
}

export interface IProps {
  options?: IOptions;
  [x: string]: any;
}

export default class extends Generator<IOptions> {
  props: IProps = {};

  initializing(): void {
    this.option('toolchains-typescript', { type: Boolean, description: '启用 typescript 支持', default: true });
    this.option('toolchains-prettier', { type: Boolean, description: '启用 prettier 支持', default: true });
    this.option('with-monorepo', { type: Boolean, description: '启用 monorepo 支持', default: false });
  }

  async prompting(): Promise<void> {
    this.props = await this.prompt<IProps>([
      {
        type: 'confirm',
        name: 'options.toolchainsTypescript',
        message: '启用 typescript 支持',
        default: this.options.toolchainsTypescript ?? true,
        when: this.options.toolchainsTypescript === undefined || this.options.toolchainsTypescript === null,
      },
      {
        type: 'confirm',
        name: 'options.toolchainsPrettier',
        message: '启用 prettier 支持',
        default: this.options.toolchainsPrettier ?? true,
        when: this.options.toolchainsPrettier === undefined || this.options.toolchainsPrettier === null,
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

    if (!this.options.toolchainsTypescript && !this.options.withMonorepo && !this.options.toolchainsPrettier) {
      return;
    }

    const eslintJson: any = this.fs.readJSON(this.destinationPath('.eslintrc.json'));

    if (this.options.toolchainsTypescript) {
      this.addDevDependencies(['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser', 'typescript']);

      this.fs.append(this.destinationPath('.eslintignore'), '*.js\n*.d.ts\n');

      eslintJson.parserOptions.project.push('./tsconfig.json');
      eslintJson.extends.push('plugin:@typescript-eslint/recommended');
    }

    if (this.options.toolchainsPrettier) {
      this.addDevDependencies(['eslint-config-prettier', 'eslint-plugin-prettier', 'prettier']);
      eslintJson.extends.push('plugin:prettier/recommended');
    }

    if (this.options.withMonorepo && this.options.toolchainsTypescript) {
      eslintJson.parserOptions.project.push('./packages/**/tsconfig.json');
    }

    this.fs.writeJSON(this.destinationPath('.eslintrc.json'), eslintJson);
  }
}
