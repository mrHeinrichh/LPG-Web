import { IHttpResponse, IQuery } from "@/interfaces";
import { ITransactionModel, PaymentMethod } from "@/models";

export type TransactionResponse = IHttpResponse<ITransactionModel>;
export type PromiseTransactionResponse = Promise<TransactionResponse>;

export type GetTransactions = (query: IQuery) => PromiseTransactionResponse;
export type GetTransactionById = (id: string) => PromiseTransactionResponse;
export type CreateTransaction = (request: any) => PromiseTransactionResponse;
export type UpdateTransaction = (
  id: string,
  request: any
) => PromiseTransactionResponse;

export type ApproveDelivery = (id: string) => PromiseTransactionResponse;

export interface AcceptDeliveryArgs {
  rider: string;
}
export type AcceptDelivery = (
  id: string,
  body: AcceptDeliveryArgs
) => PromiseTransactionResponse;

export interface AddFeedbackArgs {
  // TODO: Add types
  feedback: any[];
}
export type AddFeedback = (
  id: string,
  body: AddFeedbackArgs
) => PromiseTransactionResponse;

export interface CompleteDeliveryArgs {
  // TODO: Add types
  completionImages: string[];
  paymentMethod: PaymentMethod;
}

export type CompleteDelivery = (
  id: string,
  body: CompleteDeliveryArgs
) => PromiseTransactionResponse;

// TODO: Add reason for decline
export interface DeclineDeliveryArgs {
  // TODO: Add types
}

export type DeclineDelivery = (
  id: string,
  body: DeclineDeliveryArgs
) => PromiseTransactionResponse;

export type DeleteTransaction = (id: string) => PromiseTransactionResponse;

// TODO: Add types for delivery
