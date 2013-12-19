var spawn = require('child_process').spawn;
var StringDecoder = require('string_decoder').StringDecoder;

// node v0.8 changed the events that are emitted at the end
// of spawn, this line will be used to make it possible
// for this module to work for both v0.6 and v0.8 (and above hopefully)
// see https://gist.github.com/bahamas10/3406380
var v = process.version.split('.')[1];

module.exports = exec;

/**
 * Spawn a child with the ease of exec, but safety of spawn
 *
 * @param args      array   ex. [ 'ls', '-lha' ]
 * @param callback  function(err, out, code)
 *
 * @return spawn object
 */
function exec(args, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = null;
  }
  if (typeof args === 'string') {
    args = ['/bin/sh', '-c', args];
  }

  var out = '';
  var err = '';
  var code;
  var i = 0;
  var decoder = new StringDecoder();

  var child = spawn(args[0], args.slice(1), opts);
  child.stdout.on('data', function(data) {
    out += decoder.write(data);
  });
  child.stderr.on('data', function(data) {
    err += decoder.write(data);
  });

  child.on('exit', function(c) {
    code = c;
    if (++i >= 2 || v < 8) callback(err, out, code);
  });

  child.on('close', function() {
    if (++i >= 2) callback(err, out, code);
  });

  return child;
};
