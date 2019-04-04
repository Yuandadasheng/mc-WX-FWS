/* config-overrides.js */
// const { injectBabelPlugin } = require('react-app-rewired');
// const rewireLess = require('react-app-rewire-less');

// module.exports = function override(config, env) {
//    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
//    config = rewireLess.withLoaderOptions({
//      modifyVars: { "@primary-color": "#1DA57A" },
//    })(config, env);y
//     return config;
// };

module.exports = function override(config, env)  {
    config.devServer= {
        // ... 省略devServer配置代码
    }
    config.resolve = {
      alias: {
        '@': `${__dirname}/src/`,
        'static': `${__dirname}/src/static/`
      }
    };
    return config;
  };