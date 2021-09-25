import Generator from 'yeoman-generator';

export default class extends Generator {
  initializing(): void {
    this.env.options.nodePackageManager = 'yarn';
  }

  writing(): void {
    this.fs.copy(this.templatePath('.yarnrc'), this.destinationPath('.yarnrc'));
  }
}
