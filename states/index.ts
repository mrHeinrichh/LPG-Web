import { API_URL } from "@/env";
import { create } from "zustand";

export const useRiderStore = create((set) => ({
  riders: [],
  getRider: (data: any) => set((state: any) => ({ riders: data })),
}));

export const useCustomerStore = create((set) => ({
  customers: [],
  getCustomer: async () => {
    const response = await fetch(`${API_URL}users?filter={"__t": "Customer"}`);
    const data = (await response.json()).data;
    return set(() => ({ customers: data }));
  },
}));

export const useItemStore = create((set) => ({
  items: [],
  getItems: async () => {
    const response = await fetch(`${API_URL}items`);
    const data = (await response.json()).data;
    return set(() => ({ items: data }));
  },
  removeItem: (id: any) => {
    set((state: any) => ({
      items: [...state.items.filter((e: any) => e._id != id)],
    }));
  },
}));
