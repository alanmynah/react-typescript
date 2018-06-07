import * as Express from "express";
import { uploadImage, uploadUserPhoto } from "./blobStorage";
import { uploadUser } from "./tableStorage";
import { UserDetails, PhotoBlob } from "./models";

export const router = Express.Router();

router.get("/photo", (req, res) => {
    res.send({type: "GET"});
});

router.post("/photo", (req, res) => {
    console.log("got photo in the api");
    const photo: PhotoBlob = {
        blobName: req.body.blobName,
        text: req.body.file
    };
    uploadUserPhoto(photo);
});

router.post("/user", (req, res) => {
    console.log(req.body);
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
