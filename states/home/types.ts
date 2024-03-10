import { IQuery } from "@/interfaces";
import {
  ICartItemModel,
  ICustomerModel,
  IDeliveryModel,
  IItemModel,
  IPriceModel,
} from "@/models";

// Types & Interfaces
export type GetPrices = (query: IQuery) => Promise<void>;
export type GetTotalRevenueToday = (query: IQuery) => Promise<void>;
export type GetPendingDeliveries = (query: IQuery) => Promise<void>;
export type GetCompletedDeliveries = (query: IQuery) => Promise<void>;
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
  getPendingDeliveries: GetPendingDeliveries;
  getCompletedDeliveries: GetCompletedDeliveries;
}

// States
export interface IHomeState {
  prices: IPriceModel<IItemModel>[];
  verifiedCustomers: ICustomerModel[];
  pendingDeliveries: IDeliveryModel[];
  completedDeliveries: IDeliveryModel[];
  pricePage: number;
  priceLimit: number;
  revenueToday: number;
}

export type HomeStore = IHomeActions & IHomeState;
