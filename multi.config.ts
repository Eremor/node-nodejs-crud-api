import { resolve } from 'path';
import { Configuration } from 'webpack';
import NodeExternals from 'webpack-node-externals';

const config: Configuration = {
  mode: 'production',
  entry: './src/cluster.ts',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'cluster.js',
    clean: true
  },
  externalsPresets: {
    node: true
  },
  externals: [
    NodeExternals()
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}

export default config;