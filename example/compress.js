var http = require('http'),
    nodejszip = require('../lib/nodejs-zip');

http.createServer(function (req, res) {
 
    var file = 'compress-example.zip',
        arguments = ['-j'],
        fileList = [
            'assets/image_1.jpg',
            'assets/image_2.jpg',
            'assets/image_3.jpg',
            'assets/image_4.jpg',
            'assets/image_5.jpg',
            'assets/image_6.jpg',
            'assets/image_7.jpg',
            'assets/image_8.jpg',
            'assets/image_9.jpg',
            'assets/image_10.jpg',
            'assets/image_11.jpg',
            'assets/image_12.jpg',
            'assets/image_13.jpg',
            'assets/image_14.jpg'];

    var zip = new nodejszip();

    zip.compress(file, fileList, arguments, function(err) {
        if (err) {
            throw err;
        }

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Complete.\n');
    });

}).listen(8000);