const fs = require('fs');
const output = process.stdout;
const req = require('request');

    function pwd(){
        output.write(process.cwd());  
    };

    function date(file){
        output.write(Date()); 
    };

    function ls(file){
        fs.readdir('.', function(err, files){
            if (err) throw err;
            output.write(files.join('\n'));
        });
    };

    function echo(file){
        const info = file
        .split(' ')
        .map((arg)=> (arg[0] === '$') ? process.env[arg.slice(1)] : arg)
        .join(' ');
        output.write(info);
    };

    function cat(files){
        files = files.split(' ');
        const texts = [];
        var count = 0;
        files.forEach(function(file, i){
            fs.readFile(file, function(err, text){
                if (err) throw err;
                texts[i] = text;
                count++;
                if (count === files.length) output.write(texts.join(''));
            });
        });
    };

    function head(file){
        fs.readFile(file, {encoding: 'utf8'}, function(err, data){
            if (err) throw err;
        output.write(data.split('\n', 5).join('\n'));
            
        })
    };

    function tail(file){
        fs.readFile(file, {encoding: 'utf8'}, function(err, data){
            if (err) throw err;
           output.write(data.split('\n').slice(-5).join('\n'));
        })
    };

    function sort(file){
        fs.readFile(file, {encoding: 'utf8'}, function(err, data){
            if (err) throw err;
            const lines = data.toString();
            const arr = lines.split('\n');
            const str = arr.sort().join('\n');
        return str;
            //fix uppercase/lowercase problem if we have time
        })
    };

    function wc(file){
        fs.readFile(file, function(err, data){
            if (err) throw err;
            const lines = data.toString();
            const arr = lines.split('\n');
        output.write(arr.length.toString());
        });
    };

    function uniq(file){
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
    };

    function curl(url){
        req(url, function(err, resp, body){
            console.log('error:', err);
            console.log('statusCode:', resp && resp.statusCode);
            console.log('body:', body);
        });
    };

    module.exports = {
        pwd: pwd, 
        date: date,
        ls: ls,
        echo: echo,
        cat: cat,
        head: head,
        tail: tail,
        sort: sort,
        wc: wc,
        uniq: uniq,
        curl: curl
    }


//fs.readFile(something, 'utf8', function(err, contents){
//     console.log(contents);
// })