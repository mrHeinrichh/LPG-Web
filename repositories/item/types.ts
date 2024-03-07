import { IHttpResponse, IQuery } from "@/interfaces";
import { IItemModel } from "@/models";

export type ItemResponse = IHttpResponse<IItemModel>;
export type PromiseItemResponse = Promise<ItemResponse>;

export type GetItems = (query: IQuery) => PromiseItemResponse;
export type GetItemById = (id: string) => PromiseItemResponse;
export type CreateItem = (request: any) => PromiseItemResponse;
export type UpdateItem = (id: string, request: any) => PromiseItemResponse;
export type DeleteItem = (id: string) => PromiseItemResponse;
