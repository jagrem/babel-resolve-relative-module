'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _is = require('is');

var _is2 = _interopRequireDefault(_is);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var resolveModule = function resolveModule(baseDir) {

  var resolver = undefined;

  if (baseDir) {
    (function () {

      if (!_is2['default'].string(baseDir)) {
        throw Error("Hey! That path should at least be a string.");
      }

      var topLevelEntries = _fs2['default'].readdirSync(baseDir).map(function (entryName) {
        var fullPath = baseDir + _path2['default'].sep + entryName;
        return {
          name: entryName,
          path: fullPath,
          isDirectory: _fs2['default'].statSync(fullPath).isDirectory()
        };
      });

      var directories = topLevelEntries.filter(function (entry) {
        return entry.isDirectory;
      }).map(function (entry) {
        return entry.name;
      });

      var shouldResolve = function shouldResolve(modulePath) {
        return directories.some(function (directory) {
          return modulePath.startsWith(directory);
        });
      };
      var getModulePathRelativeToFilename = function getModulePathRelativeToFilename(moduleDirectoryRelativeToFilename, modulePathToResolve) {
        return "." + _path2['default'].sep + moduleDirectoryRelativeToFilename + _path2['default'].sep + _path2['default'].basename(modulePathToResolve);
      };

      var resolvePathToModule = function resolvePathToModule(modulePathToResolve, filename) {

        var modulePathRelativeToBase = _path2['default'].join(baseDir, modulePathToResolve);
        var absoluteModulePath = _path2['default'].resolve(modulePathRelativeToBase);
        var moduleDirectoryRelativeToFilename = _path2['default'].relative(_path2['default'].dirname(filename), _path2['default'].dirname(absoluteModulePath));
        return getModulePathRelativeToFilename(moduleDirectoryRelativeToFilename, modulePathToResolve);
      };

      resolver = function (modulePathToResolve, filename) {
        return shouldResolve(modulePathToResolve) ? resolvePathToModule(modulePathToResolve, filename) : modulePathToResolve;
      };
    })();
  } else {
    resolver = function (modulePathToResolve, filename) {
      return modulePathToResolve;
    };
  }

  return resolver;
};

module.exports = resolveModule;