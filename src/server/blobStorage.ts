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
    const uploadOptions = {
        container: containerName,
        blob: blob.blobName,
        text: blob.text
    };
    await blobService.createBlockBlobFromText(containerName, blob.blobName, blob.text, err => {
        if (err) {
            throw (err);
        } else {
            console.log(`Upload of userphoto complete`);
        }
    });
};

export const uploadImage = async () => {
    await blobService.createBlockBlobFromLocalFile(containerName, blobName, sourceFilePath, err => {
        if (err) {
            throw (err);
        } else {
            console.log(`Upload of '${blobName}' complete`);
        }
    });
};

export const downloadImage = async () => {
    const dowloadFilePath = sourceFilePath.replace(".jpg", ".downloaded.jpg");
    await blobService.getBlobToLocalFile(containerName, blobName, dowloadFilePath, err => {
        if (err) {
            throw(err);
        } else {
            console.log(`Download of '${blobName}' complete` );
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
