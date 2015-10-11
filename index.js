const path = require('path')

  baseDir = './src/'

  topLevelDirectories = ['app', 'user', 'shared'] // TODO: Enumerate directories in baseDir

  shouldModify = modulePath => topLevelDirectories.some(directory => modulePath.startsWith(directory))

  resolveModule = (modulePathToResolve, filename) => {

     if(shouldModify(modulePathToResolve)) {
        const modulePathRelativeToBase = path.join(baseDir, modulePathToResolve)
         absoluteModulePath = path.resolve(modulePathRelativeToBase)
         moduleDirectoryRelativeToFilename = path.relative(path.dirname(filename), path.dirname(absoluteModulePath))
         modulePathRelativeToFilename = './' + moduleDirectoryRelativeToFilename + '/' + path.basename(modulePathToResolve)
        return modulePathRelativeToFilename
      } else {
        return modulePathToResolve;
      }
  }

module.exports = resolveModule