import { create } from "zustand";
import { GetOverallRiders, GetRiders, RiderStore } from "./types";
import { userRepository } from "@/repositories";
import { initialState } from "./initialState";
import { IRiderModel } from "@/models";
import { IQuery } from "@/interfaces";

export default create<RiderStore>((set) => {
  const getOverallRiders: GetOverallRiders = async ({}) => {
    const { data } = await userRepository.getUsers<IRiderModel>({
      page: 0,
      limit: 0,
      filter: `{"__t": "Rider"}`,
    });

    return set(() => {
      return { overallRiders: data };
    });
  };

  const getRiders: GetRiders = async ({ page = 1, limit = 10 }: IQuery) => {
    const { data } = await userRepository.getUsers<IRiderModel>({
      page,
      limit,
      filter: `{"__t": "Rider"}`,
    });

    return set(() => {
      return { riders: data };
    });
  };

  const setLimit = (value: number) => {
    return set(() => ({
      limit: value,
    }));
  };
  const nextPage = () => {
    return set((state) => ({
      page: state.page + 1,
    }));
  };

  const previousPage = () => {
    return set((state) => {
      if (state.page > 1) {
        return {
          page: state.page - 1,
        };
      }
      return { ...state };
    });
  };

  return {
    setLimit,
    nextPage,
    previousPage,
    getRiders,
    getOverallRiders,
    ...initialState,
  };
});
