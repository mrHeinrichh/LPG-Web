import { IHomeState } from "./types";

export const initialState: IHomeState = {
  prices: [],
  pricePage: 1,
  priceLimit: 10,
  revenueToday: 0,
};
