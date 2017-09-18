const commands = require('./commands');
const chalk = require('chalk');
const prompt = chalk.blue('\nprompt > ');
process.stdout.write(prompt);

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  
  const tokens = data.toString().trim().split(' ');
  const cmd = tokens[0];
  const args = tokens.slice(1).join(' ');
 if (commands[cmd]) commands[cmd](args);
 else process.stderr.write(chalk.red("Command not found: ") + cmd);

});

var done = function(output){
  process.stdout.write(output);
  process.stdout.write(prompt);
}