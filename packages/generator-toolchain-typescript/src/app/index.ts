import Generator from 'yeoman-generator';
import chalk from 'chalk';
import { IGeneratorOptions } from '@wyntau/generator-shared';

export default class extends Generator<IGeneratorOptions> {
  async writing(): Promise<void> {
    await this.addDevDependencies(['typescript']);
    await this.addDependencies(['tslib']);
  }

  end(): void {
    this.log(`✨  请通过 \`${chalk.red('npx tsc --init')}\` 初始化 tsconfig.json`);
  }
}
