module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            app: './app',
            assets: './assets',
            designToken: './designToken',
            icon: './assets/icon',
            libs: './libs',
            components: './components',
            contexts: './contexts',
            common: './components/common',
            navigator: './navigator',
            src: './src',
            DataStorage: './src/DataStorage',
            LoginViewController: './components/client/login/LoginViewController',
          }
        }
      ]
    ]
  };
};
