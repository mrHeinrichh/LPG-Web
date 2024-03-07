import { IQuery } from "@/interfaces";
import { ICartItemModel, IItemModel } from "@/models";

// Types & Interfaces
export type GetItems = (query: IQuery) => Promise<void>;
export type Increment = (item: IItemModel) => void;
export type Decrement = (item: ICartItemModel) => void;

// Actions
export interface IWalkinActions {
  getItems: GetItems;
  increment: Increment;
  decrement: Decrement;
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
