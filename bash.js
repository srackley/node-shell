const commands = require('./commands');
const userCommand = 'pwd';
const dateCheck = 'date';
const ls = 'ls';

process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
    
  const cmd = data.toString().trim();
  if (cmd == 'pwd'){
commands[userCommand]();
  } else if (cmd == 'date'){
commands[dateCheck]();
  } else if (cmd == 'ls'){
commands[ls]();
  } else {
process.stdout.write('You typed: ' + cmd + '\n');
  }
});
