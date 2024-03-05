import { get, remove } from "@/config";
import { IHttpResponse, IQuery } from "@/interfaces";
import { IAnnouncementModel } from "@/models";

export async function getAnnouncements({
  page = 1,
  limit = 10,
  filter = "{}",
  populate = "",
}: IQuery) {
  return (
    await get(
      `announcements?page=${page}&limit=${limit}&filter=${filter}&populate=${populate}`
    )
  ).data as IHttpResponse<IAnnouncementModel>;
}

export async function deleteAnnouncement(id: string) {
  return (await remove(`announcements/${id}`))
    .data as IHttpResponse<IAnnouncementModel>;
}

export default { getAnnouncements, deleteAnnouncement };
