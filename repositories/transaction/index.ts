import { get, patch, post, remove } from "@/config";
import { IHttpResponse, IQuery } from "@/interfaces";
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
  CompleteDelivery,
  CompleteDeliveryArgs,
  DeclineDelivery,
  DeclineDeliveryArgs,
  CancelDelivery,
  CancelDeliveryArgs,
} from "./types";
import { ITransactionModel } from "@/models";

export const getTransactions = async function <T extends ITransactionModel>({
  page = 1,
  limit = 10,
  filter = "{}",
  populate = "",
}: IQuery) {
  const { data } = await get(
    `transactions?page=${page}&limit=${limit}&filter=${filter}&populate=${populate}`
  );

  return data as Promise<IHttpResponse<T>>;
};

export const getTransactionbyId = async function <T extends ITransactionModel>(
  id: string
) {
  const { data } = await get(`transactions/${id}`);
  return data as Promise<IHttpResponse<T>>;
};

export const createTransaction = async function <T extends ITransactionModel>(
  body: any
) {
  const { data } = await post(`transactions`, body);
  return data as Promise<IHttpResponse<T>>;
};

export const updateTransaction = async function <T extends ITransactionModel>(
  id: string,
  body: any
) {
  const { data } = await patch(`transactions/${id}`, body);
  return data as Promise<IHttpResponse<T>>;
};

export const approveDelivery = async function <T extends ITransactionModel>(
  id: string
) {
  const { data } = await patch(`transactions/${id}/approve`, {});
  return data as Promise<IHttpResponse<T>>;
};

export const acceptDelivery = async function <T extends ITransactionModel>(
  id: string,
  body: AcceptDeliveryArgs
) {
  const { data } = await patch(`transactions/${id}/accept`, body);
  return data as Promise<IHttpResponse<T>>;
};

export const addFeedback = async function <T extends ITransactionModel>(
  id: string,
  body: AddFeedbackArgs
) {
  const { data } = await patch(`transactions/${id}/feedback`, body);
  return data as Promise<IHttpResponse<T>>;
};

export const completeDelivery = async function <T extends ITransactionModel>(
  id: string,
  body: CompleteDeliveryArgs
) {
  const { data } = await patch(`transactions/${id}/complete`, body);
  return data as Promise<IHttpResponse<T>>;
};

export const declineDelivery = async function <T extends ITransactionModel>(
  id: string,
  body: DeclineDeliveryArgs
) {
  const { data } = await patch(`transactions/${id}/decline`, body);
  return data as Promise<IHttpResponse<T>>;
};

export const cancelDelivery = async function <T extends ITransactionModel>(
  id: string,
  body: CancelDeliveryArgs
) {
  const { data } = await patch(`transactions/${id}/cancel`, body);
  return data as Promise<IHttpResponse<T>>;
};

export const deleteTransaction = async function <T extends ITransactionModel>(
  id: string
) {
  const { data } = await remove(`transactions/${id}`);
  return data as Promise<IHttpResponse<T>>;
};

export default {
  cancelDelivery,
  declineDelivery,
  completeDelivery,
  addFeedback,
  acceptDelivery,
  approveDelivery,
  getTransactions,
  deleteTransaction,
  createTransaction,
  getTransactionbyId,
  updateTransaction,
};
