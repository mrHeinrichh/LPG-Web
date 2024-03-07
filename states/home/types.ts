import { IQuery } from "@/interfaces";
import { ICartItemModel, IItemModel, IPriceModel } from "@/models";

// Types & Interfaces
export type GetPrices = (query: IQuery) => Promise<void>;
export type GetTotalRevenueToday = (query: IQuery) => Promise<void>;
// export type GetItems = (query: IQuery) => Promise<void>;
export type PriceNext = () => void;
export type PriceBack = () => void;
export type SetPriceLimit = (value: number) => void;

// Actions
export interface IHomeActions {
  getPrices: GetPrices;
  priceNext: PriceNext;
  priceBack: PriceBack;
  setPriceLimit: SetPriceLimit;
  getTotalRevenueToday: GetTotalRevenueToday;
}

// States
export interface IHomeState {
  prices: IPriceModel<IItemModel>[];
  pricePage: number;
  priceLimit: number;
  revenueToday: number;
}

export type HomeStore = IHomeActions & IHomeState;
