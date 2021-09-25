import Generator from 'yeoman-generator';

export default class extends Generator {
  async writing(): Promise<void> {
    this.fs.copy(this.templatePath('.'), this.destinationPath('.'), { globOptions: { dot: true } });
    await this.addDevDependencies(['prettier']);
  }
}
