import { create } from "zustand";
import {
  EditItemStore,
  IEditItemArgs,
  IEditFormData,
  IEditCustomerPriceFormData,
  IEditRetailerPriceFormData,
} from "./types";
import { initialState } from "./initialState";
import { itemRepository, uploadRepository } from "@/repositories";

export default create<EditItemStore>((set) => {
  const getItemById = async (id: string) => {
    const { data, status } = await itemRepository.getItembyId(id);
    if (status == "success" && data.length !== 0) {
      return set(() => {
        return {
          editFormData: {
            name: data[0].name ?? "",
            category: data[0].category ?? "",
            description: data[0].description ?? "",
            weight: data[0].weight ?? 0,
            stock: data[0].stock ?? 0,
            type: data[0].type ?? "",
          },
          retailerPrice: data[0].retailerPrice ?? 0,
          customerPrice: data[0].customerPrice ?? 0,
          image: data[0].image,
        };
      });
    }
  };

  const setEditFormData = (form: IEditFormData) => {
    return set(() => ({
      editFormData: form,
    }));
  };

  const uploadImage = async (form: FormData) => {
    const { data, status } = await uploadRepository.uploadImage(form);
    if (status == "success") {
      return set(() => ({
        image: data[0].path ?? "",
      }));
    }
  };
  const updateItem = async (id: string, body: IEditItemArgs) => {
    const { data, status } = await itemRepository.updateItem(id, {
      ...body,
    });

    if (status == "success" && data.length !== 0) {
      return set(() => ({
        editSuccess: true,
      }));
    }
  };

  const updateItemCustomerPrice = async (id: string, body: any) => {
    const { data, status, message } = await itemRepository.updatePrice(id, {
      ...body,
      price: body.customerPrice,
      reason: body.reason == "" ? body.reason : null,
      type: "Customer",
    });
    console.log({ data, status, message });

    if (status == "success" && data.length !== 0) {
      return set(() => ({
        editSuccess: true,
      }));
    }
  };

  const updateItemRetailerPrice = async (id: string, body: any) => {
    const { data, status } = await itemRepository.updatePrice(id, {
      ...body,
      reason: body.reason == "" ? body.reason : null,
      price: body.retailerPrice,
      type: "Retailer",
    });

    if (status == "success" && data.length !== 0) {
      return set(() => ({
        editSuccess: true,
      }));
    }
  };

  const setCustomerPriceFormData = (value: IEditCustomerPriceFormData) => {
    return set(() => ({
      editCustomerPriceFormData: value,
    }));
  };

  const setRetailerPriceData = (value: IEditRetailerPriceFormData) => {
    return set(() => ({
      editRetailerPriceFormData: value,
    }));
  };

  const reset = () => {
    return set(() => ({
      ...initialState,
    }));
  };

  return {
    updateItemRetailerPrice,
    updateItemCustomerPrice,
    setRetailerPriceData,
    setCustomerPriceFormData,
    getItemById,
    reset,
    updateItem,
    uploadImage,
    setEditFormData,
    ...initialState,
  };
});
