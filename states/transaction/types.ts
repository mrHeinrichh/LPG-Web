import { IQuery } from "@/interfaces";
import { ITransactionModel } from "@/models";

// Types & Interfaces
export type GetTransactions = (query: IQuery) => Promise<void>;
export type GetOverallTransactions = (query: IQuery) => Promise<void>;
export type RemoveTransaction = (id: string) => Promise<void>;
export type SetLimit = (value: number) => void;
export type NextPage = () => void;
export type PreviousPage = () => void;

// Actions
export interface ITransactionActions {
  getTransactions: GetTransactions;
  getOverallTransactions: GetOverallTransactions;
  removeTransaction: RemoveTransaction;
  setLimit: SetLimit;
  nextPage: NextPage;
  previousPage: PreviousPage;
}

// States
export interface ITransactionState {
  transactions: ITransactionModel[];
  page: number;
  limit: number;
  overallTransactions: ITransactionModel[];
}

export type TransactionStore = ITransactionActions & ITransactionState;
