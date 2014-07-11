//
// simple webserver for node.js   -- run with node srv6.js
//
//  http://stackoverflow.com/questions/6084360/using-node-js-as-a-simple-web-server
//

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.argv[2] || 8888;


http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  console.log("---------------------------------");
  console.log("uri: '" + uri +"'");
  console.log("filename: '" + filename +"'");
  console.log("==================================");


/*  path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';
*/

  if (fs.statSync(filename).isDirectory()){
    filename += '/index.html';
   console.log("fs.statSync(filename).isDirectory .. filename:" + filename);
  }

  // mike
    if(uri == "/article")
      filename = "article_fragment.html";

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });

 // }); path.exists
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");