const path = require('path')
const ora = require('ora')
const cmd = require('node-cmd')
const {getPackages} = require('./utils')


async function installAll () {
  for (let pkg of getPackages()) {
    const spinner = ora(`Installing ${path.basename(pkg)}`).start()

    await new Promise(
      (resolve, reject) => cmd.get(
        `
          cd ${pkg}
          yarn install
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

installAll().then(() => console.log('Finished.'))
