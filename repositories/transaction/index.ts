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
  AcceptDeliveryArgs,
  AcceptDelivery,
  AddFeedbackArgs,
  AddFeedback,
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

export const acceptDelivery: AcceptDelivery = async function (
  id: string,
  body: AcceptDeliveryArgs
) {
  const { data } = await patch(`transactions/${id}/accept`, body);
  return data as TransactionResponse;
};

export const addFeedback: AddFeedback = async function (
  id: string,
  body: AddFeedbackArgs
) {
  const { data } = await patch(`transactions/${id}/feedback`, body);
  return data as TransactionResponse;
};

export const deleteTransaction: DeleteTransaction = async function (
  id: string
) {
  const { data } = await remove(`transactions/${id}`);
  return data as TransactionResponse;
};

export default {
  addFeedback,
  acceptDelivery,
  approveDelivery,
  getTransactions,
  deleteTransaction,
  createTransaction,
  getTransactionbyId,
  updateTransaction,
};
