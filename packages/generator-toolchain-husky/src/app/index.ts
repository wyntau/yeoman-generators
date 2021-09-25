import Generator from 'yeoman-generator';

export default class extends Generator {
  async writing(): Promise<void> {
    this.fs.extendJSON(this.destinationPath('package.json'), { scripts: { prepare: 'husky install || exit 0' } });
    await this.addDevDependencies(['husky']);
  }
}
