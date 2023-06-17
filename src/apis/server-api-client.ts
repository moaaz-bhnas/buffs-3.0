import { ApiError } from "@/interfaces/api-client/Error";
import { IApiClient } from "@/interfaces/api-client/IApiClient";
import { DBUser, RegisteringDBUser } from "@/interfaces/database/User";
import { AuthResponse } from "@/interfaces/server/AuthResponse";
import { GetUsersResponse } from "@/interfaces/server/GetUsersResponse";
import ApiClient from "@/helpers/api-client/apiClient";
import { Result, err, ok } from "neverthrow";
import { SigninRequest } from "@/interfaces/server/SigninRequest";

export class ServerApiClient {
  private readonly apiBaseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;
  private readonly apiVersion = 1;
  private serverApiClient: IApiClient = new ApiClient({});

  async signin(
    credenials: SigninRequest
  ): Promise<Result<AuthResponse, ApiError>> {
    const result = await this.serverApiClient.post<SigninRequest, AuthResponse>(
      `${this.apiBaseUrl}/v${this.apiVersion}/auth/login`,
      credenials
    );

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    return ok(result.value);
  }

  async signup(
    user: RegisteringDBUser
  ): Promise<Result<AuthResponse, ApiError>> {
    const result = await this.serverApiClient.post<
      RegisteringDBUser,
      AuthResponse
    >(`${this.apiBaseUrl}/v${this.apiVersion}/auth/register`, user);

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    return ok(result.value);
  }

  async getUserByEmail(email: string): Promise<Result<DBUser[], ApiError>> {
    const result = await this.serverApiClient.get<GetUsersResponse>(
      `${this.apiBaseUrl}/v${this.apiVersion}/users?email=${email}`
    );

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    return ok(result.value.data);
  }

  async getUserByUsername(
    username: string
  ): Promise<Result<DBUser[], ApiError>> {
    const result = await this.serverApiClient.get<GetUsersResponse>(
      `${this.apiBaseUrl}/v${this.apiVersion}/users?username=${username}`
    );

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    return ok(result.value.data);
  }
}
