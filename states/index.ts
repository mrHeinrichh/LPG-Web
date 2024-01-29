import { get, patch, post, remove } from "@/config";
import { create } from "zustand";

export type TransationStatus =
  | "Pending"
  | "Approved"
  | "Declined"
  | "Completed"
  | "On Going"
  | "Cancelled";
export type AppointmentStatus = "Pending" | "Approved" | "Declined";

export const useAuthStore = create((set) => ({
  user: null,
  authenticate: async (request: any) => {
    const { data } = await post(`users/authenticate`, {
      ...request,
    });
    if (data.status == "success") {
      return set(() => ({ user: data.data[0] }));
    }
  },
  signOut: () => {
    set(() => ({ user: null }));
  },
}));

export const useDashboardStore = create((set) => ({
  transactions: [],
  getTransactions: async () => {
    const { data } = await get(`dashboard/transaction`);
    if (data.status == "success") {
      return set(() => ({
        transactions: data.data[0].transactions,
      }));
    }
  },
  getTransactionsByStatus: async (statuses = ["Pending"]) => {
    const query = statuses.map((e: any) => `statuses[]=${e}`).join("&");
    const { data } = await get(`dashboard/transaction?${query}`);
    if (data.status == "success") {
      return set(() => ({
        transactions: data.data[0].transactions,
      }));
    }
  },
  updateStatus: async (_id: string, status: TransationStatus) => {
    const { data } = await patch(`transactions/${_id}`, {
      status,
      type: "Delivery",
    });
    if (data.status == "success") {
      const temp = data.data.map((e: any) => {
        if (e._id == _id) e.status = status;
        return e;
      });
      return set(() => ({ transactions: temp }));
    }
  },
}));

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
  removeTransaction: async (id: any) => {
    const { data } = await remove(`transactions/${id}`);
    if (data.status == "success") {
      return set((state: any) => ({
        transactions: [...state.transactions.filter((e: any) => e._id != id)],
      }));
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

export const useMessageStore = create((set) => ({
  messages: [],
  getMessages: async (customer: string) => {
    const { data } = await get(`messages?filter={"user": "${customer}"}`);
    return set(() => ({ messages: data.data }));
  },
  addMessage: async (message: any) => {
    return set((state: any) => ({ messages: [...state.messages, message] }));
  },
}));

export const useCustomerStore = create((set) => ({
  customers: [],
  appointments: [],
  getCustomer: async () => {
    const { data } = await get(`users?filter={"__t": "Customer"}`);
    return set(() => ({ customers: data.data }));
  },
  getAppointments: async () => {
    const { data } = await get(
      `users?filter={"__t": "Customer", "appointmentStatus": "Pending"}`
    );
    return set(() => ({ appointments: data.data }));
  },
  updateAppointmentStatus: async (_id: string, status: AppointmentStatus) => {
    const { data } = await patch(`users/${_id}`, { status, type: "Customer" });
    if (data.status == "success") {
      const temp = data.data.map((e: any) => {
        if (e._id == _id) e.appointmentStatus = status;
        return e;
      });
      return set(() => ({ appointments: temp }));
    }
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

export const useFaqStore = create((set) => ({
  faqs: [],
  getFaqs: async () => {
    const { data } = await get(`faqs`);
    return set(() => ({ faqs: data.data }));
  },
  removeFaq: async (id: any) => {
    const { data } = await remove(`faqs/${id}`);
    if (data.status == "success") {
      return set((state: any) => ({
        faqs: [...state.faqs.filter((e: any) => e._id != id)],
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
