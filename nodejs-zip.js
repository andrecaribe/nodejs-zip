var fs = require('fs'),
    spawn = require('child_process').spawn;

module.exports = function() {

    var _file,
        _arguments,
        _callback;

    var zip = function() {
        _arguments.unshift(_file);

        var command = spawn('zip', _arguments);

        command.stdout.on('data', function(data) {
            //console.log('stdout: ' + data);
        });

        command.stderr.on('data', function(data) {
            //console.log('stderr: ' + data);
        });

        command.on('close', function(code) {
            if(code === 0) {
                _callback();
            } else {
                _callback(new Error(code));
            }
        });
    }

    this.compress = function(file, arguments, callback) {

        _file = file;
        _arguments = arguments;
        _callback = callback;

        fs.exists(file, function(exists) {
            
            if (exists) {
                
                fs.unlink(file, function (err) {
                    if (err) {
                        throw err;
                    }

                    zip();
                });
            } else {
                zip();
            }

        });
    }

    this.extract = function() {
        throw new Error('Not implemented.');
    }
};