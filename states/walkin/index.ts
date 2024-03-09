import { create } from "zustand";
import { Decrement, Increment, WalkinStore } from "./types";
import { itemRepository } from "@/repositories";
import { initialState } from "./initialState";
import { ICartItemModel, IItemModel } from "@/models";

export default create<WalkinStore>((set) => {
  const getItems = async ({ page = 0, limit = 0 }) => {
    const { data, status } = await itemRepository.getItems({
      page,
      limit,
    });
    if (status === "success") {
      const brandNewTanks = data.filter(
        (e: any) => e.category == "Brand New Tanks"
      );
      const refillTanks = data.filter((e: any) => e.category == "Refill Tanks");
      const accessories = data.filter((e: any) => e.category == "Accessories");
      return set(() => ({ brandNewTanks, refillTanks, accessories }));
    }
  };

  const increment: Increment = (item: IItemModel) => {
    set((state) => {
      const temp = state.cartItems.find((e: any) => e._id == item._id);

      if (!temp) {
        const cartItem: ICartItemModel = { ...item, quantity: 1 };
        const cartItems = [...state.cartItems, cartItem];
        const total = cartItems.reduce(
          (acc: any, curr: any) => acc + curr.customerPrice * curr.quantity,
          0
        );
        return { cartItems, total };
      }

      const cartItems = state.cartItems.map((e: ICartItemModel) => {
        if (e._id == item._id) e.quantity++;
        return e;
      });

      const total = cartItems.reduce(
        (acc: any, curr: any) => acc + curr.customerPrice * curr.quantity,
        0
      );

      return { cartItems, total };
    });
  };

  const decrement: Decrement = (item: ICartItemModel) => {
    set((state) => {
      const temp = state.cartItems.find((e: any) => e._id == item._id);
      if (!temp) {
        return { ...state };
      }

      if (temp.quantity - 1 == 0) {
        const cartItems = state.cartItems.filter((e: any) => e._id != item._id);

        const total = cartItems.reduce(
          (acc: any, curr: any) => acc + curr.customerPrice * curr.quantity,
          0
        );
        return { cartItems, total };
      }

      const cartItems = state.cartItems.map((e: any) => {
        if (e._id == item._id) e.quantity--;
        return e;
      });

      const total = cartItems.reduce(
        (acc: any, curr: any) => acc + curr.customerPrice * curr.quantity,
        0
      );

      return { cartItems, total };
    });
  };
  const reset = () => {
    return set(() => ({
      ...initialState,
    }));
  };
  return { reset, decrement, increment, getItems, ...initialState };
});
