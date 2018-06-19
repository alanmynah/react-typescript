import * as storage from "azure-storage";
import * as uuid from "uuid";
import { UserDetails, UserTableTask, AttemptsTableTask } from "./models";
import Axios from "axios";

const devStorageCredentials = storage.generateDevelopmentStorageCredentials();

const blobService = storage.createTableService(devStorageCredentials);
const userTable = "usertable";
const attemptsTable = "attemptstable";
const entityGenerator = storage.TableUtilities.entityGenerator;

export const createTableIfNotExists = async () => {
    await blobService.createTableIfNotExists(userTable, (error, result) => {
        if (error) {
            throw(error);
        } else {
            console.log(`Table ${result.TableName} ${result.created ? "created" : "already exists" }`);
        }
    });
    await blobService.createTableIfNotExists(attemptsTable, (error, result) => {
        if (error) {
            throw(error);
        } else {
            console.log(`Table ${result.TableName} ${result.created ? "created" : "already exists" }`);
        }
    });
};

export const uploadUser = async (userDetails: UserDetails) => {
    const task: UserTableTask = {
        PartitionKey: entityGenerator.String("users"),
        RowKey: entityGenerator.String(`${uuid.v1()}`),
        name: userDetails.name,
        username: userDetails.username,
        blobId: userDetails.blobId,
        faceId: userDetails.faceId
    };

    await blobService.insertEntity(userTable, task, (error) => {
        if (error) {
            throw(error);
        } else {
            console.log(`Added ${task.username} to the ${userTable} table`);
        }
    });
};

export const recordAttempt = async (userDetails: UserDetails, isSuccessfulAttempt: boolean) => {
    const task: AttemptsTableTask = {
        PartitionKey: entityGenerator.String("users"),
        RowKey: entityGenerator.String(`${uuid.v1()}`),
        name: userDetails.name,
        username: userDetails.username,
        blobId: userDetails.blobId,
        faceId: userDetails.faceId,
        time: new Date().toString(),
        isSuccessfulAttempt
    };

    await blobService.insertEntity(attemptsTable, task, (error) => {
        if (error) {
            throw(error);
        } else {
            console.log(`Added ${task.username} to the ${attemptsTable} table`);
        }
    });
};

export const checkUserExists = async (userDetails: UserDetails) => {
    const query = new storage.TableQuery()
        .select()
        .where("name eq ?string? and username eq ?string?", userDetails.name, userDetails.username);
    return new Promise((resolve, reject) => {
        blobService.queryEntities(userTable, query, null, async (error, queryResult) => {
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
