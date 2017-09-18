const fs = require('fs');
const output = process.stdout;
const req = require('request');

    function pwd(stdin, file, done){
        done(process.cwd());  
    };

    function date(stdin, file, done){
        done(Date()); 
    };

    function ls(stdin, file, done){
        fs.readdir('.', function(err, files){
            if (err) throw err;
            done(files.join('\n'));
        });
    };

    function echo(stdin, file, done){
        const info = file
        .split(' ')
        .map((arg)=> (arg[0] === '$') ? process.env[arg.slice(1)] : arg)
        .join(' ');
        done(info);
    };

    function cat(stdin, files, done){
        if (stdin && !files) return done(stdin);
        files = files.split(' ');
        const texts = [];
        var count = 0;
        files.forEach(function(file, i){
            fs.readFile(file, function(err, text){
                if (err) throw err;
                texts[i] = text;
                count++;
                if (count === files.length) done(texts.join(''));
            });
        });
    };

    function head(stdin, file, done){
        if (stdin && !file) produceOutput(null, stdin);
        else fs.readFile(file, {encoding: 'utf8'}, produceOutput);
        function produceOutput(err, data){
            if (err) throw err;
        done(data.split('\n', 5).join('\n'));
        }
    };

    function tail(stdin, file, done){
        if (stdin && !file) produceOutput(null, stdin);        
        else fs.readFile(file, {encoding: 'utf8'}, produceOutput);
        function produceOutput(err, data){
            if (err) throw err;
           done(data.split('\n').slice(-5).join('\n'));
        }
    };

    function sort(stdin, file, done){
        if (stdin && !file) produceOutput(null, stdin);        
        else fs.readFile(file, {encoding: 'utf8'}, produceOutput);
        function produceOutput(err, data){
            if (err) throw err;
            done(data.split('\n').sort().join('\n'));
            //fix uppercase/lowercase problem if we have time
        }
    };

    function wc(stdin, file, done){
        if (stdin && !file) produceOutput(null, stdin);                
        else fs.readFile(file, {encoding: 'utf8'}, produceOutput);
        function produceOutput(err, data){
            if (err) throw err;
            done(data.split('\n').length);
        };
    };

    function uniq(stdin, file, done){
        if (stdin && !file) produceOutput(null, stdin);                
        else fs.readFile(file, {encoding: 'utf8'}, produceOutput);
        function produceOutput(err, data){
            if (err) throw err;
            var arr = [];
            const lines = data.split('\n');
            for (var i = 0; i < lines.length; i++){
                if (lines[i] !== lines[i + 1]){
                    arr.push(lines[i]);
                }
            }
            done(arr.join('\n'));
        };
    };

    function curl(stdin, url, done){
        if (stdin && !url) produceOutput(null, stdin);                
        else if (url.slice(0, 7) !== 'http://') url = 'http://' + url;
        req(url, function(err, resp, body){
            if (err) throw err;
            // console.log('statusCode:', resp && resp.statusCode);
            if (body) done(body);
            else done('');
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