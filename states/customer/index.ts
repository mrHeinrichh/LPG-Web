import { create } from "zustand";
import { CustomerStore } from "./types";
import { userRepository } from "@/repositories";
import { initialState } from "./initialState";
import { ICustomerModel } from "@/models";

export default create<CustomerStore>((set) => {
  const getCustomers = async ({ page = 1, limit = 10 }) => {
    const { data, status } = await userRepository.getUsers<ICustomerModel>({
      page,
      limit,
      filter: `{"__t": "Customer"}`,
    });

    if (status == "success") {
      return set(() => {
        return { customers: data };
      });
    }
  };

  const setLimit = (value: number) => {
    return set(() => ({
      limit: value,
    }));
  };
  const nextPage = () => {
    return set((state) => ({
      page: state.page + 1,
    }));
  };
  const previousPage = () => {
    return set((state) => {
      if (state.page > 1) {
        return {
          page: state.page - 1,
        };
      }
      return { ...state };
    });
  };

  const getOverallCustomers = async ({ page = 0, limit = 0 }) => {
    const { data, status } = await userRepository.getUsers<ICustomerModel>({
      page,
      limit,
      filter: `{"__t": "Customer"}`,
    });

    if (status == "success") {
      return set(() => {
        return {
          overallCustomers: data,
          verifiedCustomers: data.filter((e: any) => e.verified),
        };
      });
    }
  };

  const removeCustomer = async (id: string) => {
    const { status } = await userRepository.deleteUser(id);
    if (status == "success") {
      return set((state) => ({
        customers: [...state.customers.filter((e: any) => e._id != id)],
        overallCustomers: [
          ...state.overallCustomers.filter((e: any) => e._id != id),
        ],
        verifiedCustomers: [
          ...state.verifiedCustomers.filter((e: any) => e._id != id),
        ],
      }));
    }
  };

  return {
    getOverallCustomers,
    getCustomers,
    removeCustomer,
    setLimit,
    nextPage,
    previousPage,
    ...initialState,
  };
});
