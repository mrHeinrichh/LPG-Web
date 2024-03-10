import { create } from "zustand";
import {
  HomeStore,
  GetPrices,
  PriceNext,
  PriceBack,
  SetPriceLimit,
  GetTotalRevenueToday,
} from "./types";
import {
  priceRepository,
  transactionRepository,
  userRepository,
} from "@/repositories";
import { initialState } from "./initialState";
import { Baranggay, IQuery, TimeFilter } from "@/interfaces";
import { getEndDayDate, getMutiplier, getStartDayDate } from "@/utils";
import { ICustomerModel, IDeliveryModel, ITransactionModel } from "@/models";

export default create<HomeStore>((set) => {
  const setBaranggay = (baranggay: Baranggay) => {
    return set(() => {
      return {
        baranggay,
      };
    });
  };

  const setDates = (timeFilter: TimeFilter, units: number) => {
    return set(() => {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(startDate.getDate() - units * getMutiplier(timeFilter));
      return {
        start: startDate,
        end: endDate,
      };
    });
  };

  const setUnit = (value: number) => {
    return set(() => {
      return {
        units: value,
      };
    });
  };

  const setTimeFilter = (value: TimeFilter) => {
    return set(() => {
      return {
        timeFilter: value,
      };
    });
  };

  const getOrderAccomplishments = async (start: Date, end: Date) => {
    const { data, status } =
      await transactionRepository.getTransactions<IDeliveryModel>({
        page: 0,
        limit: 0,
        filter: `{"$and": [{ "createdAt": { "$gte": "${start.toISOString()}", "$lte": "${end.toISOString()}" }}, {"$or": [{"$and": [{"__t": "Delivery"}, {"status": {"$in": ["Completed", "Cancelled", "Declined" ]}}]}, {"__t": {"$eq": null}}]}]} `,
      });

    if (status === "success") {
      return set(() => ({ orderAccomplishments: data }));
    }
  };

  const getTransactionTypes = async (start: Date, end: Date) => {
    const { data, status } =
      await transactionRepository.getTransactions<ITransactionModel>({
        page: 0,
        limit: 0,
        filter: `{ "createdAt": { "$gte": "${start.toISOString()}", "$lte": "${end.toISOString()}" }} `,
      });

    if (status === "success") {
      return set(() => ({ transactionTypes: data }));
    }
  };

  const getSoldTransactions = async (start: Date, end: Date) => {
    const { data, status } =
      await transactionRepository.getTransactions<IDeliveryModel>({
        page: 0,
        limit: 0,
        filter: `{"$and": [{ "createdAt": { "$gte": "${start.toISOString()}", "$lte": "${end.toISOString()}" }}, {"$or": [{"$and": [{"__t": "Delivery"}, {"status": "Completed"}]}, {"__t": {"$eq": null}}]}]} `,
      });

    if (status === "success") {
      return set(() => ({ soldTransactions: data }));
    }
  };

  const getVerifiedCustomers = async (
    start = getStartDayDate(new Date()),
    end = getEndDayDate(new Date())
  ) => {
    const { data, status } = await userRepository.getUsers<ICustomerModel>({
      page: 0,
      limit: 0,
      filter: `{ "__t": "Customer", "verified": true }`,
    });

    if (status == "success") {
      return set(() => ({ verifiedCustomers: data }));
    }
  };

  const getPendingDeliveries = async ({ page = 0, limit = 0 }) => {
    const { data, status } =
      await transactionRepository.getTransactions<IDeliveryModel>({
        page,
        limit,
        filter: `{"__t": "Delivery", "status": "Pending"}`,
      });
    if (status === "success") {
      return set(() => ({ pendingDeliveries: data }));
    }
  };

  const getCompletedDeliveries = async ({ page = 0, limit = 0 }) => {
    const { data, status } =
      await transactionRepository.getTransactions<IDeliveryModel>({
        page,
        limit,
        filter: `{"__t": "Delivery", "status": "Completed"}`,
      });
    if (status === "success") {
      return set(() => ({ completedDeliveries: data }));
    }
  };

  const getTotalRevenueToday: GetTotalRevenueToday = async ({
    page = 0,
    limit = 0,
    filter = "{}",
    populate = "",
  }: IQuery) => {
    // TODO: Add completed and walkins only
    const { data, status } = await transactionRepository.getTransactions({
      page,
      limit,
      filter: `{"createdAt": {"$gte": "${getStartDayDate(
        new Date()
      ).toISOString()}", "$lte": "${getEndDayDate(
        new Date()
      ).toISOString()}"}}`,
      populate,
    });

    if (status === "success") {
      return set(() => ({
        revenueToday: data.reduce((acc, curr) => acc + curr.total, 0),
      }));
    }
  };

  const getPrices: GetPrices = async ({
    page = 0,
    limit = 0,
    filter = "{}",
    populate = "",
  }: IQuery) => {
    const { data, status } = await priceRepository.getPrices({
      page,
      limit,
      filter,
      populate,
    });
    if (status === "success") {
      return set(() => ({ prices: data }));
    }
  };

  const priceNext: PriceNext = () => {
    return set((state) => ({
      pricePage: state.pricePage + 1,
    }));
  };

  const priceBack: PriceBack = () => {
    return set((state) => {
      if (state.pricePage > 1) {
        return {
          pricePage: state.pricePage - 1,
        };
      }
      return { ...state };
    });
  };

  const setPriceLimit: SetPriceLimit = (value: number) => {
    return set(() => {
      return {
        priceLimit: value,
      };
    });
  };

  return {
    getTransactionTypes,
    getOrderAccomplishments,
    setBaranggay,
    setTimeFilter,
    setUnit,
    getPendingDeliveries,
    getVerifiedCustomers,
    getCompletedDeliveries,
    getTotalRevenueToday,
    setPriceLimit,
    priceNext,
    getPrices,
    priceBack,
    getSoldTransactions,
    setDates,
    ...initialState,
  };
});
