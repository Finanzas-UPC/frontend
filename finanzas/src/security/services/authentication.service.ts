import axios, { type AxiosResponse } from "axios";
import { BaseService } from "../../shared/services/base.service";
import type {SignUpRequest, UserCredentials} from "../models/auth.entity.ts";

export class AuthenticationService extends BaseService {
    constructor() {
        super("authentication");
    }

    signUp(username: string, password: string): Promise<AxiosResponse> {
        const user: SignUpRequest = {
            username,
            password,
            roles: ["ROLE_USER"]
        };
        return axios.post(`${this.endpointPath()}/sign-up`, user);
    }

    signIn(username: string, password: string): Promise<AxiosResponse> {
        const user: UserCredentials = {
            username,
            password
        };
        return axios.post(`${this.endpointPath()}/sign-in`, user);
    }
}
