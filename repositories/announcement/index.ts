import { get, post, remove } from "@/config";
import { IQuery } from "@/interfaces";
import {
  AnnouncementResponse,
  CreateAnnouncment,
  DeleteAnnouncements,
  GetAnnouncements,
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

export const createAnnouncement: CreateAnnouncment = async function (
  body: any
) {
  const { data } = await post(`announcements`, body);
  return data as AnnouncementResponse;
};

export const deleteAnnouncement: DeleteAnnouncements = async function (
  id: string
) {
  const { data } = await remove(`announcements/${id}`);
  return data as AnnouncementResponse;
};

export default { getAnnouncements, deleteAnnouncement, createAnnouncement };
