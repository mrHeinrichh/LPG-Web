import { get, patch, post, remove } from "@/config";
import { IHttpResponse, IQuery } from "@/interfaces";
import { ChangePasswordArgs, AuthenticateArgs } from "./types";
import { IUserModel } from "@/models";

export const getUsers = async function <T extends IUserModel>({
  page = 1,
  limit = 10,
  filter = "{}",
  populate = "",
}: IQuery) {
  console.log(
    `users?page=${page}&limit=${limit}&filter=${filter}&populate=${populate}`
  );

  const { data } = await get(
    `users?page=${page}&limit=${limit}&filter=${filter}&populate=${populate}`
  );

  return data as Promise<IHttpResponse<T>>;
};

export const getUserbyId = async function <T extends IUserModel>(id: string) {
  const { data } = await get(`users/${id}`);
  return data as Promise<IHttpResponse<T>>;
};

export const createUser = async function <T extends IUserModel>(body: any) {
  const { data } = await post(`users`, body);
  return data as Promise<IHttpResponse<T>>;
};

export const updateUser = async function <T extends IUserModel>(
  id: string,
  body: any
) {
  const { data } = await patch(`users/${id}`, body);
  return data as Promise<IHttpResponse<T>>;
};

export const authenticate = async function <T extends IUserModel>(
  body: AuthenticateArgs
) {
  const { data } = await patch(`users/authenticate`, body);
  return data as Promise<IHttpResponse<T>>;
};

export const verifyCustomer = async function <T extends IUserModel>(
  id: string
) {
  const { data } = await patch(`users/${id}/verify`, {});
  return data as Promise<IHttpResponse<T>>;
};

export const changePassword = async function <T extends IUserModel>(
  id: string,
  body: ChangePasswordArgs
) {
  const { data } = await patch(`users/${id}/password`, body);
  return data as Promise<IHttpResponse<T>>;
};

export const deleteUser = async function <T extends IUserModel>(id: string) {
  const { data } = await remove(`users/${id}`);
  return data as Promise<IHttpResponse<T>>;
};

export default {
  authenticate,
  changePassword,
  verifyCustomer,
  getUsers,
  deleteUser,
  createUser,
  getUserbyId,
  updateUser,
};
