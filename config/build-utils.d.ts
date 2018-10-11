import { ParsedCommandLine } from 'typescript';
//import { Environment } from '../src/client/environments/environment';
import { Rule } from 'webpack';

import { AngularCompilerPluginOptions } from '@ngtools/webpack';

export type BeforeRunHandler = ( resourceCompiler: { get(filename: string): Promise<string> }) => Promise<void>;

export interface Metadata {
  title: string;
  description: string;
  baseUrl:  string;
  isDevServer: boolean;
  HMR: boolean;
  AOT: boolean;
  E2E: boolean;
  WATCH: boolean;
  //tsConfigPath: 'tsconfig.webpack.json';
  tsConfigPath: string;
  /**
   * This suffix is added to the environment.ts file, if not set the default environment file is loaded (development)
   * To disable environment files set this to null
   * this deprecated envFileSuffix
   */
  distSufixTarget: string;
}

export function supportES2015(tsConfigPath: string): boolean;

export function readTsConfig(tsConfigPath: string): ParsedCommandLine;

/**
 * Returns <root>/src/client/environments/environment.{suffix}.ts
 * @param suffix 
 */
export function getEnvFile(e2e: boolean, suffix: string): string;
/**
 * Returns <root>/config/config.{suffix}.json
 * @param suffix 
 */
export function getConfigFile(e2e: boolean, suffix: string): string;

// export function getEnvObject(suffix): Environment;

/**
 * Read the tsconfig to determine if we should prefer ES2015 modules.
 * Load rxjs path aliases.
 * https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md#build-and-treeshaking
 * @param supportES2015 Set to true when the output of typescript is >= ES6
 */
export function rxjsAlias(supportES2015: boolean): any;

/**
 * Deep merge.
 * @param args 
 */
export function deepMerge(...args: any[]);

export interface WaNgcWebpackSetup {
  loaders: Array<Rule>;
  plugin: AngularCompilerPluginOptions;  
}

export function ngcWebpackSetup(prod: boolean, metadata: Metadata): WaNgcWebpackSetup;

export const DEFAULT_METADATA: Metadata;
