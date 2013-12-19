exec
====

Call a child process with the ease of exec and safety of spawn

Why?
----

This module provides the best of both worlds of `spawn` and `exec`

It will callback with 2 strings containing stdout and stderr
(like `child_process.exec`), but will take an array of process arguments
(like `child_process.spawn`) to avoid any potentially harmful shell expansion.

Usage
-----

``` js
var exec = require('exec');
```

Example
-------

``` js
var exec = require('exec');

exec(['ls', '-lha'], function(err, out, code) {
  if (err) throw err;
  process.stdout.write(out);
  process.exit(code);
});
```

The example above will call `ls -lha` safely, by passing the arguments directly
to exec(2) without using an shell expansion/word splitting.

It returns a `child_process.spawn` object, and callbacks with any stdout,
stderr, and the exit status of the command.  The above example will throw an
error if any stderr was produced, otherwise it will print the stdout
and exit with the exit code of `ls`.

Functions
---------

### exec(['args'], [opts], callback)

`opts` is additional options to pass to `child_process.spawn`

Installation
------------

    npm install exec

License
-------

MIT
