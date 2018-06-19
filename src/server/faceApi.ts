import * as request from "request";
import { retrieveNgrokBlobUrl } from "./blobStorage";
import * as uuid from "uuid";

const processImage = async (imageId: string) => {
    const subscriptionKey = process.env.FACE_API_KEY_1;
    const uriDetectBase = process.env.FACE_API_ENDPOINT + "/detect";

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
        // faceapi trial period expired.
        // return imageData[0].faceId;
        // this will be returning a random guid to simulate a faceId returned from the api
        return uuid.v1().toString();
    } catch (error) {
        console.log("didn't find a face on the image");
        return undefined;
    }
};
