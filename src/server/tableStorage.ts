import * as path from "path";
import * as storage from "azure-storage";
import { UserDetails } from "./models";

const devStorageCredentials = storage.generateDevelopmentStorageCredentials();

const blobService = storage.createTableService(devStorageCredentials);
const tableName = "user-table";
const entityGenerator = storage.TableUtilities.entityGenerator;

const createTableIfNotExists = async () => {
    await blobService.createTableIfNotExists(tableName, err => {
        if (err) {
            throw(err);
        } else {
            console.log(`Container ${tableName} created`);
        }
    });
};

export const uploadUser = async (userDetails: UserDetails) => {
    await createTableIfNotExists();
    const task = {
        PartitionKey: entityGenerator.String("users"),
        RowKey: entityGenerator.Guid,
        name: userDetails.name,
        username: userDetails.username
    };

    await blobService.insertEntity(tableName, task, {echoContent: true}, (error, result, response) => {
        if (!error) {
            console.log(`Added ${task.username} to the ${task.PartitionKey} table`);
        }});
};
