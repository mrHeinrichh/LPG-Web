import { get, patch, post, remove } from "@/config";
import { IQuery } from "@/interfaces";
import {
  ItemResponse,
  CreateItem,
  DeleteItem,
  GetItemById,
  GetItems,
  UpdateItem,
} from "./types";

export const getItems: GetItems = async function ({
  page = 1,
  limit = 10,
  filter = "{}",
  populate = "",
}: IQuery) {
  const { data } = await get(
    `items?page=${page}&limit=${limit}&filter=${filter}&populate=${populate}`
  );

  return data as ItemResponse;
};

export const getItembyId: GetItemById = async function (id: string) {
  const { data } = await get(`items/${id}`);
  return data as ItemResponse;
};

export const createItem: CreateItem = async function (body: any) {
  const { data } = await post(`items`, body);
  return data as ItemResponse;
};

export const updateItem: UpdateItem = async function (id: string, body: any) {
  const { data } = await patch(`items/${id}`, body);
  return data as ItemResponse;
};

export const updatePrice: UpdateItem = async function (id: string, body: any) {
  const { data } = await patch(`items/${id}/price`, body);
  return data as ItemResponse;
};

export const deleteItem: DeleteItem = async function (id: string) {
  const { data } = await remove(`items/${id}`);
  return data as ItemResponse;
};

export default {
  getItems,
  deleteItem,
  createItem,
  getItembyId,
  updateItem,
  updatePrice,
};
