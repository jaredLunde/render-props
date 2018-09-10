const fs = require('fs')
const path = require('path')
const ora = require('ora')
const cmd = require('node-cmd')
const semver = require('semver')
const {getPackages} = require('./utils')
const argv = require('minimist')(process.argv.slice(2));


let versionBump, preId

switch (argv._[0]) {
  case 'prerelease':
    preId = argv.preid
    if (['beta', 'alpha'].includes(preId) === false) {
      throw `Option --preid must be either 'beta' or 'alpha'`
    }
  case 'major':
  case 'minor':
  case 'patch':
    versionBump = argv._[0]
    break;
  default:
    throw `Must include first option for version bump (prerelease, major, minor, patch)`
}


const promises = []
const spinner = ora(`Publishing all packages`).start()

function publishAll () {
  for (let pkg of getPackages()) {
    promises.push(
      new Promise(
        (resolve, reject) => {
          fs.readFile(
            path.join(pkg, 'package.json'),
            (err, data) => {
              if (err) {
                reject(err)
              }
              else {
                data = JSON.parse(data)
                const nextVersion = semver.inc(data.version, versionBump, preId)

                cmd.get(
                  `
                    cd ${pkg}
                    yarn publish --new-version ${nextVersion}
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
              }
            }
          )
        }
      )
    )
  }
}

publishAll()
Promise.all(promises).then(() => {
  spinner.stop()
  console.log('Finished.')
})
