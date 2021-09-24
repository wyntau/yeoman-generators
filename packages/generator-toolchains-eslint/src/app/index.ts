import Generator from 'yeoman-generator';

export interface IOptions {
  withTypescript: boolean;
  withMonorepo: boolean;
  withPrettier: boolean;
}

export interface IProps {
  options?: IOptions;
  [x: string]: any;
}

export default class extends Generator<IOptions> {
  props: IProps = {};

  initializing(): void {
    this.option('with-typescript', { type: Boolean, description: '启用 typescript 支持', default: true });
    this.option('with-prettier', { type: Boolean, description: '启用 prettier 支持', default: true });
    this.option('with-monorepo', { type: Boolean, description: '启用 monorepo 支持', default: false });
  }

  async prompting(): Promise<void> {
    this.props = await this.prompt<IProps>([
      {
        type: 'confirm',
        name: 'options.withTypescript',
        message: '启用 typescript 支持',
        default: true,
        when: this.options.withTypescript === undefined,
      },
      {
        type: 'confirm',
        name: 'options.withPrettier',
        message: '启用 prettier 支持',
        default: true,
        when: this.options.withPrettier === undefined,
      },
      {
        type: 'confirm',
        name: 'options.withMonorepo',
        message: '启用 monorepo 支持',
        default: false,
        when: this.options.withMonorepo === undefined,
      },
    ]);

    this.options = Object.assign(this.options, this.props.options);
  }

  writing(): void {
    this.fs.copy(this.templatePath('.'), this.destinationPath(''), { globOptions: { dot: true } });

    if (!this.options.withTypescript && !this.options.withMonorepo && !this.options.withPrettier) {
      return;
    }

    const eslintJson: any = this.fs.readJSON(this.destinationPath('.eslintrc.json'));

    if (this.options.withTypescript) {
      this.fs.append(this.destinationPath('.eslintignore'), '*.js\n*.d.ts\n');

      if (eslintJson.parserOptions.project.indexOf('./tsconfig.json') < 0) {
        eslintJson.parserOptions.project.push('./tsconfig.json');
      }
      if (eslintJson.extends.indexOf('plugin:@typescript-eslint/recommended') < 0) {
        eslintJson.extends.push('plugin:@typescript-eslint/recommended');
      }
    }

    if (this.options.withPrettier) {
      if (eslintJson.extends.indexOf('plugin:prettier/recommended') < 0) {
        eslintJson.extends.push('plugin:prettier/recommended');
      }
    }

    if (this.options.withMonorepo && this.options.withTypescript) {
      if (eslintJson.parserOptions.project.indexOf('./packages/**/tsconfig.json') < 0) {
        eslintJson.parserOptions.project.push('./packages/**/tsconfig.json');
      }
    }

    this.fs.writeJSON(this.destinationPath('.eslintrc.json'), eslintJson);
  }
}
