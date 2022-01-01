import Output from "@maizzle/framework/src/generators/output/index.js";
import http from "http";

const hostname = "0.0.0.0";
const port = 3000;

const server = http.createServer((req, res) => {
    if ("POST" === req.method) {
        let postData = "";

        // Get all post data when receive data event.
        req.on("data", function (chunk) {
            postData += chunk;
        });

        // When all request post data has been received.
        req.on("end", function () {
            const options = {
                maizzle: {
                    build: {
                        tailwind: {
                            css: false,
                        },
                    },
                    inlineCSS: {
                        mergeLonghand: true,
                        applySizeAttribute: {
                            width: ["IMG"],
                        },
                    },
                    prettify: false,
                    removeUnusedCSS: true,
                    extraAttributes: {
                        table: {
                            border: 0,
                            cellpadding: 0,
                            cellspacing: 0,
                            role: "presentation",
                        },
                    },
                },
            };

            Output.toString(postData.toString(), options).then((r) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                res.end(r.html);
            });
        });
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
