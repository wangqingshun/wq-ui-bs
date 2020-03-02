'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

// 打包开始提示对cli进行输出一个带spinner的文案，告诉用户正在打包中
const ora = require('ora')
// 去除先前的打包,这个模块是用来清除之前的打的包，
// 因为在vue-cli中每次打包会生成不同的hash,每次打包都会生成新的文件，那就不对了，
// 我们要复盖原先的文件，因为hash不同复盖不了，所以要清除
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
