import { create } from "zustand";
import { CreateItemStore, ICreateFormData, ICreateItemArgs } from "./types";
import { initialState } from "./initialState";
import { itemRepository, uploadRepository } from "@/repositories";

export default create<CreateItemStore>((set) => {
  const setCreateFormData = (form: ICreateFormData) => {
    return set(() => ({
      createFormData: form,
    }));
  };

  const createItem = async (body: ICreateItemArgs) => {
    const { data, status, message } = await itemRepository.createItem(body);

    if (status == "success" && data.length !== 0) {
      return set(() => ({
        createSuccess: true,
      }));
    }
  };

  const uploadImage = async (form: FormData) => {
    const { data, status } = await uploadRepository.uploadImage(form);
    if (status == "success") {
      return set(() => ({
        image: data[0].path ?? "",
      }));
    }
  };

  const reset = () => {
    return set(() => ({
      ...initialState,
    }));
  };

  return {
    uploadImage,
    reset,
    createItem,
    setCreateFormData,
    ...initialState,
  };
});
