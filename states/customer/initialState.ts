import { ICustomerState } from "./types";

export const initialState: ICustomerState = {
  customers: [],
  overallCustomers: [],
  verifiedCustomers: [],
  page: 1,
  limit: 10,
  search: "",
};
