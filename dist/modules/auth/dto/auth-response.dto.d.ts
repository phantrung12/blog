declare class UserResponseDto {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class AuthResponseDto {
    accessToken: string;
    tokenType: string;
    expiresIn: string;
    user: UserResponseDto;
}
export declare class ProfileResponseDto {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class MessageResponseDto {
    message: string;
}
export {};
