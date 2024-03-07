import { create } from "zustand";
import {
  EditAnnouncementStore,
  IEditAnnouncementArgs,
  IEditFormData,
} from "./types";
import { initialState } from "./initialState";
import { announcementRepository, uploadRepository } from "@/repositories";
import { parseToInputFieldDate } from "@/utils";

export default create<EditAnnouncementStore>((set) => {
  const getAnnouncementById = async (id: string) => {
    const { data, status } = await announcementRepository.getAnnouncementbyId(
      id
    );

    if (status == "success" && data.length !== 0) {
      return set(() => {
        return {
          editFormData: {
            text: data[0].text ?? "",
            start: parseToInputFieldDate(data[0].start.toString() ?? ""),
            end: parseToInputFieldDate(data[0].end.toString() ?? ""),
          },
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
  const updateAnnouncement = async (
    id: string,
    body: IEditAnnouncementArgs
  ) => {
    const { data, status } = await announcementRepository.updateAnnouncment(
      id,
      body
    );
    if (status == "success" && data.length !== 0) {
      return set(() => ({
        editSuccess: true,
      }));
    }
  };
  const reset = () => {
    return set(() => ({
      ...initialState,
    }));
  };

  return {
    getAnnouncementById,
    reset,
    updateAnnouncement,
    uploadImage,
    setEditFormData,
    ...initialState,
  };
});
