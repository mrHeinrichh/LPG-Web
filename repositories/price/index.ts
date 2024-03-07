import { get, patch, post, remove } from "@/config";
import { IQuery } from "@/interfaces";
import {
  PriceResponse,
  CreatePrice,
  DeletePrice,
  GetPriceById,
  GetPrices,
  UpdatePrice,
} from "./types";

export const getPrices: GetPrices = async function ({
  page = 1,
  limit = 10,
  filter = "{}",
  populate = "",
}: IQuery) {
  const { data } = await get(
    `prices?page=${page}&limit=${limit}&filter=${filter}&populate=${populate}`
  );

  return data as PriceResponse;
};

export const getPricebyId: GetPriceById = async function (id: string) {
  const { data } = await get(`prices/${id}`);
  return data as PriceResponse;
};

export const createPrice: CreatePrice = async function (body: any) {
  const { data } = await post(`prices`, body);
  return data as PriceResponse;
};

export const updatePrice: UpdatePrice = async function (id: string, body: any) {
  const { data } = await patch(`prices/${id}`, body);
  return data as PriceResponse;
};

export const deletePrice: DeletePrice = async function (id: string) {
  const { data } = await remove(`prices/${id}`);
  return data as PriceResponse;
};

export default {
  getPrices,
  deletePrice,
  createPrice,
  getPricebyId,
  updatePrice,
};
