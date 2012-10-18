var queryString = require("querystring");
var fs = require("fs");
var util = require("util");
var formidable = require("formidable");
function start(response){
    console.log("Request handler 'start' was called.");

    var body = '<html>' 
        + '<head>'
        + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
        + '</head>'
        + '<body>'
        + '<form action="/upload" enctype="multipart/form-data" method="post">'
        + '<input type="file" name="upload">'
        + '<input type="submit" value="Upload file" />'
        + '</form>'
        + '</body>'
        + '</html>';

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

/* files cannot be renamed between different patitions, 
 * this function can solve this problem 
 * Reference: stackoverflow.com/questions/4568689/how-do-i-move-file-a-to-a-different-partition-in-node-js*/
function renameFileSync(source_path, destination_path){
    var src = fs.createReadStream(source_path);
    var des = fs.createWriteStream(destination_path);

    util.pump(src, des, function(){
        fs.unlinkSync(source_path);
    });
}

function upload(response,request){
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files){
        console.log("parsing done");
        renameFileSync(files.upload.path, "./tmp/pic.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image: <br />");
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response){
    console.log("Request handler 'show' was called.");

    fs.readFile("./tmp/pic.png", "binary", function(error, file){
        if(error){
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        }else{
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
