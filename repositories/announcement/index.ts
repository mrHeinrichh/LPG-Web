import { get, patch, post, remove } from "@/config";
import { IQuery } from "@/interfaces";
import {
  AnnouncementResponse,
  CreateAnnouncement,
  DeleteAnnouncements,
  GetAnnouncementById,
  GetAnnouncements,
  UpdateAnnouncement,
} from "./types";

export const getAnnouncements: GetAnnouncements = async function ({
  page = 1,
  limit = 10,
  filter = "{}",
  populate = "",
}: IQuery) {
  const { data } = await get(
    `announcements?page=${page}&limit=${limit}&filter=${filter}&populate=${populate}`
  );

  return data as AnnouncementResponse;
};

export const getAnnouncementbyId: GetAnnouncementById = async function (
  id: string
) {
  const { data } = await get(`announcements/${id}`);
  return data as AnnouncementResponse;
};

export const createAnnouncement: CreateAnnouncement = async function (
  body: any
) {
  const { data } = await post(`announcements`, body);
  return data as AnnouncementResponse;
};

export const updateAnnouncement: UpdateAnnouncement = async function (
  id: string,
  body: any
) {
  const { data } = await patch(`announcements/${id}`, body);
  return data as AnnouncementResponse;
};

export const deleteAnnouncement: DeleteAnnouncements = async function (
  id: string
) {
  const { data } = await remove(`announcements/${id}`);
  return data as AnnouncementResponse;
};

export default {
  getAnnouncements,
  deleteAnnouncement,
  createAnnouncement,
  getAnnouncementbyId,
  updateAnnouncement,
};
