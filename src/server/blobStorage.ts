import * as path from "path";
import * as storage from "azure-storage";

const devStorageCredentials = storage.generateDevelopmentStorageCredentials();

const blobService = storage.createBlobService(devStorageCredentials);
const containerName = "image-container";
const sourceFilePath = path.resolve("../../images/landscape.jpg");
const blobName = path.basename(sourceFilePath, path.extname(sourceFilePath));

export const createContainer = () => {
  return new Promise((resolve, reject) => {
      blobService.createContainerIfNotExists(containerName, { publicAccessLevel: "blob" }, err => {
          if (err) {
              reject(err);
          } else {
              resolve({ message: `Container '${containerName}' created` });
          }
      });
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

export const uploadImage = () => {
  return new Promise((resolve, reject) => {
      blobService.createBlockBlobFromLocalFile(containerName, blobName, sourceFilePath, err => {
          if (err) {
              reject(err);
          } else {
              resolve({ message: `Upload of '${blobName}' complete` });
          }
      });
  });
};

export const downloadImage = () => {
    const dowloadFilePath = sourceFilePath.replace(".jpg", ".downloaded.jpg");
    return new Promise((resolve, reject) => {
        blobService.getBlobToLocalFile(containerName, blobName, dowloadFilePath, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Download of '${blobName}' complete` });
            }
        });
    });
};

export const list = () => {
  return new Promise((resolve, reject) => {
      blobService.listBlobsSegmented(containerName, null, (err, data) => {
          if (err) {
              reject(err);
          } else {
              resolve({ message: `Items in container '${containerName}':`, data });
          }
      });
  });
};

export const deleteImage = () => {
  return new Promise((resolve, reject) => {
      blobService.deleteBlobIfExists(containerName, blobName, err => {
          if (err) {
              reject(err);
          } else {
              resolve({ message: `Block blob '${blobName}' deleted` });
          }
      });
  });
};
