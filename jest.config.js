/* eslint-disable */
// "^@(api(.*))": "<rootDir>/src/$1",
// "^@(assets(.*))$": "<rootDir>/src/$1",
// "^@(components(.*))$": "<rootDir>/src/$1",
// "^@(pages(.*))": "<rootDir>/src/$1",
// "^@(routes(.*))$": "<rootDir>/src/$1",
// "^@(style(.*))$": "<rootDir>/src/$1",
// "^@(store(.*))$": "<rootDir>/src/$1",
// "^@(utils(.*))$": "<rootDir>/src/$1"
const aliasSet = require('./config/webpackAliasSet');
const aliaskeysList = Object.keys(aliasSet);
const reg = new RegExp(/^([@])(.*)$/); // 如果使用其他符号，在@后添加即可
const getModuleNameMapperFromAliasObjFunc = ()=> {
  let obj = new Object();
  aliaskeysList.forEach((val)=> {
    let kv = val.match(reg);
    let str = '';
    str = kv ? (kv.length == 3 ? (kv[0] == kv[1] ? `^${kv[1]}/(.*)$` : `^${kv[1]}(${kv[2]}(.*))$`) : `^${kv[1]}/(.*)$`) : `^${val}/(.*)$`;
    obj[str] = '<rootDir>/src/$1';
  })
  return obj;
}
module.exports = {
    "roots": [
      "<rootDir>/src/test"
    ],
    "collectCoverageFrom": [
      "src/test/*.{js,jsx,ts,tsx}",
      "!src/test/*.d.ts"
    ],
    "setupFiles": [
      "react-app-polyfill/jsdom"
    ],
    "setupFilesAfterEnv": [
      "<rootDir>/src/test/setupTests.js"
    ],
    "testMatch": [
      "<rootDir>/src/test/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/src/test/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    "testEnvironment": "jsdom",
    "testRunner": "/Users/chen/react-test/my_react_app/node_modules/jest-circus/runner.js",
    "transform": {
      "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/config/jest/babelTransform.js",
      "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
      "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
    },
    "transformIgnorePatterns": [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
      "^.+\\.module\\.(css|sass|scss)$"
    ],
    "modulePaths": [],
    "moduleNameMapper": {
      "^react-native$": "react-native-web",
      "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
      ...(getModuleNameMapperFromAliasObjFunc())
    },
    "moduleFileExtensions": [
      "web.js",
      "js",
      "web.ts",
      "ts",
      "web.tsx",
      "tsx",
      "json",
      "web.jsx",
      "jsx",
      "node",
      "css",
      "svg"
    ],
    "watchPlugins": [
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname"
    ],
    "resetMocks": true
}