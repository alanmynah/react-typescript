import * as Express from "express";

export const router = Express.Router();

router.get("/photo", (req, res) => {
    res.send({type: "GET"});
});

router.post("/photo", (req, res) => {
    res.send({type: "POST"});
});

router.put("/photo/:id", (req, res) => {
    res.send({type: "PUT"});
});

router.delete("/photo/:id", (req, res) => {
    res.send({type: "DELETE"});
});
