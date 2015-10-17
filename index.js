import is from 'is'
import fs from 'fs'
import path from 'path'

const resolveModule = (baseDir) => {

  let resolver

  if(baseDir) {

    if(!is.string(baseDir)) {
      throw Error("Hey! That path should at least be a string.")
    }

    const topLevelEntries = fs
      .readdirSync(baseDir)
      .map(entryName => {
        const fullPath = baseDir + path.sep + entryName
        return {
            name: entryName,
            path: fullPath,
            stats: fs.statSync(fullPath)
        }
      })

    const directories = topLevelEntries
      .filter(entry => entry.stats.isDirectory())
      .map(entry => entry.name)

    const shouldResolve = modulePath => directories.some(directory => modulePath.startsWith(directory))

    const resolvePathToModule = (modulePathToResolve, filename) => {

      const modulePathRelativeToBase = path.join(baseDir, modulePathToResolve)
      const absoluteModulePath = path.resolve(modulePathRelativeToBase)
      const moduleDirectoryRelativeToFilename = path.relative(path.dirname(filename), path.dirname(absoluteModulePath))
      const modulePathRelativeToFilename = './' + moduleDirectoryRelativeToFilename + '/' + path.basename(modulePathToResolve)
      return modulePathRelativeToFilename
    }

    resolver = (modulePathToResolve, filename) => {
      return shouldResolve(modulePathToResolve)
        ? resolvePathToModule(modulePathToResolve, filename)
        : modulePathToResolve
    }
  } else {
    resolver = (modulePathToResolve, filename) => modulePathToResolve
  }

  return resolver
}

module.exports = resolveModule