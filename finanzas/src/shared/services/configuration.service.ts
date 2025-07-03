import {BaseService} from "./base.service.ts";
import type {Configuration} from "../models/configuration.entity.ts";
import axios, {type AxiosResponse} from "axios";

class ConfigurationService extends BaseService<Configuration> {
    constructor() {
        super("configuration");
    }

    getByUserId(userId: number): Promise<AxiosResponse<Configuration>> {
        this.setToken();
        return axios.get<Configuration>(`${this.endpointPath()}/user/${userId}`, this.httpOptions);
    }
}

export const configurationService = new ConfigurationService();