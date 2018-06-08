import * as path from "path";
import * as storage from "azure-storage";
import { PhotoBlob } from "./models";

const devStorageCredentials = storage.generateDevelopmentStorageCredentials();

const blobService = storage.createBlobService(devStorageCredentials);
const containerName = "image-container";
const sourceFilePath = path.resolve("src/server", "./landscape.jpg");
const blobName = path.basename(sourceFilePath, path.extname(sourceFilePath));

export const createContainerIfNotExists = async () => {
    await blobService.createContainerIfNotExists(containerName, { publicAccessLevel: "blob" }, (error, result) => {
        if (error) {
            throw(error);
        } else {
            console.log(`Blob ${containerName} ${result.created ? "created" : "already exists" }`);
        }
    });
};

export const uploadUserPhoto = async (blob: PhotoBlob) => {
    const rawData = blob.text;
    const matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const blobType = matches[1];
    const blobBuffer = new Buffer(matches[2], "base64");

    await blobService.createBlockBlobFromText(
        containerName,
        blob.blobName,
        blobBuffer,
        { contentSettings: { contentType: blobType } },
        (err, result) => {
            if (err) {
                throw (err);
            } else {
                console.dir(result);
            }
        });
};

export const deleteImage = async () => {
    await blobService.deleteBlobIfExists(containerName, blobName, err => {
        if (err) {
            throw(err);
        } else {
            console.log(`Block blob '${blobName}' deleted`);
        }
    });
};
