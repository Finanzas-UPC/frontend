import axios, { type AxiosResponse } from "axios";
import { BaseService } from "./base.service";

export class UserService extends BaseService {
    constructor() {
        super("users");
    }

    getUserDetails(userId: number): Promise<AxiosResponse> {
        this.setToken();
        return axios.get(`${this.endpointPath()}/${userId}`, this.httpOptions);
    }
}