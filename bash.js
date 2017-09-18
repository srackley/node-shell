const commands = require('./commands');
const userCommand = 'pwd';
const dateCheck = 'date';
const ls = 'ls';
const echo = 'echo';
const cat = 'cat';

process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  
  const file = data.toString().trim();
  const arr = file.split(' ');
  if (file == 'pwd'){
commands[userCommand](file);
  } else if (file == 'date'){
commands[dateCheck](file);
  } else if (file == 'ls'){
commands[ls]();
  } else if (arr[0] == 'echo'){
    commands[echo](arr.slice(1).join(' '));
  } else if (arr[0] == 'cat'){
    commands[cat](arr.slice(1).join(' '));
  } else {
process.stdout.write('You typed: ' + file + '\n');
console.log(arr);
  }
});
