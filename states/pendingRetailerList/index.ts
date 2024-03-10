import { create } from "zustand";
import { PendingRetailerListStore } from "./types";
import { userRepository } from "@/repositories";
import { initialState } from "./initialState";
import { IRetailerModel } from "@/models";
import { AppointmentStatus } from "@/interfaces";

export default create<PendingRetailerListStore>((set) => {
  const getPendingRetailers = async ({ page = 0, limit = 0 }) => {
    const { data, status } = await userRepository.getUsers<IRetailerModel>({
      page,
      limit,
      filter: `{"__t": "Retailer", "verified": false}`,
    });

    if (status === "success") {
      return set(() => ({ pendingRetailers: data }));
    }
  };

  const verifyRetailer = async (_id: string) => {
    const { status } = await userRepository.verifyRetailer<IRetailerModel>(_id);

    if (status == "success") {
      return set((state) => {
        const pendingRetailers = state.pendingRetailers.filter(
          (Retailer) => Retailer._id != _id
        );
        return {
          pendingRetailers,
        };
      });
    }
  };
  return {
    getPendingRetailers,
    verifyRetailer,
    ...initialState,
  };
});
