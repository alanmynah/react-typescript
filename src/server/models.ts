export interface UserDetails {
    name: string;
    username: string;
    blobId: string;
}

export interface PhotoBlob {
    blobId: string;
    text: string;
}

export interface JsonBlobData {
    blobId: string;
    imageUrl: {};
}
