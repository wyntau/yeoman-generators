import Generator from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';

module.exports = class extends Generator {
  props: Record<string, any> = {};

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the kryptonian ${chalk.red('@wyntau/generator-typescript')} generator!`));

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true,
      },
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(this.templatePath('dummyfile.txt'), this.destinationPath('dummyfile.txt'));
  }

  install() {
    this.installDependencies();
  }
};
