module.exports = {
  entry: './src/index.ts',
  output: {
    path: __dirname + '/dist/',
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  // Suppress warnings about large output size.
  performance: {hints: false},
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      // All files with a '.ts' or '.tsx' extension will be handled by
      // 'ts-loader'.
      {
        test: /\.tsx?$/,
        options: {
          configFile: 'src/tsconfig.json',
        },
        loader: 'ts-loader',
        exclude: /node_modules/
      },

      // All output '.js' files will have any sourcemaps re-processed by
      // 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ]
  },
};