import { IHttpResponse, IQuery } from "@/interfaces";
import { IFaqModel } from "@/models";

export type FaqResponse = IHttpResponse<IFaqModel>;
export type PromiseFaqResponse = Promise<FaqResponse>;

export type GetFaqs = (query: IQuery) => PromiseFaqResponse;
export type GetFaqById = (id: string) => PromiseFaqResponse;
export type CreateFaq = (request: any) => PromiseFaqResponse;
export type UpdateFaq = (id: string, request: any) => PromiseFaqResponse;
export type DeleteFaqs = (id: string) => PromiseFaqResponse;
