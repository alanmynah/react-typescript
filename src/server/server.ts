import * as Express from "express";
import * as path from "path";

const server = Express();

server.use("/", Express.static(path.resolve("dist")));
server.use("/node_modules", Express.static(path.resolve("node_modules")));

server.get("/", (req, res) => {
    res.sendFile(path.resolve("dist/index.html"));
});

server.listen(5500);
console.log("listening on 5500");
