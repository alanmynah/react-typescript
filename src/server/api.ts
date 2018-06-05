import * as Express from "express";
import { uploadImage } from "./blobStorage";

export const router = Express.Router();

router.get("/photo", (req, res) => {
    res.send({type: "GET"});
});

router.post("/photo", (req, res) => {
    console.log(req.body);
    uploadImage();
    res.send({
        type: "POST",
        name: req.body.name,
        age: req.body.age
    });
});

router.put("/photo/:id", (req, res) => {
    res.send({type: "PUT"});
});

router.delete("/photo/:id", (req, res) => {
    res.send({type: "DELETE"});
});
