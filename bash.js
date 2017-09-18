const commands = require('./commands');
const userCommand = 'pwd';
const dateCheck = 'date';
const ls = 'ls';
const echo = 'echo';
const cat = 'cat';
const head = 'head';
const tail = 'tail';
const sort = 'sort';
const wc = 'wc';
const uniq = 'uniq';
const curl = 'curl';
const find = 'find';

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
  } else if (arr[0] == 'head'){
    commands[head](arr[1]);
  } else if (arr[0] == 'tail'){
    commands[tail](arr[1]);
   } else if (arr[0] == 'sort'){
     commands[sort](arr[1]);
  } else if (arr[0] == 'wc'){
    commands[wc](arr[1]);
  } else if (arr[0] == 'uniq'){
    commands[uniq](arr[1]);
   } else if (arr[0] == 'curl'){
    commands[curl](arr[1]);
  } else if (arr[0] == 'find'){
    commands[curl](arr[1]);
      } else {
process.stdout.write('You typed: ' + file + '\n');
console.log(arr);
  }
});

var done = function(output){
  process.stdout.write(output);
  process.stdout.write('prompt > ');
}