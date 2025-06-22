
export type Link_DTO = {
    createdAt: string;
    status: boolean;
    userID: string | null;
    url: string;
    short: string;
    expiresAt: string;
}

export type Link_DTO_Create = {
    url: string;
}
