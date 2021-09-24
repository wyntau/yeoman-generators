import Generator from 'yeoman-generator';

export default class extends Generator {
  props: Record<string, any> = {};

  async prompting(): Promise<void> {
    this.props = await this.prompt([
      {
        type: 'confirm',
        name: 'toolchain.npm.enable',
        message: '添加 npm 配置文件',
        default: true,
      },
    ]);
  }

  writing(): void {
    this.fs.copy(this.templatePath('.npmrc'), this.destinationPath('.npmrc'));
  }
}
