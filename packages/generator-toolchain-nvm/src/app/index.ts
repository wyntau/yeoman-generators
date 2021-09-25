import Generator from 'yeoman-generator';

export default class extends Generator {
  writing(): void {
    this.fs.copy(this.templatePath('.nvmrc'), this.destinationPath('.nvmrc'));
  }
}
