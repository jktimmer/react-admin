'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const buildPath = process.env.BUILD_PATH || 'build';
const projectPublicPath = resolveApp(process.env.PROJECT_PUBLIC_PATH || 'public'); 
const projectPublicIndexHtml = path.resolve(projectPublicPath, process.env.PROJECT_PUBLIC_INDEX_HTML || './index.html')
const projectSrcPath = resolveApp(process.env.PROJECT_SRC_PATH || 'src');
const projectSrcIndexJs = path.resolve(projectSrcPath, process.env.PRIJECT_SRC_INDEX_JS || './main.js')
const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp(buildPath),
  appPublic: projectPublicPath,
  appHtml: projectPublicIndexHtml,
  appSrc: projectSrcPath,
  appIndexJs: projectSrcIndexJs,
  appPackageJson: resolveApp('package.json'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  webpackAliasConfig: resolveApp('webpackAliasconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, path.resolve(projectSrcPath, './test/setupTests')),
  proxySetup: path.resolve(projectSrcPath, './setupProxy.js'),

  appNodeModules: resolveApp('node_modules'),
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
  publicUrlOrPath,
};



module.exports.moduleFileExtensions = moduleFileExtensions;