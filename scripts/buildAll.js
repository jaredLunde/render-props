const path = require('path')
const ora = require('ora')
const cmd = require('node-cmd')
const {getPackages} = require('./utils')


async function buildAll () {
  for (let pkg of getPackages()) {
    const spinner = ora(`Building ${path.basename(pkg)}`).start()

    await new Promise(
      (resolve, reject) => cmd.get(
        `
          cd ${pkg}
          yarn build
        `,
        (err, data, stderr) => {
          spinner.stop()

          if (!err) {
            resolve(data)
          } else {
            reject(err)
          }
        }
      )
    )
  }
}

buildAll().then(() => console.log('Finished.'))
