var http = require("http");
function start(){
    http.createServer(function(request, response){
        console.log("Request received.");
        response.writeHead(200, {"Content-Type":"text/plain"});
        response.write("Hello World");
        response.end();
    }).listen(8888);


    console.log("Server Started.");
}

exports.start = start;
