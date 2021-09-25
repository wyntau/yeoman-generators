import Generator from 'yeoman-generator';

export default class extends Generator {
  async writing(): Promise<void> {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      scripts: { postinstall: 'patch-package', 'patch-package': "patch-package --exclude 'the-file-not-exist'" },
    });
    await this.addDevDependencies(['patch-package', 'postinstall-postinstall']);
  }
}
