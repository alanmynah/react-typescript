import * as Express from "express";
import * as path from "path";
import { uploadPhotoAndRetrieveUrl } from "./blobStorage";
import { uploadUser } from "./tableStorage";
import { UserDetails, PhotoBlob, JsonBlobData } from "./models";
import { v1 } from "uuid";
import { processImage } from "./faceApi";

export const router = Express.Router();

router.get("/photo", async (req, res) => {
    const imageId = "a7744af0-6ee6-11e8-be63-954e37460bf2";
    const faceApiData = await processImage(imageId);
    res.json(faceApiData);
});

router.post("/photo", async (req, res) => {
    const photoBlob: PhotoBlob = {
        blobId: v1().toString(),
        text: req.body.text
    };

    const imageUrl = await uploadPhotoAndRetrieveUrl(photoBlob);

    const data: JsonBlobData = {
        blobId: photoBlob.blobId,
        imageUrl
    };

    res.status(200).json(data);
});

router.post("/user", (req, res) => {
    const user: UserDetails = {
        name: req.body.name,
        username: req.body.username,
        blobId: req.body.blobId
    };
    uploadUser(user);
    res.end();
});

router.put("/photo/:id", (req, res) => {
    res.send({type: "PUT"});
});

router.delete("/photo/:id", (req, res) => {
    res.send({type: "DELETE"});
});
