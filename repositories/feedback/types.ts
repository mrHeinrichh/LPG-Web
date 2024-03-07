import { IHttpResponse, IQuery } from "@/interfaces";
import { IFeedbackModel } from "@/models";

export type FeedbackResponse = IHttpResponse<IFeedbackModel>;
export type PromiseFeedbackResponse = Promise<FeedbackResponse>;

export type GetFeedbacks = (query: IQuery) => PromiseFeedbackResponse;
export type GetFeedbackById = (id: string) => PromiseFeedbackResponse;
export type CreateFeedback = (request: any) => PromiseFeedbackResponse;
export type UpdateFeedback = (
  id: string,
  request: any
) => PromiseFeedbackResponse;
export type DeleteFeedbacks = (id: string) => PromiseFeedbackResponse;
