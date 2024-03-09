import { ITransactionState } from "./types";

export const initialState: ITransactionState = {
  transactions: [],
  page: 1,
  limit: 10,
  overallTransactions: [],
};
