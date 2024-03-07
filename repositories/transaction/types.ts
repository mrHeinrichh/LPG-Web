import { IHttpResponse, IQuery } from "@/interfaces";
import { ITransactionModel } from "@/models";

export type TransactionResponse = IHttpResponse<ITransactionModel>;
export type PromiseTransactionResponse = Promise<TransactionResponse>;

export type GetTransactions = (query: IQuery) => PromiseTransactionResponse;
export type GetTransactionById = (id: string) => PromiseTransactionResponse;
export type CreateTransaction = (request: any) => PromiseTransactionResponse;
export type UpdateTransaction = (
  id: string,
  request: any
) => PromiseTransactionResponse;
export type DeleteTransaction = (id: string) => PromiseTransactionResponse;
