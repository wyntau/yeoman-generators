import Generator from 'yeoman-generator';

export default class GeneratorToolchainNpm extends Generator {
  writing(): void {
    this.fs.copy(this.templatePath('.'), this.destinationPath('.'), { globOptions: { dot: true } });
  }
}
