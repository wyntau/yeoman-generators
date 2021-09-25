export interface IGeneratorOptions {
  /** 启用 npm */
  toolchainNpm: boolean;
  /** 启用 yarn */
  toolchainYarn: boolean;
  /** 启用 nvm, 添加 nvm 配置文件 */
  toolchainNvm: boolean;

  /** 启用 typescript, 添加 typescript 工具链 */
  toolchainTypescript: boolean;

  /** 启用 eslint */
  toolchainEslint: boolean;
  /** 启用 prettier */
  toolchainPrettier: boolean;

  /** 启用 husky */
  toolchainHusky: boolean;
  /** 启用 commitlint */
  toolchainCommitlint: boolean;
  /** 启用 lint-taged */
  toolchainLintStaged: boolean;

  /** 启用 jest */
  toolchainJest: boolean;

  /** 启用 patch-package */
  toolchainPatchPackage: boolean;

  /** 启用 travis */
  toolchainTravis: boolean;

  /** 目标 react 技术栈 */
  targetReact: boolean;
  /** 目标 vue 技术栈 */
  targetVue: boolean;
  /** 目标 miniprogram 微信小程序技术栈 */
  targetMp: boolean;
  /** 目标 mmp 美团小程序技术栈 */
  targetMmp: boolean;
}

export type OptionKeyOf<T> = T extends `toolchain${infer S}`
  ? `toolchain-${Uncapitalize<S>}`
  : T extends `target${infer S}`
  ? `target-${Uncapitalize<S>}`
  : never;
export type PromptKeyOf<T extends string> = `options.${T}`;
export type GeneratorOptionsType<T extends string> = {
  [P in T]: {
    optionKey: OptionKeyOf<P>;
    promptKey: PromptKeyOf<P>;
    message: string;
  };
};

export const GeneratorOptions: GeneratorOptionsType<keyof IGeneratorOptions> = {
  toolchainNpm: { optionKey: 'toolchain-npm', promptKey: 'options.toolchainNpm', message: '启用 npm' },
  toolchainYarn: { optionKey: 'toolchain-yarn', promptKey: 'options.toolchainYarn', message: '启用 yarn' },
  toolchainNvm: { optionKey: 'toolchain-nvm', promptKey: 'options.toolchainNvm', message: '启用 nvm' },
  toolchainTypescript: {
    optionKey: 'toolchain-typescript',
    promptKey: 'options.toolchainTypescript',
    message: '启用 typescript, 添加 typescript 工具链',
  },
  toolchainEslint: {
    optionKey: 'toolchain-eslint',
    promptKey: 'options.toolchainEslint',
    message: '启用 eslint',
  },
  toolchainPrettier: {
    optionKey: 'toolchain-prettier',
    promptKey: 'options.toolchainPrettier',
    message: '启用 prettier',
  },
  toolchainHusky: { optionKey: 'toolchain-husky', promptKey: 'options.toolchainHusky', message: '启用 husky' },
  toolchainLintStaged: {
    optionKey: 'toolchain-lintStaged',
    promptKey: 'options.toolchainLintStaged',
    message: '启用 lint-staged',
  },
  toolchainCommitlint: {
    optionKey: 'toolchain-commitlint',
    promptKey: 'options.toolchainCommitlint',
    message: '启用 commitlint',
  },
  toolchainPatchPackage: {
    optionKey: 'toolchain-patchPackage',
    promptKey: 'options.toolchainPatchPackage',
    message: '启用 patch-package',
  },
  toolchainJest: { optionKey: 'toolchain-jest', promptKey: 'options.toolchainJest', message: '启用 jest' },
  toolchainTravis: { optionKey: 'toolchain-travis', promptKey: 'options.toolchainTravis', message: '启用 travis' },

  targetReact: { optionKey: 'target-react', promptKey: 'options.targetReact', message: '目标 react' },
  targetVue: { optionKey: 'target-vue', promptKey: 'options.targetVue', message: '目标 vue' },
  targetMp: { optionKey: 'target-mp', promptKey: 'options.targetMp', message: '目标 mp' },
  targetMmp: { optionKey: 'target-mmp', promptKey: 'options.targetMmp', message: '目标 mmp' },
};