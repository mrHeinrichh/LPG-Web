import { get, patch, post, remove } from "@/config";
import { IAnnouncementModel } from "@/models";
import { deleteAnnouncement, getAnnouncements } from "@/repositories";
import { getEndDayDate, getStartDayDate } from "@/utils";
import { emit } from "process";
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

export const useTransactionStore = create((set) => ({
  transactions: [],
  pendingDeliveries: [],
  maxPendingDeliveries: 0,
  deliveries: [],
  feedbacks: [],
  solds: [],
  noOfTransactions: 0,
  totalRevenue: 0,
  total: 0,
  getNoOfTransactions: async () => {
    const { data } = await get(`transactions?page=${0}&limit=${0}`);
    if (data.status == "success") {
      const noOfTransactions = data.data.reduce(
        (acc: number, curr: any) => acc + 1,
        0
      );
      const totalRevenue = data.data.reduce(
        (acc: number, curr: any) => acc + curr.total,
        0
      );
      return set(() => ({ noOfTransactions, totalRevenue }));
    }
  },
  getSolds: async (
    page = 1,
    limit = 5,
    start = getStartDayDate(new Date()),
    end = getEndDayDate(new Date())
  ) => {
    const temp = `transactions?page=${page}&limit=${limit}&filter={"$and": [{ "createdAt": { "$gte": "${start.toISOString()}", "$lte": "${end.toISOString()}" }}, {"$or": [{"$and": [{"__t": "Delivery"}, {"status": "Completed"}]}, {"__t": {"$eq": null}}]}]} `;
    const { data } = await get(temp);
    if (data.status == "success") {
      return set(() => ({ solds: data.data }));
    }
  },
  getFeedbacks: async (page = 1, limit = 5) => {
    const { data } = await get(
      `transactions?page=${page}&limit=${limit}&filter={"__t": "Delivery", "feedback": { "$ne": null }}`
    );
    if (data.status == "success") {
      return set(() => ({ feedbacks: data.data }));
    }
  },
  getTransactions: async (
    page: number = 1,
    limit: number = 5,
    filter = "{}"
  ) => {
    const { data } = await get(
      `transactions?page=${page}&limit=${limit}&filter=${filter}`
    );
    if (data.status == "success") {
      return set(() => ({
        transactions: data.data,
      }));
    }
  },
  getPendingDeliveries: async (page: number = 1, limit: number = 5) => {
    const { data } = await get(
      `transactions?page=${page}&limit=${limit}&filter={"__t": "Delivery", "status": "Pending"}`
    );
    if (data.status == "success") {
      return set(() => ({
        pendingDeliveries: data.data,
        maxPendingDeliveries: data.meta.max,
      }));
    }
  },
  getTotal: async (page: number = 1, limit: number = 5, filter = "{}") => {
    const { data } = await get(
      `transactions?page=${page}&limit=${limit}&filter=${filter}`
    );
    if (data.status == "success") {
      return set(() => ({
        total: data.data.reduce(
          (acc: number, curr: any) => acc + curr.total,
          0
        ),
      }));
    }
  },
  getDeliveriesByStatuses: async (
    page: number = 1,
    limit: number = 5,
    statuses = []
  ) => {
    const query = statuses.map((e: string) => `{"status": "${e}"}`).join(", ");
    const { data } = await get(
      `transactions?page=${page}&limit=${limit}&filter={"$or": [${query}]}`
    );
    if (data.status == "success") {
      return set(() => ({ deliveries: data.data }));
    }
  },
  approve: async (_id: string) => {
    const { data } = await patch(`transactions/${_id}/approve`, {});
    if (data.status == "success") {
      return set((state: any) => {
        const pendingDeliveries = state.pendingDeliveries.map((e: any) => {
          if (e._id == _id) e.status = "Approved";
          return e;
        });
        const transactions = state.transactions.map((e: any) => {
          if (e._id == _id) e.status = "Approved";
          return e;
        });
        return {
          pendingDeliveries,
          transactions,
          maxPendingDeliveries: state.maxPendingDeliveries - 1,
        };
      });
    }
  },
  decline: async (_id: string) => {
    const { data } = await patch(`transactions/${_id}/decline`, {});
    if (data.status == "success") {
      return set((state: any) => {
        const temp = state.pendingDeliveries.map((e: any) => {
          if (e._id == _id) e = data.data[0];
          return e;
        });
        return {
          pendingDeliveries: temp,
          maxPendingDeliveries: state.maxPendingDeliveries - 1,
        };
      });
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
}));

export const useRiderStore = create((set) => ({
  riders: [],
  getRider: async (page: number = 1, limit: number = 5, filter = "") => {
    const query =
      filter != ""
        ? `{ "$and": [{"__t": "Rider"}, ${filter} ] }`
        : `{ "__t": "Rider" }`;
    const { data } = await get(
      `users?page=${page}&limit=${limit}&filter=${query}`
    );
    if (data.status == "success") {
      return set(() => ({ riders: data.data }));
    }
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

export const useMessageStore = create((set) => ({
  messages: [],
  getMessages: async (customer: string) => {
    const { data } = await get(
      `messages?filter={"$or": [{"from": "${customer}"}, {"to": "${customer}"}]}`
    );
    return set(() => ({ messages: data.data }));
  },
  addMessage: async (request: any) => {
    const { data } = await post(`messages`, request);
    if (data.status === "success") {
      return set((state: any) => ({
        messages: [...state.messages, data.data[0]],
      }));
    }
  },
  addNewMessage: (data: any) => {
    return set((state: any) => ({
      messages: [...state.messages, data],
    }));
  },
}));

export const useCustomerStore = create((set) => ({
  customers: [],
  pendingCustomers: [],
  verifiedCustomers: [],
  noOfCustomer: 0,
  maxAppointments: 0,
  maxPendingCustomers: 0,
  noOfVerifiedCustomer: 0,
  appointments: [],
  getCustomer: async (page: number = 1, limit: number = 5, filter = "") => {
    const query =
      filter != ""
        ? `{ "$and": [{"__t": "Customer"}, ${filter} ] }`
        : `{ "__t": "Customer" }`;
    const { data } = await get(
      `users?page=${page}&limit=${limit}&filter=${query}`
    );
    if (data.status == "success") {
      return set(() => ({ customers: data.data }));
    }
  },
  getPendingCustomer: async (page: number = 1, limit: number = 5) => {
    const { data } = await get(
      `users?page=${page}&limit=${limit}&filter={ "$and": [{"__t": "Customer"}, {"verified": false} ] }`
    );
    if (data.status == "success") {
      return set(() => ({
        pendingCustomers: data.data,
        maxPendingCustomers: data.meta.max,
      }));
    }
  },
  getVerifiedCustomer: async (
    start = getStartDayDate(new Date()),
    end = getEndDayDate(new Date())
  ) => {
    const { data } = await get(
      `users?page=${0}&limit=${0}&filter={"__t": "Customer", "$and": [{"verified": true}, { "createdAt": { "$gte": "${start.toISOString()}", "$lte": "${end.toISOString()}" }}]} `
    );

    if (data.status == "success") {
      return set(() => ({ verifiedCustomers: data.data }));
    }
  },
  getNoOfCustomer: async () => {
    const { data } = await get(
      `users?page=${0}&limit=${0}&filter={"__t": "Customer"}`
    );

    if (data.status == "success") {
      const noOfVerifiedCustomer = data.data.reduce(
        (acc: number, curr: any) => (curr.verified ? acc + 1 : acc),
        0
      );
      const noOfCustomer = data.data.reduce(
        (acc: number, curr: any) => acc + 1,
        0
      );
      return set(() => ({ noOfVerifiedCustomer, noOfCustomer }));
    }
  },
  getAppointments: async (page: number = 1, limit: number = 5) => {
    const { data } = await get(
      `users?page=${page}&limit=${limit}&filter={"__t": "Customer", "appointmentStatus": "Pending"}`
    );

    if (data.status == "success") {
      return set(() => ({
        appointments: data.data,
        maxAppointments: data.meta.max,
      }));
    }
  },
  updateAppointmentStatus: async (_id: string, status: AppointmentStatus) => {
    const { data } = await patch(`users/${_id}`, {
      appointmentStatus: status,
      __t: "Customer",
    });
    if (data.status == "success") {
      return set((prev: any) => {
        const temp = prev.appointments.map((e: any) => {
          if (e._id == _id) e = data.data[0];
          return e;
        });
        return {
          appointments: temp,
          maxAppointments: prev.maxAppointments - 1,
        };
      });
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
  verifyCustomer: async (id: string) => {
    const { data } = await patch(`users/${id}/verify`, {});

    if (data.status == "success") {
      return set((state: any) => {
        const pendingCustomers = state.pendingCustomers.map((e: any) => {
          if (e._id == id) e = data.data[0];
          return e;
        });
        return {
          pendingCustomers,
          maxPendingCustomers: state.maxPendingCustomers - 1,
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
  noOfProducts: 0,
  noOfAccessories: 0,
  getItems: async (page: number = 1, limit: number = 5, filter = "{}") => {
    const { data } = await get(
      `items?page=${page}&limit=${limit}&filter=${filter}`
    );

    if (data.status == "success") {
      return set(() => ({ items: data.data }));
    }
  },
  getNumbers: async () => {
    const { data } = await get(`items?page=${0}&limit=${0}`);
    if (data.status == "success") {
      const noOfProducts = data.data.reduce(
        (acc: number, curr: any) => (curr.type === "Product" ? acc + 1 : acc),
        0
      );
      const noOfAccessories = data.data.reduce(
        (acc: number, curr: any) => (curr.type === "Accessory" ? acc + 1 : acc),
        0
      );
      return set(() => ({ noOfProducts, noOfAccessories }));
    }
  },
  removeItem: async (id: any) => {
    const { data } = await remove(`items/${id}`);
    if (data.status == "success") {
      return set((state: any) => ({
        items: [...state.items.filter((e: any) => e._id != id)],
      }));
    }
  },
}));

export const usePriceStore = create((set) => ({
  prices: [],
  reasons: [],
  getPrices: async (
    page: number = 1,
    limit: number = 5,
    filter = "{}",
    populate = ""
  ) => {
    const { data } = await get(
      `prices?page=${page}&limit=${limit}&filter=${filter}&populate=${populate}`
    );

    if (data.status == "success") {
      return set(() => ({
        prices: data.data,
      }));
    }
  },
  getReasons: async (page: number = 1, limit: number = 5, filter = "{}") => {
    const { data } = await get(
      `prices?page=${page}&limit=${limit}&filter=${filter}&populate=item`
    );
    if (data.status == "success") {
      return set(() => ({
        reasons: data.data.map((e: any) => {
          e.name = e.item.name;
          return e;
        }),
      }));
    }
  },
}));

export const useWalkInStore = create((set) => ({
  items: [],
  name: "",
  contactNumber: "",
  discounted: false,
  setData: (name: string, contactNumber: string, discounted: boolean) => {
    set(() => {
      return { name, contactNumber, discounted };
    });
  },
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
