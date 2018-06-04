import * as path from "path";
import * as yargs from "yargs";
const args = yargs.argv;
import * as storage from "azure-storage";
import { create } from "domain";

const devStorageCredentials = storage.generateDevelopmentStorageCredentials();

const blobService = storage.createBlobService(devStorageCredentials);
const containerName = "image-container";
const sourceFilePath = path.resolve("../../images/landscape.jpg");
const blobName = path.basename(sourceFilePath, path.extname(sourceFilePath));

const createContainer = () => {
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

const uploadImage = () => {
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

const list = () => {
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

const deleteImage = () => {
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

const imageModule: any = {
  createContainer,
  uploadImage,
  deleteImage,
  list
};

const commandExists = () => {
    const exists = imageModule[args.command];
    return exists;
};

const executeCommand = async () => {
  const response = await imageModule[args.command]();

  console.log(response.message);

  if (response.data) {
      response.data.entries.forEach((entry: any) => {
          console.log("Name:", entry.name, " Type:", entry.blobType);
      });
  }
};

try {
  const cmd = args.command;

  console.log(`Executing '${cmd}'...`);

  if (commandExists()) {
      executeCommand();
  } else {
      console.log(`The '${cmd}' command does not exist. Try one of these:`);
      Object.keys(imageModule).forEach(key => console.log(` - ${key}`));
  }
} catch (e) {
  console.log(e);
}
