export interface TableTask {
    PartitionKey: any;
    RowKey: any;
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
