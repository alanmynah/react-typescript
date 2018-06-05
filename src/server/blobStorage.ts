import * as path from "path";
import * as storage from "azure-storage";

const devStorageCredentials = storage.generateDevelopmentStorageCredentials();

const blobService = storage.createBlobService(devStorageCredentials);
const containerName = "image-container";
const sourceFilePath = path.resolve("src/server", "./landscape.jpg");
const blobName = path.basename(sourceFilePath, path.extname(sourceFilePath));

export const createContainerIfNotExists = async () => {
    await blobService.createContainerIfNotExists(containerName, { publicAccessLevel: "blob" }, err => {
        if (err) {
            throw(err);
        } else {
            console.log(`Container '${containerName}' created`);
        }
    });
};

export const uploadCameraImage = (imageText: string) => {
    return new Promise((resolve, reject) => {
        blobService.createBlockBlobFromText(containerName, blobName, imageText, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Upload of '${blobName}' complete` });
            }});
    });
};

export const uploadImage = async () => {
    await createContainerIfNotExists();
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
