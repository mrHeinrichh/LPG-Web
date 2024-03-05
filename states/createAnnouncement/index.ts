import { create } from "zustand";
import {
  CreateAnnouncementStore,
  ICreateAnnouncementArgs,
  ICreateFormData,
} from "./types";
import { initialState } from "./initialState";
import { announcementRepository, uploadRepository } from "@/repositories";

export default create<CreateAnnouncementStore>((set) => {
  const setCreateFormData = (form: ICreateFormData) => {
    return set(() => ({
      createFormData: form,
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

  const createAnnouncement = async (body: ICreateAnnouncementArgs) => {
    const { data, status } = await announcementRepository.createAnnouncement(
      body
    );
    if (status == "success" && data.length !== 0) {
      return set(() => ({
        createSuccess: true,
      }));
    }
  };

  const reset = () => {
    return set(() => ({
      ...initialState,
    }));
  };

  return {
    reset,
    createAnnouncement,
    uploadImage,
    setCreateFormData,
    ...initialState,
  };
});
