var exec = require('..');

exec(['ls', '-lh', '-a'], {cwd: '/'}, function(err, out, code) {
  if (err) throw err;
  process.stdout.write(out);
  process.exit(code);
});
