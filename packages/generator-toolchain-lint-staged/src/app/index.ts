import Generator from 'yeoman-generator';
import { IGeneratorOptions } from '@wyntau/generator-shared';

export default class extends Generator<IGeneratorOptions> {
  async writing(): Promise<void> {
    this.fs.copy(this.templatePath('.'), this.destinationPath('.'), {
      globOptions: { dot: true },
    });
    await this.addDevDependencies(['lint-staged']);
  }
}
