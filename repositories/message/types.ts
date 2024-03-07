import { IHttpResponse, IQuery } from "@/interfaces";
import { IMessageModel } from "@/models";

export type MessageResponse = IHttpResponse<IMessageModel>;
export type PromiseMessageResponse = Promise<MessageResponse>;

export type GetMessages = (query: IQuery) => PromiseMessageResponse;
export type GetMessageById = (id: string) => PromiseMessageResponse;
export type CreateMessage = (request: any) => PromiseMessageResponse;
export type UpdateMessage = (
  id: string,
  request: any
) => PromiseMessageResponse;
export type DeleteMessage = (id: string) => PromiseMessageResponse;
