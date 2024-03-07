import { IHttpResponse, IQuery } from "@/interfaces";
import { IItemModel, IPriceModel } from "@/models";

export type PriceResponse = IHttpResponse<IPriceModel<IItemModel>>;
export type PromisePriceResponse = Promise<PriceResponse>;

export type GetPrices = (query: IQuery) => PromisePriceResponse;
export type GetPriceById = (id: string) => PromisePriceResponse;
export type CreatePrice = (request: any) => PromisePriceResponse;
export type UpdatePrice = (id: string, request: any) => PromisePriceResponse;
export type DeletePrice = (id: string) => PromisePriceResponse;
