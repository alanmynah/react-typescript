import * as Express from "express";
import { uploadUserPhoto } from "./blobStorage";
import { uploadUser } from "./tableStorage";
import { UserDetails, PhotoBlob } from "./models";
import { v1 } from "uuid";

export const router = Express.Router();

router.get("/photo", (req, res) => {
    res.send({type: "GET"});
});

router.post("/photo", (req, res) => {
    const photo: PhotoBlob = {
        blobName: v1().toString(),
        text: req.body.text
    };
    uploadUserPhoto(photo);
    res.end("Received, thank you");
});

router.post("/user", (req, res) => {
    const user: UserDetails = {
        name: req.body.name,
        username: req.body.username
    };
    uploadUser(user);
});

router.put("/photo/:id", (req, res) => {
    res.send({type: "PUT"});
});

router.delete("/photo/:id", (req, res) => {
    res.send({type: "DELETE"});
});
