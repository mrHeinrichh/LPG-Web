import { Baranggay, IQuery, TimeFilter } from "@/interfaces";
import {
  ICartItemModel,
  ICustomerModel,
  IDeliveryModel,
  IItemModel,
  IPriceModel,
  ITransactionModel,
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
export type GetSoldTransactions = (start: Date, end: Date) => Promise<void>;
export type GetOrderAccomplishments = (start: Date, end: Date) => Promise<void>;
export type GetTransactionTypes = (start: Date, end: Date) => Promise<void>;
export type SetUnit = (value: number) => void;
export type SetTimeFilter = (value: TimeFilter) => void;
export type SetDates = (timeFilter: TimeFilter, units: number) => void;
export type SetBaranggay = (baranggay: Baranggay) => void;

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
  getSoldTransactions: GetSoldTransactions;
  getOrderAccomplishments: GetOrderAccomplishments;
  getTransactionTypes: GetTransactionTypes;
  setUnit: SetUnit;
  setTimeFilter: SetTimeFilter;
  setDates: SetDates;
  setBaranggay: SetBaranggay;
}

// States
export interface IHomeState {
  prices: IPriceModel<IItemModel>[];
  verifiedCustomers: ICustomerModel[];
  pendingDeliveries: IDeliveryModel[];
  completedDeliveries: IDeliveryModel[];
  orderAccomplishments: IDeliveryModel[];
  soldTransactions: ITransactionModel[];
  transactionTypes: ITransactionModel[];
  pricePage: number;
  priceLimit: number;
  revenueToday: number;
  units: number;
  timeFilter: TimeFilter;
  start: Date;
  end: Date;
  baranggay: Baranggay;
}

export type HomeStore = IHomeActions & IHomeState;
// import { IQuery } from "@/interfaces";
// import { ITransactionModel } from "@/models";

// // Types & Interfaces
// export type GetSoldTransactions = (query: IQuery) => Promise<void>;

// // Actions
// export interface IChartActions {
//   getSoldTransactions: GetSoldTransactions;
// }

// // States
// export interface IChartState {
//   soldTransactions: ITransactionModel[];
// }

// export type ChartStore = IChartActions & IChartState;
