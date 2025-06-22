export type UserParams = {
    username: string;
    email: string;
    password: string;
}
export type jwtClaim = {
    ID: string; // User ID
    iat: number; // Issued at timestamp
    exp: number; // Expiration timestamp
}
