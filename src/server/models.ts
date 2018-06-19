export interface UserTableTask {
    PartitionKey: any;
    RowKey: any;
    name: string;
    username: string;
    blobId: string;
    faceId: string;
}

export interface AttemptsTableTask {
    PartitionKey: any;
    RowKey: any;
    name: string;
    username: string;
    blobId: string;
    faceId: string;
    time: string;
    isSuccessfulAttempt: boolean;
}

export interface FaceImage {
    isValidImage: boolean;
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
    faceId: string;
    hasFace: boolean;
}
