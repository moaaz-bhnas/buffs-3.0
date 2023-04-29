import { ApiConfiguration } from "@/interfaces/api-client/ApiConfiguration";
import { APIError } from "@/interfaces/api-client/Error";
import { IApiClient } from "@/interfaces/api-client/IApiClient";
import { RequestConfig } from "@/interfaces/api-client/RequestConfig";
import handleApiError from "@/utils/api-client/handleApiError";
import axios, { AxiosInstance } from "axios";
import { Result, ok } from "neverthrow";

export default class ApiClient implements IApiClient {
  private client: AxiosInstance;

  protected createAxiosClient(
    apiConfiguration: ApiConfiguration
  ): AxiosInstance {
    return axios.create({
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        ...(apiConfiguration.accessToken && {
          Authorization: `Token ${apiConfiguration.accessToken}`,
        }),
      },
      timeout: 10 * 1000,
    });
  }

  constructor(apiConfiguration: ApiConfiguration) {
    this.client = this.createAxiosClient(apiConfiguration);
  }

  async get<TResponse>(path: string): Promise<Result<TResponse, APIError>> {
    try {
      const response = await this.client.get<TResponse>(path);
      return ok(response.data);
    } catch (error: any) {
      return handleApiError<TResponse>(error);
    }
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config: RequestConfig = { headers: {} }
  ): Promise<Result<TResponse, APIError>> {
    try {
      const response = await this.client.post<TResponse>(path, payload, config);
      return ok(response.data);
    } catch (error) {
      return handleApiError<TResponse>(error);
    }
  }

  async put<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<Result<TResponse, APIError>> {
    try {
      const response = await this.client.put<TResponse>(path, payload);
      return ok(response.data);
    } catch (error) {
      return handleApiError<TResponse>(error);
    }
  }
}
