module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.js',
          '.json',
          '.ts',
          '.tsx',
          '.jsx',
          '.png',
          '.jpg',
          '.jpeg',
          '.gif',
        ],
        alias: {
          '@': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
