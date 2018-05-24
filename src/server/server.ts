import * as Express from "express";
import * as path from "path";

const app = Express();

app.use("/", Express.static(path.resolve("dist")));
app.use("/node_modules", Express.static(path.resolve("node_modules")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("dist/index.html"));
});

app.listen(5500);
console.log("listening on 5500");
