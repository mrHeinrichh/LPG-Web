import { create } from "zustand";
import { PendingCustomerListStore } from "./types";
import { userRepository } from "@/repositories";
import { initialState } from "./initialState";
import { ICustomerModel } from "@/models";
import { AppointmentStatus } from "@/interfaces";

export default create<PendingCustomerListStore>((set) => {
  const getPendingCustomers = async ({ page = 0, limit = 0 }) => {
    const { data, status } = await userRepository.getUsers<ICustomerModel>({
      page,
      limit,
      filter: `{"__t": "Customer", "verified": false}`,
    });

    console.log(data);

    if (status === "success") {
      return set(() => ({ pendingCustomers: data }));
    }
  };

  const verifyCustomer = async (_id: string) => {
    const { status } = await userRepository.verifyCustomer<ICustomerModel>(_id);

    if (status == "success") {
      return set((state) => {
        const pendingCustomers = state.pendingCustomers.filter(
          (customer) => customer._id != _id
        );
        return {
          pendingCustomers,
        };
      });
    }
  };
  return {
    getPendingCustomers,
    verifyCustomer,
    ...initialState,
  };
});
