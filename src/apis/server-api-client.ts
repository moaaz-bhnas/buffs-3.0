import { ApiError } from "@/interfaces/api-client/Error";
import { DBUser, RegisteringDBUser } from "@/interfaces/database/DBUser";
import { AuthResponse } from "@/interfaces/server/AuthResponse";
import { GetUsersResponse } from "@/interfaces/server/GetUsersResponse";
import ApiClient from "@/helpers/api-client/apiClient";
import { Result, err, ok } from "neverthrow";
import { SigninRequest } from "@/interfaces/server/SigninRequest";
import { GetUserByTokenResponse } from "@/interfaces/server/GetUserByTokenResponse";
import { RegisteringReview } from "@/interfaces/database/RegisteringReview";
import { DBReview } from "@/interfaces/database/DBReview";
import { CreateReviewResponse } from "@/interfaces/server/CreateReviewResponse";
import { SignoutResponse } from "@/interfaces/server/SignoutResponse";
import { GetReviewsResponse } from "@/interfaces/server/GetReviewsResponse";

export class ServerApiClient {
  private readonly apiBaseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;
  private readonly apiVersion = 1;
  private readonly serverApiClient = new ApiClient({ withCredentials: true });

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

  async signout(): Promise<Result<SignoutResponse, ApiError>> {
    const result = await this.serverApiClient.get<SignoutResponse>(
      `${this.apiBaseUrl}/v${this.apiVersion}/auth/logout`
    );

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    return ok(result.value);
  }

  async getUserByToken(token: string): Promise<Result<DBUser, ApiError>> {
    const result = await this.serverApiClient.get<GetUserByTokenResponse>(
      `${this.apiBaseUrl}/v${this.apiVersion}/auth/me`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    return ok(result.value.data);
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

  async getReviews(token: string): Promise<Result<DBReview[], ApiError>> {
    const result = await this.serverApiClient.get<GetReviewsResponse>(
      `${this.apiBaseUrl}/v${this.apiVersion}/reviews?sort=-_id`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    return ok(result.value.data);
  }

  async createReview(
    review: RegisteringReview
  ): Promise<Result<DBReview, ApiError>> {
    const result = await this.serverApiClient.post<
      RegisteringReview,
      CreateReviewResponse
    >(`${this.apiBaseUrl}/v${this.apiVersion}/reviews`, review);

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    return ok(result.value.data);
  }
}
