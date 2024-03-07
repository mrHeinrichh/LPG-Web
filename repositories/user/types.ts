import { IHttpResponse, IQuery } from "@/interfaces";
import { IUserModel } from "@/models";

export type UserResponse = IHttpResponse<IUserModel>;
export type PromiseUserResponse = Promise<UserResponse>;

export type GetUsers = (query: IQuery) => PromiseUserResponse;
export type GetUserById = (id: string) => PromiseUserResponse;
export type CreateUser = (request: any) => PromiseUserResponse;
export type UpdateUser = (id: string, request: any) => PromiseUserResponse;

export interface ChangePasswordArgs {
  password: string;
}
export type ChangePassword = (
  id: string,
  request: ChangePasswordArgs
) => PromiseUserResponse;
export type DeleteUser = (id: string) => PromiseUserResponse;
