const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const mdbCoreJsRoot = path.resolve(projectRoot, '../mdb-core-js');

const config = getDefaultConfig(projectRoot);

// 1. Watch the local package and the project root
config.watchFolders = [projectRoot, mdbCoreJsRoot];

// 2. Let Metro know where to resolve packages from.
// This includes the project's node_modules and the mdb-core-js project
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(mdbCoreJsRoot, 'node_modules'),
];

// 3. Optional: help Metro resolve the package name directly to its folder
config.resolver.extraNodeModules = {
  'mdb-core-js': mdbCoreJsRoot,
};

// 4. Force Metro to resolve (sub)dependencies only from the `node_modules` of the project root

module.exports = config;
