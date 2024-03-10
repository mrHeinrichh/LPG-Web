import { IQuery } from "@/interfaces";
import { ICartItemModel, IItemModel } from "@/models";

export interface ICreateTransactionArgs {
  name: string;
  contactNumber: string;
  // discountIdImage: string | null;
  discounted: boolean; 
  items: ICartItemModel[];
}
// Types & Interfaces
export type CreateTransaction = (body: ICreateTransactionArgs) => Promise<void>;
export type Increment = (item: IItemModel) => void;
export type Decrement = (item: ICartItemModel) => void;
// TODO: Add types
export type SetFormData = (data: any) => void;
export type SetDiscounted = (value: boolean) => void;
export type ResetCheckout = () => void;

// Actions
export interface ICheckoutActions {
  createTransaction: CreateTransaction;
  setFormData: SetFormData;
  setDiscounted: SetDiscounted;
  resetCheckout: ResetCheckout;
}

// States
export interface ICheckoutState {
  name: string;
  contactNumber: string;
  discounted: boolean;
  createSuccess: boolean;
}

export type CheckoutStore = ICheckoutActions & ICheckoutState;
