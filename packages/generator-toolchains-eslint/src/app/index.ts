import Generator from 'yeoman-generator';

export interface IOptions {
  toolchainsTypescript: boolean;
  toolchainsMonorepo: boolean;
  toolchainsPrettier: boolean;
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
    this.option('toolchains-monorepo', { type: Boolean, description: '启用 monorepo 支持', default: false });
  }

  async prompting(): Promise<void> {
    this.props = await this.prompt<IProps>([
      {
        type: 'confirm',
        name: 'options.toolchainsTypescript',
        message: '启用 typescript 支持',
        default: true,
        when: this.options.toolchainsTypescript === undefined,
      },
      {
        type: 'confirm',
        name: 'options.toolchainsPrettier',
        message: '启用 prettier 支持',
        default: true,
        when: this.options.toolchainsPrettier === undefined,
      },
      {
        type: 'confirm',
        name: 'options.toolchainsMonorepo',
        message: '启用 monorepo 支持',
        default: false,
        when: this.options.toolchainsMonorepo === undefined,
      },
    ]);

    this.options = Object.assign(this.options, this.props.options);
  }

  writing(): void {
    this.fs.copy(this.templatePath('.'), this.destinationPath(''), { globOptions: { dot: true } });

    if (!this.options.toolchainsTypescript && !this.options.toolchainsMonorepo && !this.options.toolchainsPrettier) {
      return;
    }

    const eslintJson: any = this.fs.readJSON(this.destinationPath('.eslintrc.json'));

    if (this.options.toolchainsTypescript) {
      this.fs.append(this.destinationPath('.eslintignore'), '*.js\n*.d.ts\n');

      if (eslintJson.parserOptions.project.indexOf('./tsconfig.json') < 0) {
        eslintJson.parserOptions.project.push('./tsconfig.json');
      }
      if (eslintJson.extends.indexOf('plugin:@typescript-eslint/recommended') < 0) {
        eslintJson.extends.push('plugin:@typescript-eslint/recommended');
      }
    }

    if (this.options.toolchainsPrettier) {
      if (eslintJson.extends.indexOf('plugin:prettier/recommended') < 0) {
        eslintJson.extends.push('plugin:prettier/recommended');
      }
    }

    if (this.options.toolchainsMonorepo && this.options.toolchainsTypescript) {
      if (eslintJson.parserOptions.project.indexOf('./packages/**/tsconfig.json') < 0) {
        eslintJson.parserOptions.project.push('./packages/**/tsconfig.json');
      }
    }

    this.fs.writeJSON(this.destinationPath('.eslintrc.json'), eslintJson);
  }
}
