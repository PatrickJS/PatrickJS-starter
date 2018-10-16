import { ParsedCommandLine } from 'typescript';
//import { Environment } from '../src/client/environments/environment';
import { Rule } from 'webpack';

import { AngularCompilerPluginOptions } from '@ngtools/webpack';

export type BeforeRunHandler = ( resourceCompiler: { get(filename: string): Promise<string> }) => Promise<void>;

export interface CustomWebpackEnvOptions {
  metadata: Metadata;
}

export interface Metadata {
  title: string,
  description: string,
  baseUrl:  string,
  isDevServer: boolean,
  HMR: boolean,
  AOT: boolean,
  E2E: boolean,
  WATCH: boolean,
  PUBLIC: string,
  //tsConfigPath: 'tsconfig.webpack.json';
  tsConfigPath: string,
  gtmKey: string,
  /**
   * This suffix is added to the environment.ts file, if not set the default environment file is loaded (development)
   * To disable environment files set this to null
   * this deprecated envFileSuffix
   */
  distSufixTarget: string,
  sourceMapEnabled: boolean,
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
/**
 * In order of priority:
 *   first the data from { metadata: DEFAULT_METADATA }
 *     baseUrl: '/',
 *     isDevServer: helpers.isWebpackDevServer(),
 *     HMR: helpers.hasProcessFlag('hot'),
 *     AOT: process.env.BUILD_AOT || helpers.hasNpmFlag('aot'),
 *     E2E: false,
 *     WATCH: helpers.hasProcessFlag('watch'),
 *     tsConfigPath: 'tsconfig.webpack.json',
 *     gtmKey: process.env.GTM_API_KEY,
 *     distSufixTarget: ''
 *   then, webpackEnvOptionsInternal;
 *   then, { metadata: require(...'config/config.commons.json') };
 *   then, { metadata: require(...'config/config.{sufix}.json') };
 *   then, [webpack Environment Options](https://webpack.js.org/api/cli/#environment-options) (--env.metadata.distSufixTarget=prod or --env.metadata.title=title_setted_by_argument)
 * NOTE: distSufixTarget is get from: (webpackEnvOptionsFromArgs && webpackEnvOptionsFromArgs.metadata && webpackEnvOptionsFromArgs.metadata.distSufixTarget? webpackEnvOptionsFromArgs.metadata.distSufixTarget : (webpackEnvOptionsInternal && webpackEnvOptionsInternal.metadata && webpackEnvOptionsInternal.metadata.distSufixTarget? webpackEnvOptionsInternal.metadata.distSufixTarget: ''))
 *   this value is put on 'return.metadata.distSufixTarget';
 * OBS: e2e additional sufix is used if: (webpackEnvOptionsFromArgs && webpackEnvOptionsFromArgs.metadata? webpackEnvOptionsFromArgs.metadata.E2E : (webpackEnvOptionsInternal && webpackEnvOptionsInternal.metadata? webpackEnvOptionsInternal.metadata.E2E : process.env.BUILD_E2E))
 *   this value is put on 'return.metadata.distSufixTarget';
 * @param {*} webpackEnvOptionsInternal 
 * @param {*} webpackEnvOptionsFromArgs 
 */
export function getFinalEnvOptions(webpackEnvOptionsInternal: CustomWebpackEnvOptions, webpackEnvOptionsFromArgs: CustomWebpackEnvOptions);


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

export interface CustomNgcWebpackSetup {
  loaders: Array<Rule>;
  angularCompilerPluginOptions: AngularCompilerPluginOptions;  
}

export function ngcWebpackSetup(prod: boolean, metadata: Metadata): CustomNgcWebpackSetup;

/**
 *  baseUrl: '/',
 *  isDevServer: helpers.isWebpackDevServer(),
 *  HMR: helpers.hasProcessFlag('hot'),
 *  AOT: process.env.BUILD_AOT || helpers.hasNpmFlag('aot'),
 *  E2E: false,
 *  WATCH: helpers.hasProcessFlag('watch'),
 *  tsConfigPath: 'tsconfig.webpack.json',
 *  gtmKey: process.env.GTM_API_KEY,
 *  distSufixTarget: ''
 */
export const DEFAULT_METADATA: Metadata;
