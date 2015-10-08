Babel has a configuration setting `resolveModuleSource` which is a function that is used to perform
module resolution. This module provides an implementation of that function which transforms paths relative
to a root directory into relative paths that will be understood by Node's `require` function or by Browserify.

```
import MasterView from '../../MasterView'
```

can be converted to

```
import Core from 'app/components/MasterView'
```

This gives consistent paths and does not require calculating the path relative to the file where the module is imported.

## Use ##

In your Babel config:

```
import resolveRelativeModule from 'babel-resolve-relative-module'

const babelConfig = {
	resolveModuleSource: resolveRelativeModule('./src/app')
}
```

Modules can now be imported relative to `./src/app`

## Install ##

```
npm install babel-resolve-relative-module
```