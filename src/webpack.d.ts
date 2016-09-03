// Types
type Entry = Array<string> | Object;

type Output = Array<string> | {
  path: string,
  filename: string
};

type EnvOptions = any;

interface WebpackConfig {
  cache?: boolean;
  target?: string;
  devtool?: string;
  entry: Entry;
  output: any;
  module?: any;
  // module?: {
  //   preLoaders?: Array<any>;
  //   loaders?: Array<any>;
  //   postLoaders?: Array<any>
  // };
  plugins?: Array<any>;
  resolve?: {
    unsafeCache?: boolean | Array<string>;
    root?: string;
    extensions?: Array<string>;
  };
  devServer?: {
    staticOptions?: any;
    setup?: (app: any, fs?: any) => any;
    compress?: boolean;
    quiet?: boolean,
    contentBase?: string;
    port?: number;
    historyApiFallback?: boolean;
    hot?: boolean;
    inline?: boolean;
    host?: string;
    https?: boolean;
  };
  node?: {
    process?: boolean;
    global?: boolean | string;
    Buffer?: boolean;
    crypto?: string | boolean;
    module?: boolean;
    clearImmediate?: boolean;
    setImmediate?: boolean
    clearTimeout?: boolean;
    setTimeout?: boolean
  };
}
