import { create } from "zustand";
import { ItemStore } from "./types";
import { itemRepository } from "@/repositories";
import { initialState } from "./initialState";

export default create<ItemStore>((set) => {
  const getItems = async ({ page = 1, limit = 10 }) => {
    const { data } = await itemRepository.getItems({
      page,
      limit,
    });
    return set(() => {
      return { items: data };
    });
  };

  const getOverallItems = async ({ page = 0, limit = 0 }) => {
    const { data } = await itemRepository.getItems({
      page,
      limit,
    });
    return set(() => {
      return {
        products: [...data.filter((item) => item.type == "Product")],
        accessories: [...data.filter((item) => item.type == "Accessory")],
      };
    });
  };

  const removeItem = async (id: string) => {
    const { status } = await itemRepository.deleteItem(id);
    if (status == "success") {
      return set((state) => ({
        items: [...state.items.filter((e: any) => e._id != id)],
        products: [...state.items.filter((e: any) => e._id != id)],
        accessories: [...state.items.filter((e: any) => e._id != id)],
      }));
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
  const setSearch = (value: string) => {
    return set(() => {
      return { search: value };
    });
  };

  return {
    setSearch,
    getOverallItems,
    getItems,
    removeItem,
    setLimit,
    nextPage,
    previousPage,
    ...initialState,
  };
});
