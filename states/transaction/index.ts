import { create } from "zustand";
import { TransactionStore } from "./types";
import { transactionRepository } from "@/repositories";
import { initialState } from "./initialState";

export default create<TransactionStore>((set) => {
  const getTransactions = async ({ page = 1, limit = 10 }) => {
    const { data, status } = await transactionRepository.getTransactions({
      page,
      limit,
    });
    if (status == "success") {
      return set(() => {
        return { transactions: data };
      });
    }
  };

  const getOverallTransactions = async ({ page = 0, limit = 0 }) => {
    const { data, status } = await transactionRepository.getTransactions({
      page,
      limit,
    });
    if (status == "success") {
      return set(() => {
        return { overallTransactions: data };
      });
    }
  };

  const removeTransaction = async (id: string) => {
    const { status } = await transactionRepository.deleteTransaction(id);
    if (status == "success") {
      return set((state) => ({
        transactions: [...state.transactions.filter((e: any) => e._id != id)],
      }));
    }
  };

  const setLimit = (value: number) => {
    return set(() => ({
      limit: value,
    }));
  };

  const nextPage = () => {
    return set((state) => ({
      page: state.page + 1,
    }));
  };

  const previousPage = () => {
    return set((state) => {
      if (state.page > 1) {
        return {
          page: state.page - 1,
        };
      }
      return { ...state };
    });
  };

  return {
    getTransactions,
    getOverallTransactions,
    removeTransaction,
    setLimit,
    nextPage,
    previousPage,
    ...initialState,
  };
});
