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
}
