const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      extraNodeModules: {
        assert: require.resolve('assert/'),
        stream: require.resolve('stream-browserify'),
        querystring: require.resolve('querystring-es3'),
        net: require.resolve('net'),
        tls: require.resolve('tls'),
        crypto: require.resolve('react-native-crypto'),
      },
    },
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  };
})();
