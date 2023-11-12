const Express = require("express");
const fs = require("fs").promises;
const { ReturnSize, AddLinks, SaveLinks } = require("public/main");


const server = Express();
let LINKS = {};


server.use(Express.static(__dirname + "/public"));

server.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

server.post("/", async (req, res) => {
    let body = "";
    for await (let chank of req) body += chank;
    body = JSON.parse(body);

    if (body.action === "size") ReturnSize(req, res);
    else if (body.action === "add") AddLinks(req, res, body);
    else if (body.action === "save") SaveLinks(req, res);
    else {
        res.send("ererbrbrbtrbgfbgfbg");
    }
});


server.listen(3333, "localhost", (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log("Server starting: http://localhost:3333/");
    }
});