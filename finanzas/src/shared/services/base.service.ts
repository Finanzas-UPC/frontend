import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

export class BaseService<T = any> {
    private readonly endpoint: string;
    protected token: string | null;
    protected httpOptions: AxiosRequestConfig;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.token = localStorage.getItem("token");
        this.httpOptions = this.getHttpOptions();
    }

    protected setToken(): void {
        this.token = localStorage.getItem("token");
        this.httpOptions = this.getHttpOptions();
    }

    protected getHttpOptions(): AxiosRequestConfig {
        return {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        };
    }

    protected endpointPath(): string {
        return `${BASE_API_URL}/${this.endpoint}`;
    }

    getOne(id: string | number): Promise<AxiosResponse<T>> {
        this.setToken();
        return axios.get(`${this.endpointPath()}/${id}`, this.httpOptions);
    }

    getAll(): Promise<AxiosResponse<T[]>> {
        this.setToken();
        return axios.get(this.endpointPath(), this.httpOptions);
    }

    create(data: T): Promise<AxiosResponse<T>> {
        this.setToken();
        return axios.post(this.endpointPath(), data, this.httpOptions);
    }

    update(id: string | number, data: T): Promise<AxiosResponse<T>> {
        this.setToken();
        return axios.put(`${this.endpointPath()}/${id}`, data, this.httpOptions);
    }

    patch(id: string | number, data: Partial<T>): Promise<AxiosResponse<T>> {
        this.setToken();
        return axios.patch(`${this.endpointPath()}/${id}`, data, this.httpOptions);
    }

    delete(id: string | number): Promise<AxiosResponse<void>> {
        this.setToken();
        return axios.delete(`${this.endpointPath()}/${id}`, this.httpOptions);
    }
}