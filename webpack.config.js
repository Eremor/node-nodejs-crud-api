import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import NodemonPlugin from 'nodemon-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nodemonServer = (isDev) => (
  isDev && new NodemonPlugin({
    script: './build/server.js',
    ext: 'ts, js',
    execMap: {
      'ts': 'ts-node'
    }
  })
)

const config = (develop) => ({
  mode: develop ? 'development' : 'production',
  entry: {
    main: './src/index.ts'
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    nodemonServer(develop)
  ]
})

export default config;