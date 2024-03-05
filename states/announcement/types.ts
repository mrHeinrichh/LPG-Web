import { IQuery } from "@/interfaces";
import { IAnnouncementModel } from "@/models";

// Types & Interfaces
export type GetAnnouncements = (query: IQuery) => void;
export type RemoveAnnouncement = (id: string) => void;
export type SetLimit = (value: number) => void;
export type NextPage = () => void;
export type PreviousPage = () => void;

// Actions
export interface IAnnouncementActions {
  getAnnouncements: GetAnnouncements;
  removeAnnouncement: RemoveAnnouncement;
  setLimit: SetLimit;
  nextPage: NextPage;
  previousPage: PreviousPage;
}

// States
export interface IAnnouncementState {
  announcements: IAnnouncementModel[];
  page: number;
  limit: number;
}

export type AnnouncementStore = IAnnouncementActions & IAnnouncementState;
