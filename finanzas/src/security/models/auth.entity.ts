export interface UserCredentials {
    username: string;
    password: string;
}

export interface SignUpRequest extends UserCredentials {
    roles: string[];
}

export interface LoginResponse {
    token: string;
    userId: string;
    username: string;
}