import { IHttpResponse, IQuery } from "@/interfaces";
import {
  IAdminModel,
  ICustomerModel,
  IRetailerModel,
  IRiderModel,
} from "@/models";

// TODO: Fix types
export type UserType =
  | IAdminModel
  | IRetailerModel
  | ICustomerModel
  | IRiderModel;

export type PromiseUserResponse = Promise<IHttpResponse<UserType>>;

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

export interface AuthenticateArgs {
  email: string;
  password: string;
}
export type Authenticate = (request: AuthenticateArgs) => PromiseUserResponse;

export type VerifyCustomer = (id: string) => PromiseUserResponse;
export type VerifyRetailer = (id: string) => PromiseUserResponse;


export type DeleteUser = (id: string) => PromiseUserResponse;

// TODO: Update User Repository with discriminators
// import { IHttpResponse, IQuery } from "@/interfaces";
// import {
//   IAdminModel,
//   ICustomerModel,
//   IRetailerModel,
//   IUserModel,
// } from "@/models";

// export type UserType =
//   | IUserModel
//   | IAdminModel
//   | IRetailerModel
//   | IRetailerModel
//   | ICustomerModel;
// export type UserResponse<T> = IHttpResponse<T>;
// export type PromiseUserResponse<T> = Promise<UserResponse<T>>;

// export type GetUsers = (query: IQuery) => PromiseUserResponse<UserType>;
// export type GetUserById = (id: string) => PromiseUserResponse<UserType>;
// export type CreateUser = (request: any) => PromiseUserResponse<UserType>;
// export type UpdateUser = (
//   id: string,
//   request: any
// ) => PromiseUserResponse<UserType>;

// export interface ChangePasswordArgs {
//   password: string;
// }
// export type ChangePassword = (
//   id: string,
//   request: ChangePasswordArgs
// ) => PromiseUserResponse<UserType>;

// export interface AuthenticateArgs {
//   email: string;
//   password: string;
// }
// export type Authenticate = (
//   request: AuthenticateArgs
// ) => PromiseUserResponse<UserType>;

// export type DeleteUser = (id: string) => PromiseUserResponse<UserType>;
