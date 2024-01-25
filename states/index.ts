import { get, patch, remove } from "@/config";
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

export const useMessageStore = create((set) => ({
  messages: [],
  getMessages: async (customer: string) => {
    const { data } = await get(`messages?filter={"customer": "${customer}"}`);
    return set(() => ({ messages: data.data }));
  },
  addMessage: async (message: any) => {
    return set((state: any) => ({ messages: [...state.messages, message] }));
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
  toggleVerify: async (id: string, status: boolean) => {
    const { data } = await patch(`users/${id}`, {
      verified: status,
      type: "Customer",
    });
    if (data.state == "success") {
      set((state: any) => {
        const temp = state.customers.map((e: any) => {
          if (e._id == id) e.verified = status;
          return e;
        });
        return {
          customers: [...temp],
        };
      });
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

export const useWalkInStore = create((set) => ({
  items: [],
  increment: (item: any) => {
    set((state: any) => {
      const temp = state.items.find((e: any) => e._id == item._id);
      if (!temp) {
        item.quantity = 1;
        return { items: [...state.items, item] };
      }
      const updated = state.items.map((e: any) => {
        if (e._id == item._id) e.quantity++;
        return e;
      });
      return { items: updated };
    });
  },
  decrement: (item: any) => {
    set((state: any) => {
      const temp = state.items.find((e: any) => e._id == item._id);
      if (temp.quantity - 1 == 0) {
        const updated = state.items.filter((e: any) => e._id != item._id);
        return { items: updated };
      }

      if (temp) {
        const updated = state.items.map((e: any) => {
          if (e._id == item._id) e.quantity--;
          return e;
        });
        return { items: updated };
      }
    });
  },
}));
