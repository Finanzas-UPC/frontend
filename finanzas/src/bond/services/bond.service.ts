import type { AxiosResponse } from "axios";
import { BaseService } from "../../shared/services/base.service";
import type { Bond } from "../models/bond.entity";
import axios from "axios";

class BondService extends BaseService<Bond> {
    constructor() {
        super("bonds");
    }

    getByUserId(userId: number): Promise<AxiosResponse<Bond[]>> {
        this.setToken();
        return axios.get<Bond[]>(`${this.endpointPath()}/user/${userId}`, this.httpOptions);
    }

    getCashflowByBondId(id: number): Promise<AxiosResponse<any>> {
        this.setToken();
        return axios.get<any>(`${this.endpointPath()}/${id}/cashflow`, this.httpOptions);
    }

    getMetricsByBondId(id: number): Promise<AxiosResponse<any>> {
        this.setToken();
        return axios.get<any>(`${this.endpointPath()}/${id}/metrics`, this.httpOptions);
    }
}

export const bondService = new BondService();