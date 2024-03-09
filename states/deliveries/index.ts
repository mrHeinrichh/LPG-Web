import { create } from "zustand";
import { DevliveryStore } from "./types";
import { transactionRepository } from "@/repositories";
import { initialState } from "./initialState";
import { IDeliveryModel } from "@/models";

export default create<DevliveryStore>((set) => {
  const getPendingDeliveries = async ({ page = 0, limit = 0 }) => {
    const { data, status } =
      await transactionRepository.getTransactions<IDeliveryModel>({
        page,
        limit,
        filter: `{"__t": "Delivery", "status": "Pending"}`,
      });

    if (status == "success") {
      return set(() => {
        return { pendingDeliveries: data };
      });
    }
  };

  const getApprovedDeliveries = async ({ page = 0, limit = 0 }) => {
    const { data, status } =
      await transactionRepository.getTransactions<IDeliveryModel>({
        page,
        limit,
        filter: `{"__t": "Delivery", "status": "Approved"}`,
      });

    if (status == "success") {
      return set(() => {
        return { approvedDeliveries: data };
      });
    }
  };

  const getOnGoingDeliveries = async ({ page = 0, limit = 0 }) => {
    const { data, status } =
      await transactionRepository.getTransactions<IDeliveryModel>({
        page,
        limit,
        filter: `{"__t": "Delivery", "status": "On Going"}`,
      });

    if (status == "success") {
      return set(() => {
        return { onGoingDeliveries: data };
      });
    }
  };

  const getFeedbacks = async ({ page = 1, limit = 5 }) => {
    const { data, status } =
      await transactionRepository.getTransactions<IDeliveryModel>({
        page,
        limit,
        filter: `{"__t": "Delivery", "feedback": { "$ne": null }}`,
      });
    if (status == "success") {
      return set(() => ({ feedbacks: data }));
    }
  };

  const approve = async (id: string) => {
    const { data, status } =
      await transactionRepository.approveDelivery<IDeliveryModel>(id);
    if (status == "success" && data.length !== 0) {
      return set((state) => {
        return {
          pendingDeliveries: state.pendingDeliveries.filter(
            (delivery) => delivery._id != id
          ),
          approvedDeliveries: [...state.approvedDeliveries, data[0]],
        };
      });
    }
  };

  const decline = async (id: string) => {
    const { data, status } =
      await transactionRepository.declineDelivery<IDeliveryModel>(id, {});
    if (status == "success" && data.length !== 0) {
      return set((state) => {
        return {
          pendingDeliveries: state.pendingDeliveries.filter(
            (delivery) => delivery._id != id
          ),
        };
      });
    }
  };

  const setLimit = (value: number) => {
    return set(() => ({ limit: value }));
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
    decline,
    approve,
    nextPage,
    previousPage,
    setLimit,
    getFeedbacks,
    getOnGoingDeliveries,
    getPendingDeliveries,
    getApprovedDeliveries,
    ...initialState,
  };
});
