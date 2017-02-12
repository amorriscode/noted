module.exports = {
  // Main file to include all modules
  entry: './src/main.js',
  // Where to put the build?
  output: {
     path: __dirname + "/dist/js",
    filename: 'build.js',
  },
  module: {
    // Special compilation rules
    loaders: [
      {
        // Transpile JavaScript files
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ],
  },
  resolve: {
    alias: {
        'vue$': 'vue/dist/vue.common.js',
    },
  },
}
