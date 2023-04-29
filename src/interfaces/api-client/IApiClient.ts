import { Result } from "neverthrow";
import { RequestConfig } from "./RequestConfig";
import { APIError } from "./Error";

export interface IApiClient {
  get<TResponse>(path: string): Promise<Result<TResponse, APIError>>;
  post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: RequestConfig
  ): Promise<Result<TResponse, APIError>>;
  put<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<Result<TResponse, APIError>>;
}
