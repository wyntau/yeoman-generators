import Generator from 'yeoman-generator';

export default class extends Generator {
  props: Record<string, any> = {};

  async prompting(): Promise<void> {
    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true,
      },
    ];

    this.props = await this.prompt(prompts);
  }

  writing(): void {
    this.fs.copy(this.templatePath('.nvmrc'), this.destinationPath('.nvmrc'));
  }
}
