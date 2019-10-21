import is from "is";
import fs from "fs";
import path from "path";

const resolveModule = baseDir => {
  let resolver;

  if (!baseDir) {
    return modulePathToResolve => modulePathToResolve;
  }

  if (!is.string(baseDir)) {
    throw Error(
      "babel-resolve-relative-module: The base directory path must be a valid string."
    );
  }

  const topLevelEntries = fs.readdirSync(baseDir).map(entryName => {
    const fullPath = baseDir + path.sep + entryName;
    return {
      name: entryName,
      path: fullPath,
      isDirectory: fs.statSync(fullPath).isDirectory()
    };
  });

  const directories = topLevelEntries
    .filter(entry => entry.isDirectory)
    .map(entry => entry.name);

  const shouldResolve = modulePath =>
    directories.some(directory => modulePath.startsWith(directory));

  const getModulePathRelativeToFilename = (
    moduleDirectoryRelativeToFilename,
    modulePathToResolve
  ) =>
    "." +
    path.sep +
    moduleDirectoryRelativeToFilename +
    path.sep +
    path.basename(modulePathToResolve);

  const resolvePathToModule = (modulePathToResolve, filename) => {
    const modulePathRelativeToBase = path.join(baseDir, modulePathToResolve);
    const absoluteModulePath = path.resolve(modulePathRelativeToBase);
    const moduleDirectoryRelativeToFilename = path.relative(
      path.dirname(filename),
      path.dirname(absoluteModulePath)
    );

    return getModulePathRelativeToFilename(
      moduleDirectoryRelativeToFilename,
      modulePathToResolve
    );
  };

  resolver = (modulePathToResolve, filename) => {
    return shouldResolve(modulePathToResolve)
      ? resolvePathToModule(modulePathToResolve, filename)
      : modulePathToResolve;
  };

  return resolver;
};

module.exports = resolveModule;
