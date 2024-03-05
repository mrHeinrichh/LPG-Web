import { IQuery } from "@/interfaces";
import { IAnnouncementModel } from "@/models";

export type GetAnnouncements = (query: IQuery) => void;
export type RemoveAnnouncement = (id: string) => void;
export type SetLimit = (value: number) => void;
export type NextPage = () => void;
export type PreviousPage = () => void;

export interface IAnnouncementActions {
  getAnnouncements: GetAnnouncements;
  removeAnnouncement: RemoveAnnouncement;
  setLimit: SetLimit;
  nextPage: NextPage;
  previousPage: PreviousPage;
}

export interface IAnnouncementState {
  announcements: IAnnouncementModel[];
  page: number;
  limit: number;
}

export type AnnouncementStore = IAnnouncementActions & IAnnouncementState;
