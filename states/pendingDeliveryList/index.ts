import { create } from "zustand";
import { PendingDeliveryListStore } from "./types";
import { transactionRepository } from "@/repositories";
import { initialState } from "./initialState";
import { IDeliveryModel } from "@/models";

export default create<PendingDeliveryListStore>((set) => {
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

  const approveDelivery = async (_id: string) => {
    const { status } =
      await transactionRepository.approveDelivery<IDeliveryModel>(_id);
    if (status == "success") {
      return set((state) => {
        const pendingDeliveries = state.pendingDeliveries.filter(
          (pendingDelivery) => pendingDelivery._id != _id
        );
        return {
          pendingDeliveries,
        };
      });
    }
  };

  const declineDelivery = async (_id: string) => {
    // TODO: Update reason
    const { status } =
      await transactionRepository.declineDelivery<IDeliveryModel>(_id, {
        cancelReason: "No Reason",
      });
    if (status == "success") {
      return set((state) => {
        const pendingDeliveries = state.pendingDeliveries.filter(
          (pendingDelivery) => pendingDelivery._id != _id
        );
        return {
          pendingDeliveries,
        };
      });
    }
  };
  return {
    declineDelivery,
    getPendingDeliveries,
    approveDelivery,
    ...initialState,
  };
});
