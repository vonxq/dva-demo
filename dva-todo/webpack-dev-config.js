const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, './out'),
        filename: 'build.js'
    },
    module: {
      rules: [{
          test: /\.js$/,
          use: ['babel-loader?cacheDirectory=true'],
          include: path.join(__dirname, 'src')
      }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'out')
    }
};  