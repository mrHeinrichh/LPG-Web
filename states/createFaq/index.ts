import { create } from "zustand";
import { CreateFaqStore, ICreateFaqArgs, ICreateFormData } from "./types";
import { initialState } from "./initialState";
import { faqRepository, uploadRepository } from "@/repositories";

export default create<CreateFaqStore>((set) => {
  const setCreateFormData = (form: ICreateFormData) => {
    return set(() => ({
      createFormData: form,
    }));
  };

  const createFaq = async (body: ICreateFaqArgs) => {
    const { data, status } = await faqRepository.createFaq(body);
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
    createFaq,
    setCreateFormData,
    ...initialState,
  };
});
// // Types & Interfaces
// export interface ICreateFormData {
//   text: string;
//   start: string;
//   end: string;
// }

// export interface ICreateFaqArgs extends ICreateFormData {
//   image: string;
// }

// export type SetCreateFormData = (form: ICreateFormData) => void;
// export type CreateFaq = (body: ICreateFaqArgs) => Promise<void>;
// export type UploadImage = (request: FormData) => Promise<void>;
// export type Reset = () => void;

// // Actions
// export interface ICreateFaqActions {
//   setCreateFormData: SetCreateFormData;
//   uploadImage: UploadImage;
//   createFaq: CreateFaq;
//   reset: Reset;
// }

// // States
// export interface ICreateFaqState {
//   createFormData: ICreateFormData;
//   image: string | null;
//   createSuccess: boolean;
// }

// export type CreateFaqStore = ICreateFaqActions & ICreateFaqState;
