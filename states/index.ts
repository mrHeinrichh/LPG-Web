import { get, post } from "@/config";
import { create } from "zustand";
import useAnnouncementStore from "./announcement";
import useCreateAnnouncementStore from "./createAnnouncement";
import useEditAnnouncementStore from "./editAnnouncement";
import useFaqStore from "./faq";
import useCreateFaqStore from "./createFaq";
import useWalkinStore from "./walkin";
import useRiderStore from "./rider";
import useCreateRiderStore from "./createRider";
import useHomeStore from "./home";
import useRiderAppointmentsListStore from "./riderAppointmentsList";
import usePendingCustomerListStore from "./pendingCustomerList";
import usePendingDeliveryListStore from "./pendingDeliveryList";
import useCheckoutStore from "./checkout";
import useCustomerStore from "./customer";
import useCreateCustomerStore from "./createCustomer";
import useEditCustomerStore from "./editCustomer";
import useItemStore from "./item";
import useCreateItemStore from "./createItem";
import useTransactionStore from "./transaction";
import useEditItemStore from "./editItem";

export {
  useEditItemStore,
  useTransactionStore,
  useCreateItemStore,
  useItemStore,
  useEditCustomerStore,
  useCreateCustomerStore,
  useCustomerStore,
  usePendingDeliveryListStore,
  usePendingCustomerListStore,
  useRiderAppointmentsListStore,
  useCheckoutStore,
  useHomeStore,
  useCreateRiderStore,
  useRiderStore,
  useWalkinStore,
  useCreateFaqStore,
  useFaqStore,
  useEditAnnouncementStore,
  useCreateAnnouncementStore,
  useAnnouncementStore,
};

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

// export const useTransactionStore = create((set) => ({
//   transactions: [],
//   pendingDeliveries: [],
//   maxPendingDeliveries: 0,
//   deliveries: [],
//   feedbacks: [],
//   solds: [],
//   noOfTransactions: 0,
//   totalRevenue: 0,
//   total: 0,
//   getNoOfTransactions: async () => {
//     const { data } = await get(`transactions?page=${0}&limit=${0}`);
//     if (data.status == "success") {
//       const noOfTransactions = data.data.reduce(
//         (acc: number, curr: any) => acc + 1,
//         0
//       );
//       const totalRevenue = data.data.reduce(
//         (acc: number, curr: any) => acc + curr.total,
//         0
//       );
//       return set(() => ({ noOfTransactions, totalRevenue }));
//     }
//   },
//   getSolds: async (
//     page = 1,
//     limit = 5,
//     start = getStartDayDate(new Date()),
//     end = getEndDayDate(new Date())
//   ) => {
//     const temp = `transactions?page=${page}&limit=${limit}&filter={"$and": [{ "createdAt": { "$gte": "${start.toISOString()}", "$lte": "${end.toISOString()}" }}, {"$or": [{"$and": [{"__t": "Delivery"}, {"status": "Completed"}]}, {"__t": {"$eq": null}}]}]} `;
//     const { data } = await get(temp);
//     if (data.status == "success") {
//       return set(() => ({ solds: data.data }));
//     }
//   },
//   getFeedbacks: async (page = 1, limit = 5) => {
//     const { data } = await get(
//       `transactions?page=${page}&limit=${limit}&filter={"__t": "Delivery", "feedback": { "$ne": null }}`
//     );
//     if (data.status == "success") {
//       return set(() => ({ feedbacks: data.data }));
//     }
//   },
//   getTransactions: async (
//     page: number = 1,
//     limit: number = 5,
//     filter = "{}"
//   ) => {
//     const { data } = await get(
//       `transactions?page=${page}&limit=${limit}&filter=${filter}`
//     );
//     if (data.status == "success") {
//       return set(() => ({
//         transactions: data.data,
//       }));
//     }
//   },
//   getPendingDeliveries: async (page: number = 1, limit: number = 5) => {
//     const { data } = await get(
//       `transactions?page=${page}&limit=${limit}&filter={"__t": "Delivery", "status": "Pending"}`
//     );
//     if (data.status == "success") {
//       return set(() => ({
//         pendingDeliveries: data.data,
//         maxPendingDeliveries: data.meta.max,
//       }));
//     }
//   },
//   getTotal: async (page: number = 1, limit: number = 5, filter = "{}") => {
//     const { data } = await get(
//       `transactions?page=${page}&limit=${limit}&filter=${filter}`
//     );
//     if (data.status == "success") {
//       return set(() => ({
//         total: data.data.reduce(
//           (acc: number, curr: any) => acc + curr.total,
//           0
//         ),
//       }));
//     }
//   },
//   getDeliveriesByStatuses: async (
//     page: number = 1,
//     limit: number = 5,
//     statuses = []
//   ) => {
//     const query = statuses.map((e: string) => `{"status": "${e}"}`).join(", ");
//     const { data } = await get(
//       `transactions?page=${page}&limit=${limit}&filter={"$or": [${query}]}`
//     );
//     if (data.status == "success") {
//       return set(() => ({ deliveries: data.data }));
//     }
//   },
//   approve: async (_id: string) => {
//     const { data } = await patch(`transactions/${_id}/approve`, {});
//     if (data.status == "success") {
//       return set((state: any) => {
//         const pendingDeliveries = state.pendingDeliveries.map((e: any) => {
//           if (e._id == _id) e.status = "Approved";
//           return e;
//         });
//         const transactions = state.transactions.map((e: any) => {
//           if (e._id == _id) e.status = "Approved";
//           return e;
//         });
//         return {
//           pendingDeliveries,
//           transactions,
//           maxPendingDeliveries: state.maxPendingDeliveries - 1,
//         };
//       });
//     }
//   },
//   decline: async (_id: string) => {
//     const { data } = await patch(`transactions/${_id}/decline`, {});
//     if (data.status == "success") {
//       return set((state: any) => {
//         const temp = state.pendingDeliveries.map((e: any) => {
//           if (e._id == _id) e = data.data[0];
//           return e;
//         });
//         return {
//           pendingDeliveries: temp,
//           maxPendingDeliveries: state.maxPendingDeliveries - 1,
//         };
//       });
//     }
//   },
//   getRiderTransactions: async (rider: string) => {
//     const { data } = await get(`transactions?filter={"rider": "${rider}"}`);
//     console.log(data);

//     if (data.status == "success") {
//       return set(() => ({ transactions: data.data }));
//     }
//   },
//   removeTransaction: async (id: any) => {
//     const { data } = await remove(`transactions/${id}`);
//     if (data.status == "success") {
//       return set((state: any) => ({
//         transactions: [...state.transactions.filter((e: any) => e._id != id)],
//       }));
//     }
//   },
// }));

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
