const fs = require('fs');
const output = process.stdout;

module.exports = {
    pwd: function(){
            console.log(process.cwd());  
            output.write('prompt > ');            
    },
    date: function(file){
        const d = new Date();
        console.log(d.toString()); 
        output.write('prompt > ');
    },

    ls: function(file){
        fs.readdir('.', function(err, files){
            if (err) throw err;
            files.forEach(function(file){
                output.write(file.toString() + '\n');
            })
            output.write('prompt > ');  
        });
    }, 
    echo: function(file){
        console.log(file);
    },

    cat: function(file){
        fs.readFile(file, function(err, data){
            if (err) throw err;
           output.write(data + '\n');
            output.write('prompt > ');  
        });
    }
}

//fs.readFile(something, 'utf8', function(err, contents){
//     console.log(contents);
// })