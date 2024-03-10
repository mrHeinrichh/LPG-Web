// Your Zustand store
import create from 'zustand';
import { CheckoutStore, CreateTransaction, ICreateTransactionArgs } from './types';
import { transactionRepository } from '@/repositories';
import { initialState } from './initialState';

export default create<CheckoutStore>((set) => {
  const createTransaction: CreateTransaction = async (body: ICreateTransactionArgs) => {
    const { status } = await transactionRepository.createTransaction({
      ...body,
      discounted:true,
      priceType: 'Customer',
      completed: true,
    });

    if (status === 'success') {
      return set(() => ({ createSuccess: true }));
    }
  };

  const setFormData = (body: any) => {
    return set((state) => ({
      ...state,
      ...body,
    }));
  };

  const setDiscounted = (value: boolean) => {
    console.log('Discounted:', value); // Log the discounted state
    set(() => ({
      discounted: value,
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
