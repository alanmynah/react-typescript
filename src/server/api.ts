import * as Express from "express";
import { uploadImage } from "./blobStorage";
import { uploadUser } from "./tableStorage";
import { UserDetails } from "./models";

export const router = Express.Router();

router.get("/photo", (req, res) => {
    res.send({type: "GET"});
});

router.post("/photo", (req, res) => {
    console.log(req.body);
    uploadImage();
    const user: UserDetails = {
        name: req.body.name,
        username: req.body.username
    };
    uploadUser(user);
    res.send({
        type: "POST",
        user,
    });
});

router.put("/photo/:id", (req, res) => {
    res.send({type: "PUT"});
});

router.delete("/photo/:id", (req, res) => {
    res.send({type: "DELETE"});
});
