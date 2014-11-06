var http = require('http');

http.createServer(function (req,res) {
	res.writeHead(200,{'Content-Type':'text/htlm'});
	res.write("Hello World");
	res.end();
}).listen(80,'127.0.0.1',function(){
	console.log("Server Run as 127.0.0.1");
});