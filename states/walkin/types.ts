import { IQuery } from "@/interfaces";
import { ICartItemModel, IItemModel } from "@/models";

// Types & Interfaces
export type GetItems = (query: IQuery) => Promise<void>;
export type Increment = (item: IItemModel) => void;
export type Decrement = (item: ICartItemModel) => void;
export type Reset = () => void;

// Actions
export interface IWalkinActions {
  getItems: GetItems;
  increment: Increment;
  decrement: Decrement;
  reset: Reset;
}

// States
export interface IWalkinState {
  brandNewTanks: IItemModel[];
  refillTanks: IItemModel[];
  accessories: IItemModel[];
  cartItems: ICartItemModel[];
  total: number;
}

export type WalkinStore = IWalkinActions & IWalkinState;
