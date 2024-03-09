import { IItemState } from "./types";

export const initialState: IItemState = {
  items: [],
  products: [],
  accessories: [],
  page: 1,
  limit: 10,
  search: "",
};
