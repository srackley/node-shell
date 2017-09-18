const fs = require('fs');
const output = process.stdout;
const req = require('request');
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
    },

    head: function(file){
        fs.readFile(file, function(err, data){
            if (err) throw err;
            const lines = data.toString();
            const arr = lines.split('\n', 5).join('\n');
        output.write(arr);
            
        })
    },

    tail: function(file){
        fs.readFile(file, function(err, data){
            if (err) throw err;
            const lines = data.toString();
            const arr = lines.split('\n');
            const str = arr.slice(arr.length - 5).join('\n')
           output.write(str);
            
        })
    },

    sort: function(file){
        fs.readFile(file, function(err, data){
            if (err) throw err;
            const lines = data.toString();
            const arr = lines.split('\n');
            const str = arr.sort().join('\n');
        return str;
            //fix uppercase/lowercase problem if we have time
        })
    },

    wc: function(file){
        fs.readFile(file, function(err, data){
            if (err) throw err;
            const lines = data.toString();
            const arr = lines.split('\n');
        output.write(arr.length.toString());
        });
    },

    uniq: function(file){
        fs.readFile(file, function(err, data){
            if (err) throw err;
            const newArr = [];
            const lines = data.toString();
            const arr = lines.split('\n').sort();
            for (var i = 0; i < arr.length; i++){
                if (arr[i] !== arr[i + 1]){
                    newArr.push(arr[i]);
                }
            }
            const str = newArr.join('\n')
            output.write(str);
        });
    }, 

    curl: function(url){
        req(url, function(err, resp, body){
            console.log('error:', err);
            console.log('statusCode:', resp && resp.statusCode);
            console.log('body:', body);
        });
    }
}

//fs.readFile(something, 'utf8', function(err, contents){
//     console.log(contents);
// })