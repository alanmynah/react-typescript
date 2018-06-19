import * as Express from "express";
import * as path from "path";
import { uploadPhotoAndRetrieveUrl } from "./blobStorage";
import { uploadUser } from "./tableStorage";
import { UserDetails, PhotoBlob, JsonBlobData } from "./models";
import { v1 } from "uuid";
import { detectFace } from "./faceApi";

export const router = Express.Router();

router.get("/photo", async (req, res) => {
    res.send({type: "GET"});
});

router.post("/photo", async (req, res) => {
    const photoBlob: PhotoBlob = {
        blobId: v1().toString(),
        text: req.body.text
    };

    const imageUrl = await uploadPhotoAndRetrieveUrl(photoBlob);
    const faceId = await detectFace(photoBlob.blobId);
    const hasFace = faceId ? true : false;

    const data: JsonBlobData = {
        blobId: photoBlob.blobId,
        imageUrl,
        hasFace,
        faceId
    };

    res.json(data);
});

router.post("/registration", async (req, res) => {
    const user: UserDetails = {
        name: req.body.name,
        username: req.body.username,
        blobId: req.body.blobId,
        faceId: req.body.faceId,
    };
    uploadUser(user);
    res.end();
});

router.post("/login", async (req, res) => {
    const user: UserDetails = {
        name: req.body.name,
        username: req.body.username,
        blobId: req.body.blobId,
        faceId: req.body.faceId,
    };
    if (user.name === "alan") {
        res.status(200).json(user);
    } else {
        res.status(401).json(user);
    }
});
