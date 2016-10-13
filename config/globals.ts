/**
 * @author: @AngularClass
 */

export const metaData = {
  title: 'Angular2 Webpack Starter by @gdi2290 from @AngularClass',
  baseUrl: '/'
};

export const config = (env = 'development') => {
  return {
    env: process.env.ENV = process.env.NODE_ENV = 'development',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000
  };
};
