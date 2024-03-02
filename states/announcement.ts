import { IAnnouncementModel } from "@/models";
import { deleteAnnouncement, getAnnouncements } from "@/repositories";
import { create } from "zustand";

export interface GetAnnouncementsArgs {
  page?: number;
  limit?: number;
}

export type GetAnnouncements = ({}: GetAnnouncementsArgs) => void;

export interface IAnnouncementStore {
  announcements: IAnnouncementModel[];
  getAnnouncements: GetAnnouncements;
  removeAnnouncement: (id: string) => void;
}

export const useAnnouncementStore = create<IAnnouncementStore>((set) => ({
  announcements: [],
  getAnnouncements: async ({ page = 1, limit = 10 }) => {
    const { data } = await getAnnouncements({ page, limit });
    return set(() => {
      return { announcements: data };
    });
  },
  removeAnnouncement: async (id: string) => {
    const { status } = await deleteAnnouncement(id);
    if (status == "success") {
      return set((state: IAnnouncementStore) => ({
        announcements: [...state.announcements.filter((e: any) => e._id != id)],
      }));
    }
  },
}));
