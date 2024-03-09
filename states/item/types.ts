import { IQuery } from "@/interfaces";
import { IItemModel } from "@/models";

// Types & Interfaces
export type GetItems = (query: IQuery) => Promise<void>;
export type GetOverallItems = (query: IQuery) => Promise<void>;
export type RemoveItem = (id: string) => Promise<void>;
export type SetLimit = (value: number) => void;
export type SetSearch = (value: string) => void;
export type NextPage = () => void;
export type PreviousPage = () => void;

// Actions
export interface IItemActions {
  getItems: GetItems;
  getOverallItems: GetOverallItems;
  removeItem: RemoveItem;
  setLimit: SetLimit;
  nextPage: NextPage;
  previousPage: PreviousPage;
  setSearch: SetSearch;
}

// States
export interface IItemState {
  items: IItemModel[];
  products: IItemModel[];
  accessories: IItemModel[];
  page: number;
  limit: number;
  search: string;
}

export type ItemStore = IItemActions & IItemState;
