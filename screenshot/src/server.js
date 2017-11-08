const puppeteer = require('puppeteer');
/* Modules */
var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs")
var ip = require("ip");
/* Host config */
var PORTNO = 80;
var HOSTNAME = '0.0.0.0';
/* Debugging */
console.log("Initialising..");
console.log("Loader IP Address: " + ip.address());
/* Server Setup */
var server = http.createServer(function(req, res) {
    console.log("WEB SERVER REQUEST");
    console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
    /* URL Processing */
    var uri = url.parse(req.url).pathname;
    var urlObj = url.parse(req.url, true);
    var screenshot = urlObj.query.q;
    /* Ensure we have a screenshot */
    if (screenshot != undefined) {
        var filename = "/tmp/test.png";
        console.log("Screenshot : " + screenshot);
        console.log("Saving     : " + filename);
        /* Run Chrome Headless */
        puppeteer.launch({args: ['--no-sandbox']}).then(async browser => {
          const page = await browser.newPage();
          await page.setViewport({width: 1200, height: 1000});
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
                console.log("Sending    : Image");
                fs.readFile(filename, function read(err, data) {
                    if (err) {
                        throw err;
                    }
                    content = data;
                    var b64content = content.toString('base64');
                    var json = {
                        'requested': screenshot,
                        'content': b64content
                    };
                    // Invoke the next step here however you like
                    res.writeHead(200, {'Content-Type':'text/plain'});
                    res.write(JSON.stringify(json));
                    res.end();
                });
            }); //end path.exists
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end();
        return;
    }
})

server.listen(PORTNO, HOSTNAME, function(){
    console.log("Server is apparently listening on "+HOSTNAME+":" + PORTNO);
});

console.log("Initialising server.");
console.log("Hostname: " + HOSTNAME);
console.log("Port Number:" + PORTNO);
