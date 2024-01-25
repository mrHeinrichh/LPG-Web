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
  console.log(data);
  return data;
}

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
