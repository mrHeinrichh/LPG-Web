import { IQuery } from "@/interfaces";
import { ICustomerModel } from "@/models";

// Types & Interfaces
export type GetCustomers = (query: IQuery) => Promise<void>;
export type GetOverallCustomers = (query: IQuery) => Promise<void>;
export type RemoveCustomer = (id: string) => Promise<void>;
export type SetLimit = (value: number) => void;
export type NextPage = () => void;
export type PreviousPage = () => void;

// Actions
export interface ICustomerActions {
  getCustomers: GetCustomers;
  getOverallCustomers: GetOverallCustomers;
  removeCustomer: RemoveCustomer;
  setLimit: SetLimit;
  nextPage: NextPage;
  previousPage: PreviousPage;
}

// States
export interface ICustomerState {
  customers: ICustomerModel[];
  overallCustomers: ICustomerModel[];
  verifiedCustomers: ICustomerModel[];
  page: number;
  limit: number;
  search: string;
}

export type CustomerStore = ICustomerActions & ICustomerState;
