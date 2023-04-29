import { AxiosResponse } from "axios";

export interface APIError {
  errorMessage?: string;
  errorStatus?: number;
  errorResponse?: AxiosResponse;
}
