export interface TableTask {
    PartitionKey: EntityProperty<string>;
    RowKey: EntityProperty<string>;
    name: string;
    username: string;
    blobId: string;
    faceId: string;
}

export interface UserDetails {
    name: string;
    username: string;
    blobId: string;
    faceId: string;
}

export interface PhotoBlob {
    blobId: string;
    text: string;
}

export interface JsonBlobData {
    blobId: string;
    imageUrl: {};
}
