import * as storage from "azure-storage";
import * as uuid from "uuid";
import { UserDetails, TableTask } from "./models";
import { userInfo } from "os";
import { retrieveBlobUrl } from "./blobStorage";

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
    const task: TableTask = {
        PartitionKey: entityGenerator.String("users"),
        RowKey: entityGenerator.String(`${uuid.v1()}`),
        name: userDetails.name,
        username: userDetails.username,
        blobId: userDetails.blobId,
        faceId: userDetails.faceId
    };

    await blobService.insertEntity(tableName, task, (error) => {
        if (error) {
            throw(error);
        } else {
            console.log(`Added ${task.username} to the ${tableName} table`);
        }
    });
};

export const checkUserExists = async (userDetails: UserDetails) => {
    const query = new storage.TableQuery()
        .select()
        .where("name eq ?string? and username eq ?string?", userDetails.name, userDetails.username);
    return new Promise((resolve, reject) => {
        blobService.queryEntities(tableName, query, null, async (error, queryResult) => {
            if (error) {
                reject(error);
            } else {
                try {
                    resolve(queryResult.entries.length);
                } catch (err) {
                    console.error(err);
                    reject(err);
                }
            }
        });
    });
};
