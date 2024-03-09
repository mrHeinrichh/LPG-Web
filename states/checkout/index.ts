import { create } from "zustand";
import {
  CheckoutStore,
  CreateTransaction,
  ICreateTransactionArgs,
} from "./types";
import { transactionRepository } from "@/repositories";
import { initialState } from "./initialState";

export default create<CheckoutStore>((set) => {
  const createTransaction: CreateTransaction = async (
    body: ICreateTransactionArgs
  ) => {
    const { status } = await transactionRepository.createTransaction({
      ...body,
      priceType: "Customer",
    });

    if (status === "success") {
      return set(() => ({ createSuccess: true }));
    }
  };

  const setFormData = (body: any) => {
    return set((state) => ({
      ...{ name: state.name, contactNumber: state.contactNumber },
      ...body,
    }));
  };

  const setDiscounted = (value: boolean) => {
    return set(() => ({
      discountIdImage: value,
    }));
  };
  const resetCheckout = () => {
    return set(() => ({
      ...initialState,
    }));
  };
  return {
    resetCheckout,
    setDiscounted,
    setFormData,
    createTransaction,
    ...initialState,
  };
});
