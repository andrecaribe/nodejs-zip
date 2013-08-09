var fs = require('fs'),
    spawn = require('child_process').spawn;

module.exports = function() {

    var _file,
        _fileList,
        _arguments,
        _callback;

    var zip = function() {
        var params = _arguments.concat(_fileList);
            params.unshift(_file);

        var command = spawn('zip', params);

        command.stdout.on('data', function(data) {
            // TODO: stdout
        });

        command.stderr.on('data', function(data) {
            // TODO: stderr
        });

        command.on('close', function(code) {
            if(code === 0) {
                _callback();
            } else {
                _callback(new Error(code));
            }
        });
    }

    var unzip = function() {
        var params = _arguments;
            params.unshift(_file);

        var command = spawn('unzip', params);

        command.stdout.on('data', function(data) {
            // TODO: stdout
        });

        command.stderr.on('data', function(data) {
            // TODO: stderr
        });

        command.on('close', function(code) {
            if(code === 0) {
                _callback();
            } else {
                _callback(new Error(code));
            }
        });
    }

    this.append = function() {
        throw new Error('Not implemented');
    }

    this.compress = function(file, fileList, arguments, callback) {
        // TODO: extract method fs.exists
        // TODO: extract method fs.unlink

        _file = file;
        _fileList = fileList;
        _arguments = arguments;
        _callback = callback;

        fs.exists(file, function(exists) {
            
            if (exists) {
                
                fs.unlink(file, function (err) {
                    if (err) {
                        _callback(err);
                    }

                    zip();
                });
            } else {
                zip();
            }

        });
    }

    this.extract = function(file, arguments, callback) {

        _file = file;
        _fileList = [];
        _arguments = arguments;
        _callback = callback;

        fs.exists(file, function(exists) {
            
            if (exists) {
                unzip();
            } else {
                _callback(new Error('File not found'));
            }

        });
    }
};