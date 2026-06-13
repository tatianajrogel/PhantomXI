const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ensure Metro can resolve ESM/mjs files
config.resolver.sourceExts = [...(config.resolver.sourceExts || []), 'mjs'];

// Alias @supabase/node-fetch to a lightweight shim so Metro does not pull in
// the Node-only dynamic import path (which breaks the RN/web bundles).
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  '@supabase/node-fetch': path.resolve(__dirname, 'shims', 'node-fetch.js'),
};

module.exports = config;
