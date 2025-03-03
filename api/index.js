var http = require('http')

http.createServer(function  (req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end("Hello to all my followers")
}).listen(8080)