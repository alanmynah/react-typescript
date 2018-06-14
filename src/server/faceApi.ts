import * as request from "request";
import { retrieveBlobUrl, retrieveBlobUrlWithSasToken } from "./blobStorage";

export const processImage = async (imageId: string) => {
    const subscriptionKey = "4d798eff7c3c4a5ba2767864b9bb6cd6";
    const uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

    // const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg";
    // const imageUrl = await retrieveBlobUrl(imageId);
    const imageUrl = "https://8e210bc1.ngrok.io/devstoreaccount1/image-container/a7744af0-6ee6-11e8-be63-954e37460bf2";
    const params = {
        returnFaceId: "true",
        returnFaceLandmarks: "false",
        returnFaceAttributes: "age,gender,headPose,smile,facialHair,glasses," +
            "emotion,hair,makeup,occlusion,accessories,blur,exposure,noise"
    };

    const options = {
        uri: uriBase,
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
            // To future me:
            // need to save the faceId returned in this response! daaa!
            resolve(jsonResponse);
        });
    });
};
