const spawn = require('child_process').spawn;

const runProcess = (processName, args, callback) => {
  const child = spawn(processName, args);

  var timeoutId = setTimeout(() => {
    child.kill();

    console.log('=========================================================');
    var timeoutMgs = 'Timeout reached. Killing process.';
    if (typeof args[1] === 'string') {
      timeoutMgs = 'IP ' + args[1] + ':' + args[2] + '. ' + timeoutMgs;
    }
    console.log(timeoutMgs);
  }, 5000);

  child.on('exit', (code, signal) => {
    clearTimeout(timeoutId);

    if (typeof callback !== 'undefined') {
      callback();
    }
  });

  child.on('error', (err) => {
    console.log(err);
  });

  child.stdout.on('data', (data) => {
    console.log('' + data);
  });
};

runProcess('node', ['remove-garbage.js'], () => {
  runProcess('node', ['get-status.js', '127.0.0.1', '13270']);
  runProcess('node', ['get-status.js', '127.0.0.1', '13271']);
  runProcess('node', ['get-status.js', '10.10.0.1', '13270']);

  // And more if need be ...
});
