const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Make Metro aware of the workspace root so it can resolve and watch
// local file: dependencies like ../mdb-core-js
config.watchFolders = config.watchFolders || [];
config.watchFolders.push(workspaceRoot);

config.resolver = config.resolver || {};
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = config;
