import { get, patch, post, remove } from "@/config";
import { IQuery } from "@/interfaces";
import {
  UserResponse,
  CreateUser,
  DeleteUser,
  GetUserById,
  GetUsers,
  UpdateUser,
} from "./types";

export const getUsers: GetUsers = async function ({
  page = 1,
  limit = 10,
  filter = "{}",
  populate = "",
}: IQuery) {
  const { data } = await get(
    `transactions?page=${page}&limit=${limit}&filter=${filter}&populate=${populate}`
  );

  return data as UserResponse;
};

export const getUserbyId: GetUserById = async function (id: string) {
  const { data } = await get(`transactions/${id}`);
  return data as UserResponse;
};

export const createUser: CreateUser = async function (body: any) {
  const { data } = await post(`transactions`, body);
  return data as UserResponse;
};

export const updateUser: UpdateUser = async function (id: string, body: any) {
  const { data } = await patch(`transactions/${id}`, body);
  return data as UserResponse;
};

export const deleteUser: DeleteUser = async function (id: string) {
  const { data } = await remove(`transactions/${id}`);
  return data as UserResponse;
};

export default {
  getUsers,
  deleteUser,
  createUser,
  getUserbyId,
  updateUser,
};
