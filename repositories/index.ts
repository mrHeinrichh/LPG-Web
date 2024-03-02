import { get, remove } from "@/config";
import { IAnnouncementModel } from "@/models";

export type ResponseStatus = "success" | "failed";

export interface IHttpResponseMeta {
  refresh?: string;
  access?: string;
  page?: Number;
  max?: Number;
  limit?: Number;
}

export interface IHttpResponse<T> {
  data: T[];
  status: ResponseStatus;
  message: string;
  meta?: IHttpResponseMeta;
}

export async function getAnnouncements({ page = 1, limit = 10 }) {
  return (await get(`announcements?page=${page}&limit=${limit}`))
    .data as IHttpResponse<IAnnouncementModel>;
}

export async function deleteAnnouncement(id: string) {
  return (await remove(`announcements/${id}`))
    .data as IHttpResponse<IAnnouncementModel>;
}
