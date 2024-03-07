import { get, patch, post, remove } from "@/config";
import { IQuery } from "@/interfaces";
import {
  TransactionResponse,
  CreateTransaction,
  DeleteTransaction,
  GetTransactionById,
  GetTransactions,
  UpdateTransaction,
  ApproveDelivery,
} from "./types";

export const getTransactions: GetTransactions = async function ({
  page = 1,
  limit = 10,
  filter = "{}",
  populate = "",
}: IQuery) {
  const { data } = await get(
    `transactions?page=${page}&limit=${limit}&filter=${filter}&populate=${populate}`
  );

  return data as TransactionResponse;
};

export const getTransactionbyId: GetTransactionById = async function (
  id: string
) {
  const { data } = await get(`transactions/${id}`);
  return data as TransactionResponse;
};

export const createTransaction: CreateTransaction = async function (body: any) {
  const { data } = await post(`transactions`, body);
  return data as TransactionResponse;
};

export const updateTransaction: UpdateTransaction = async function (
  id: string,
  body: any
) {
  const { data } = await patch(`transactions/${id}`, body);
  return data as TransactionResponse;
};

export const approveDelivery: ApproveDelivery = async function (id: string) {
  const { data } = await patch(`transactions/${id}/approve`, {});
  return data as TransactionResponse;
};

export const deleteTransaction: DeleteTransaction = async function (
  id: string
) {
  const { data } = await remove(`transactions/${id}`);
  return data as TransactionResponse;
};

export default {
  approveDelivery,
  getTransactions,
  deleteTransaction,
  createTransaction,
  getTransactionbyId,
  updateTransaction,
};
