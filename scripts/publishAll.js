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

async function publishAll () {
  for (let pkg of getPackages()) {
    const spinner = ora(`Publishing ${path.basename(pkg)}`).start()

    await new Promise(
      (resolve, reject) => {
        fs.readFile(
          path.join(pkg, 'package.json'),
          (err, data) => {
            spinner.succeed(`Published ${path.basename(pkg)}`)
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
  }
}

publishAll().then(() => {
  console.log('Finished.')
})
