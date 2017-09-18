const fs = require('fs');
const output = process.stdout;

module.exports = {
    pwd: function(cwd){
            console.log(process.cwd());  
            output.write('prompt > ');            
    },
    date: function(cwd){
        const d = new Date();
        console.log(d.toString()); 
        output.write('prompt > ');
    },

    ls: function(){
        fs.readdir('.', function(err, files){
            if (err) throw err;
            files.forEach(function(file){
                output.write(file.toString() + '\n');
            })
            output.write('prompt > ');  
        });
    }    
}

//fs.readFile(something, 'utf8', function(err, contents){
//     console.log(contents);
// })