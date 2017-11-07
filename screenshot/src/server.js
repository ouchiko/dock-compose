var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 8888;
const puppeteer = require('puppeteer');


http.createServer(function(req, res) {

    console.log("Request made..");

    var uri = url.parse(req.url).pathname;
    var urlObj = url.parse(req.url, true);
    var screenshot = urlObj.query.q;
    var filename = "./shots/test.png";

    console.log("Screenshot: " + screenshot);
    console.log("Saving: " + filename);

    puppeteer.launch().then(async browser => {
      const page = await browser.newPage();
      await page.setViewport({width: 1200, height: 3000});
      await page.goto(screenshot);
      await page.screenshot({path: filename});
      await browser.close();
    }).then(()=> {
        console.log("Excuting return");
        fs.exists(filename, function(exists) {
            if(!exists) {
                console.log("not exists: " + filename);
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write('404 Not Found\n');
                res.end();
                return;
            }

            res.writeHead(200, {'Content-Type':'image/png'});

            var fileStream = fs.createReadStream(filename);
            fileStream.pipe(res);

        }); //end path.exists
    });
}).listen(8888);

console.log("Server up, on 8888");
//
// http.createServer(function(request, response) {
//
//
//
//         puppeteer.launch().then(async browser => {
//           const page = await browser.newPage();
//           await page.goto(screenshot);
//           await page.screenshot({path: filename});
//           await browser.close();
//         }).then(()=> {
//             console.log("Reading file "+filename+"..");
//             response.writeHead(200,{'Content-type':'image/png'});
//             var fileStream = fs.createReadStream(filename);
//             fileStream.pipe(response);
//             response.end();
//             console.log("Sent file..");
//         });
//
//
// }).listen(parseInt(port, 10));
//
// console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
