import { IQuery } from "@/interfaces";
import {
  ICartItemModel,
  ICustomerModel,
  IItemModel,
  IPriceModel,
} from "@/models";

// Types & Interfaces
export type GetPrices = (query: IQuery) => Promise<void>;
export type GetTotalRevenueToday = (query: IQuery) => Promise<void>;
// export type GetItems = (query: IQuery) => Promise<void>;
export type PriceNext = () => void;
export type PriceBack = () => void;
export type SetPriceLimit = (value: number) => void;
export type GetVerifiedCustomers = () => void;

// Actions
export interface IHomeActions {
  getPrices: GetPrices;
  priceNext: PriceNext;
  priceBack: PriceBack;
  setPriceLimit: SetPriceLimit;
  getTotalRevenueToday: GetTotalRevenueToday;
  getVerifiedCustomers: GetVerifiedCustomers;
}

// States
export interface IHomeState {
  prices: IPriceModel<IItemModel>[];
  verifiedCustomers: ICustomerModel[];
  pricePage: number;
  priceLimit: number;
  revenueToday: number;
}

export type HomeStore = IHomeActions & IHomeState;
