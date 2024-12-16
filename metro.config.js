const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
    'lodash-es': 'lodash',
};

config.resolver.assetExts.push('json');

module.exports = config;
