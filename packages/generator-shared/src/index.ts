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
  /** 目标 react 技术栈, 并且带有 react hooks 支持 */
  targetReactWithHooks: boolean;
  /** 目标 vue 技术栈 */
  targetVue: boolean;
  /** 目标 miniprogram 微信小程序技术栈 */
  targetMp: boolean;
  /** 目标 mmp 美团小程序技术栈 */
  targetMmp: boolean;
}
