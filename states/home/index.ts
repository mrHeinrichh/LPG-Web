import { create } from "zustand";
import {
  HomeStore,
  GetPrices,
  PriceNext,
  PriceBack,
  SetPriceLimit,
  GetTotalRevenueToday,
} from "./types";
import { priceRepository, transactionRepository } from "@/repositories";
import { initialState } from "./initialState";
import { IQuery } from "@/interfaces";
import { getEndDayDate, getStartDayDate } from "@/utils";

export default create<HomeStore>((set) => {
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
    getTotalRevenueToday,
    setPriceLimit,
    priceNext,
    getPrices,
    priceBack,
    ...initialState,
  };
});
