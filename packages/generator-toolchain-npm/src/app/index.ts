import Generator from 'yeoman-generator';

export default class extends Generator {
  writing(): void {
    this.fs.copy(this.templatePath('.npmrc'), this.destinationPath('.npmrc'));
  }
}
