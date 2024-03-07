import { IHttpResponse, IQuery } from "@/interfaces";
import { IAnnouncementModel } from "@/models";

export type AnnouncementResponse = IHttpResponse<IAnnouncementModel>;
export type PromiseAnnouncementResponse = Promise<AnnouncementResponse>;

export type GetAnnouncements = (query: IQuery) => PromiseAnnouncementResponse;
export type GetAnnouncementById = (id: string) => PromiseAnnouncementResponse;
export type CreateAnnouncment = (request: any) => PromiseAnnouncementResponse;
export type UpdateAnnouncment = (
  id: string,
  request: any
) => PromiseAnnouncementResponse;
export type DeleteAnnouncements = (id: string) => PromiseAnnouncementResponse;
