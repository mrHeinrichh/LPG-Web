import { get, remove } from "@/config";
import { API_URL } from "@/env";
import { create } from "zustand";

export type TransationStatus =
  | "Pending"
  | "Approved"
  | "Declined"
  | "Completed"
  | "On Going"
  | "Cancelled";
export const useTransactionStore = create((set) => ({
  transactions: [],
  getTransactions: async () => {
    const { data } = await get(`transactions`);
    if (data.status == "success") {
      return set(() => ({ transactions: data.data }));
    }
  },
  getRiderTransactions: async (rider: string) => {
    const { data } = await get(`transactions?filter={"rider": "${rider}"}`);
  console.log(data);

    if (data.status == "success") {
      return set(() => ({ transactions: data.data }));
    }
  },
  updateStatus: async (_id: string, status: TransationStatus) => {
    const { data } = await patch(`transactions/${_id}`, { status });
    if (data.status == "success") {
      const temp = data.data.map((e: any) => {
        if (e._id == _id) e.status = status;
        return e;
      });
      return set(() => ({ transactions: temp }));
    }
  },
}));

export const useRiderStore = create((set) => ({
  riders: [],
  getRider: async () => {
    const { data } = await get(`users?filter={"__t": "Rider"}`);
    return set(() => ({ riders: data.data }));
  },
  removeRider: async (id: string) => {
    const { data } = await remove(`users/${id}`);
    if (data.state == "success") {
      return set((state: any) => ({
        items: [...state.riders.filter((e: any) => e._id != id)],
      }));
    }
  },
}));

export const useCustomerStore = create((set) => ({
  customers: [],
  getCustomer: async () => {
    const { data } = await get(`users?filter={"__t": "Customer"}`);
    return set(() => ({ customers: data.data }));
  },
  removeCustomer: async (id: string) => {
    const { data } = await remove(`users/${id}`);
    if (data.state == "success") {
      return set((state: any) => ({
        customers: [...state.customers.filter((e: any) => e._id != id)],
      }));
    }
  },
}));

export const useItemStore = create((set) => ({
  items: [],
  getItems: async () => {
    const { data } = await get(`items`);
    return set(() => ({ items: data.data }));
  },
  removeItem: (id: any) => {
    set((state: any) => ({
      items: [...state.items.filter((e: any) => e._id != id)],
    }));
  },
}));
