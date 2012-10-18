var http = require("http");
var url = require("url");
function start(route,handle){
    http.createServer(function(request, response){
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle,pathname,response,request);
    }).listen(8888);

    console.log("Server Started.");
}

exports.start = start;
