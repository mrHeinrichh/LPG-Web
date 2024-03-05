import { create } from "zustand";
import { AnnouncementStore } from "./types";
import { announcementRepository } from "@/repositories";
import { initialState } from "./initialState";

export default create<AnnouncementStore>((set) => {
  const getAnnouncements = async ({ page = 1, limit = 10 }) => {
    const { data } = await announcementRepository.getAnnouncements({
      page,
      limit,
    });
    return set(() => {
      return { announcements: data };
    });
  };
  const removeAnnouncement = async (id: string) => {
    const { status } = await announcementRepository.deleteAnnouncement(id);
    if (status == "success") {
      return set((state) => ({
        announcements: [...state.announcements.filter((e: any) => e._id != id)],
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
  return {
    getAnnouncements,
    removeAnnouncement,
    setLimit,
    nextPage,
    previousPage,
    ...initialState,
  };
});
