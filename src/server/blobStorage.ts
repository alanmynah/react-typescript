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

export const uploadPhotoAndRetrieveUrl = async (blob: PhotoBlob) => {
    const rawData = blob.text;
    const matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const blobType = matches[1];
    const blobBuffer = new Buffer(matches[2], "base64");
    return new Promise((resolve, reject) => {
        blobService.createBlockBlobFromText(
            containerName,
            blob.blobId,
            blobBuffer,
            { contentSettings: { contentType: blobType } },
            async (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(await retrieveBlobUrl(blob.blobId));
                }
            }
        );
    });
};

export const retrieveBlobUrl = async (blobId: string) => {
    const blobUrl = await blobService.getUrl(containerName, blobId);
    return blobUrl;
};

export const retrieveBlobUrlWithSasToken = async (blobId: string) => {
    // sasToken might be required for production
    const sasToken = blobService.generateSharedAccessSignature(
        containerName,
        blobId, {
            AccessPolicy: {
                Permissions: "Read",
                Expiry: storage.date.hoursFromNow(2)
        }});
    const blobUrl = await blobService.getUrl(containerName, blobId, sasToken);
    return blobUrl;
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
