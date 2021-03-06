import * as Express from "express";
import * as dotenv from "dotenv";
import * as path from "path";
import { json } from "body-parser";
import { router } from "./api";
import { createTableIfNotExists } from "./tableStorage";
import { createContainerIfNotExists } from "./blobStorage";

dotenv.config();
const server = Express();

server.use(json({limit: "500kb"}));

server.use("/", Express.static(path.resolve("dist")));
server.use("/node_modules", Express.static(path.resolve("node_modules")));
server.use("/api", router);

server.get("*", (req, res) => {
    res.sendFile(path.resolve("dist/index.html"));
});

server.listen(process.env.PORT || 6500, () => {
    console.log("listening on 6500");
    createTableIfNotExists(),
    createContainerIfNotExists();
});
