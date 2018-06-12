import * as storage from "azure-storage";
import * as uuid from "uuid";
import { UserDetails } from "./models";

const devStorageCredentials = storage.generateDevelopmentStorageCredentials();

const blobService = storage.createTableService(devStorageCredentials);
const tableName = "usertable";
const entityGenerator = storage.TableUtilities.entityGenerator;

export const createTableIfNotExists = async () => {
    await blobService.createTableIfNotExists(tableName, (error, result) => {
        if (error) {
            throw(error);
        } else {
            console.log(`Table ${result.TableName} ${result.created ? "created" : "already exists" }`);
        }
    });
};

export const uploadUser = async (userDetails: UserDetails) => {
    const task = {
        PartitionKey: entityGenerator.String("users"),
        RowKey: entityGenerator.String(`${uuid.v1()}`),
        name: userDetails.name,
        username: userDetails.username,
        blobId: userDetails.blobId
    };

    await blobService.insertEntity(tableName, task, (error) => {
        if (error) {
            throw(error);
        } else {
            console.log(`Added ${task.username} to the ${tableName} table`);
        }
    });
};
