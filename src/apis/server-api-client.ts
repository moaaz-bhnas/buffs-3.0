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
import { SignoutResponse } from "@/interfaces/server/SignoutResponse";
import { GetReviewsResponse } from "@/interfaces/server/GetReviewsResponse";
import isServer from "@/helpers/environment/isServer";
import { UpdateReviewRequest } from "@/interfaces/server/UpdateReviewRequest";
import { ReviewResponse } from "@/interfaces/server/ReviewResponse";

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

  /**
   * @param {string} token required only in server code
   * as in the client (browser) all cookies are sent with each request
   */
  async getUserByToken(token?: string): Promise<Result<DBUser, ApiError>> {
    if (isServer() && !token) {
      return err({
        errorMessage:
          "Dear developer, you need to pass the auth token if the function is run in the server",
      });
    }

    const config = token ? { headers: { Cookie: `token=${token}` } } : {};

    const result = await this.serverApiClient.get<GetUserByTokenResponse>(
      `${this.apiBaseUrl}/v${this.apiVersion}/auth/me`,
      config
    );

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    return ok(result.value.data);
  }

  async getUsersByIds(usersIds: string[]): Promise<Result<DBUser[], ApiError>> {
    const result = await this.serverApiClient.get<GetUsersResponse>(
      `${this.apiBaseUrl}/v${this.apiVersion}/users?_id[in]=${usersIds.join(
        ","
      )}`
    );

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    return ok(result.value.data);
  }

  async getUserByEmail(email: string): Promise<Result<DBUser, ApiError>> {
    const result = await this.serverApiClient.get<GetUsersResponse>(
      `${this.apiBaseUrl}/v${this.apiVersion}/users?email=${email}`
    );

    if (result.isErr()) {
      return err(result.error);
    }

    if (result.value.data.length === 0) {
      return err({
        errorMessage: `User with email ${email} doesn't exist`,
      });
    }

    return ok(result.value.data[0]);
  }

  async getUserByUsername(username: string): Promise<Result<DBUser, ApiError>> {
    const result = await this.serverApiClient.get<GetUsersResponse>(
      `${this.apiBaseUrl}/v${this.apiVersion}/users?username=${username}`
    );

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    if (result.value.data.length === 0) {
      return err({
        errorMessage: `User with username ${username} doesn't exist`,
      });
    }

    return ok(result.value.data[0]);
  }

  /**
   * @param {string} token required only in server code
   * as in the client (browser) all cookies are sent with each request
   */
  async getReviews(token?: string): Promise<Result<DBReview[], ApiError>> {
    if (isServer() && !token) {
      return err({
        errorMessage:
          "Dear developer, you need to pass the auth token if the function is run in the server",
      });
    }

    const config = token ? { headers: { Cookie: `token=${token}` } } : {};

    const result = await this.serverApiClient.get<GetReviewsResponse>(
      `${this.apiBaseUrl}/v${this.apiVersion}/reviews?isDeleted=false&sort=-_id`,
      config
    );

    if (result.isErr()) {
      return err(result.error);
    }

    return ok(result.value.data);
  }

  /**
   *
   * @param {string} token required only in server code
   * as in the client (browser) all cookies are sent with each request
   */
  async getReviewsByUsername(
    username: string,
    token?: string
  ): Promise<Result<DBReview[], ApiError>> {
    if (isServer() && !token) {
      return err({
        errorMessage:
          "Dear developer, you need to pass the auth token if the function is run in the server",
      });
    }

    const config = token ? { headers: { Cookie: `token=${token}` } } : {};

    const result = await this.serverApiClient.get<GetReviewsResponse>(
      `${this.apiBaseUrl}/v${this.apiVersion}/reviews?username=${username}&isDeleted=false&sort=-_id`,
      config
    );

    if (result.isErr()) {
      return err(result.error);
    }

    return ok(result.value.data);
  }

  async createReview(
    review: RegisteringReview
  ): Promise<Result<DBReview, ApiError>> {
    const result = await this.serverApiClient.post<
      RegisteringReview,
      ReviewResponse
    >(`${this.apiBaseUrl}/v${this.apiVersion}/reviews`, review);

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    return ok(result.value.data);
  }

  async updateReview(
    reviewId: string,
    updatedFields: UpdateReviewRequest
  ): Promise<Result<DBReview, ApiError>> {
    const result = await this.serverApiClient.put<
      UpdateReviewRequest,
      ReviewResponse
    >(
      `${this.apiBaseUrl}/v${this.apiVersion}/reviews/${reviewId}`,
      updatedFields
    );

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    return ok(result.value.data);
  }

  async deleteReview(reviewId: string): Promise<Result<DBReview, ApiError>> {
    const result = await this.serverApiClient.delete<ReviewResponse>(
      `${this.apiBaseUrl}/v${this.apiVersion}/reviews/${reviewId}`
    );

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    return ok(result.value.data);
  }

  async likeReview(reviewId: string): Promise<Result<DBReview, ApiError>> {
    const result = await this.serverApiClient.put<{}, ReviewResponse>(
      `${this.apiBaseUrl}/v${this.apiVersion}/reviews/${reviewId}/like`,
      {}
    );

    if (result.isErr()) {
      console.error(result.error.errorMessage, { error: result.error });
      return err(result.error);
    }

    return ok(result.value.data);
  }
}
