module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
            debug: false
          }
        ],
        '@babel/preset-react'
      ]
    },
    production: {
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-react'
      ]
    },
    development: {
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-react'
      ]
    }
  }
};
