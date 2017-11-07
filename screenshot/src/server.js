var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

    var ip = require("ip");
    console.dir ( ip.address() );

var PORTNO = 80;
var HOSTNAME = '0.0.0.0';

const puppeteer = require('puppeteer');


var server = http.createServer(function(req, res) {
    console.log("WEB SERVER REQUEST");
    console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");

    var uri = url.parse(req.url).pathname;
    var urlObj = url.parse(req.url, true);
    var screenshot = urlObj.query.q;
    
    if (screenshot != undefined) {
        var filename = "./shots/test.png";

        console.log("Screenshot : " + screenshot);
        console.log("Saving     : " + filename);

        puppeteer.launch({args: ['--no-sandbox']}).then(async browser => {
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
                console.log("Sending    : Image");

                res.writeHead(200, {'Content-Type':'image/png'});

                var fileStream = fs.createReadStream(filename);
                fileStream.pipe(res);

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
