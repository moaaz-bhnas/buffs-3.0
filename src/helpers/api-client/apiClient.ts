import { ApiError } from "@/interfaces/api-client/Error";
import handleApiError from "@/helpers/api-client/handleApiError";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import axiosRetry, { IAxiosRetryConfig } from "axios-retry";
import { Result, ok } from "neverthrow";

export default class ApiClient {
  private client: AxiosInstance;

  constructor(requestConfig: AxiosRequestConfig = {}) {
    this.client = this.createAxiosClient(requestConfig);
  }

  private createAxiosClient(requestConfig: AxiosRequestConfig): AxiosInstance {
    const axiosClient = axios.create({
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10 * 1000,
      ...requestConfig,
    });

    this.setRetryConfiguration(axiosClient);

    return axiosClient;
  }

  private setRetryConfiguration(apiClient: AxiosInstance): void {
    const retryConfig: IAxiosRetryConfig = {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) => {
        if (error.response) {
          if (error.response.status === 500) {
            return true;
          }
        }

        return false;
      },
    };

    axiosRetry(apiClient, retryConfig);
  }

  async get<TResponse>(
    path: string,
    config: AxiosRequestConfig<any> = { headers: {} }
  ): Promise<Result<TResponse, ApiError>> {
    try {
      const response = await this.client.get<TResponse>(path, config);
      return ok(response.data);
    } catch (error: any) {
      return handleApiError<TResponse>(error);
    }
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config: AxiosRequestConfig<any> = { headers: {} }
  ): Promise<Result<TResponse, ApiError>> {
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
  ): Promise<Result<TResponse, ApiError>> {
    try {
      const response = await this.client.put<TResponse>(path, payload);
      return ok(response.data);
    } catch (error) {
      return handleApiError<TResponse>(error);
    }
  }

  async delete<TResponse>(
    path: string,
    config: AxiosRequestConfig<any> = { headers: {} }
  ): Promise<Result<TResponse, ApiError>> {
    try {
      const response = await this.client.delete<TResponse>(path, config);
      return ok(response.data);
    } catch (error) {
      return handleApiError<TResponse>(error);
    }
  }
}
