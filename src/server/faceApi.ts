import * as request from "request";
import { retrieveNgrokBlobUrl } from "./blobStorage";

const processImage = async (imageId: string) => {
    const subscriptionKey = process.env.FACE_API_KEY_1;
    const uriDetectBase = process.env.FACE_API_ENDPOINT + "/detect";

    // const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg";
    // const imageUrl = await retrieveBlobUrl(imageId);
    const imageUrl = await retrieveNgrokBlobUrl(imageId);
    const params = {
        returnFaceId: "true",
        returnFaceLandmarks: "false",
        returnFaceAttributes: "age,gender,smile,emotion,hair,makeup,accessories"
    };

    const options = {
        uri: uriDetectBase,
        qs: params,
        body: '{"url": ' + '"' + imageUrl + '"}',
        headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key" : subscriptionKey
        }
    };
    return new Promise((resolve, reject) => {
        request.post(options, (error, response, body) => {
            if (error) {
                reject(error);
            }
            const jsonResponse = JSON.parse(body);
            resolve(jsonResponse);
        });
    });
};

export const detectFace: any = async (imageId: string) => {
    const imageData: any = await processImage(imageId);
    try {
        return imageData[0].faceId;
    } catch (error) {
        console.log("didn't find a face on the image");
        return undefined;
    }
};
