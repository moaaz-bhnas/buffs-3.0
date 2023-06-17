// Handling Axios errors => https://axios-http.com/docs/handling_errors

import { ApiError } from "@/interfaces/api-client/Error";
import { Err, err } from "neverthrow";

export default function handleApiError<TResponse>(
  error: any
): Err<TResponse, ApiError> {
  return err({
    errorMessage: error?.message,
    errorStatus: error?.response?.status,
    errorResponse: error?.response?.data,
  });
}
