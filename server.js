var http = require("http");
var url = require("url");
function start(route,handle){
    http.createServer(function(request, response){
        var postData = "";
        var pathname = url.parse(request.url).pathname;

        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk){
            postData += postDataChunk;
            console.log("Received POST data chunk '" + postDataChunk + "'.");
        });
        request.addListener("end", function(){
            route(handle,pathname,response,postData);
        });
    }).listen(8888);


    console.log("Server Started.");
}

exports.start = start;
