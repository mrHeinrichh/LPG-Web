import { IHomeState } from "./types";

export const initialState: IHomeState = {
  prices: [],
  pricePage: 1,
  priceLimit: 10,
  revenueToday: 0,
  verifiedCustomers: [],
  pendingDeliveries: [],
  orderAccomplishments: [],
  completedDeliveries: [],
  soldTransactions: [],
  transactionTypes: [],
  units: 10,
  timeFilter: "Daily",
  start: new Date(),
  end: new Date(),
  baranggay: "All",
};
