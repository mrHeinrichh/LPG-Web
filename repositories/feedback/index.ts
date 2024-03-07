import { get, patch, post, remove } from "@/config";
import { IQuery } from "@/interfaces";
import {
  FeedbackResponse,
  CreateFeedback,
  DeleteFeedbacks,
  GetFeedbackById,
  GetFeedbacks,
  UpdateFeedback,
} from "./types";

export const getFeedbacks: GetFeedbacks = async function ({
  page = 1,
  limit = 10,
  filter = "{}",
  populate = "",
}: IQuery) {
  const { data } = await get(
    `feedbacks?page=${page}&limit=${limit}&filter=${filter}&populate=${populate}`
  );

  return data as FeedbackResponse;
};

export const getFeedbackbyId: GetFeedbackById = async function (id: string) {
  const { data } = await get(`feedbacks/${id}`);
  return data as FeedbackResponse;
};

export const createFeedback: CreateFeedback = async function (body: any) {
  const { data } = await post(`feedbacks`, body);
  return data as FeedbackResponse;
};

export const updateFeedback: UpdateFeedback = async function (
  id: string,
  body: any
) {
  const { data } = await patch(`feedbacks/${id}`, body);
  return data as FeedbackResponse;
};

export const deleteFeedback: DeleteFeedbacks = async function (id: string) {
  const { data } = await remove(`feedbacks/${id}`);
  return data as FeedbackResponse;
};

export default {
  getFeedbacks,
  deleteFeedback,
  createFeedback,
  getFeedbackbyId,
  updateFeedback,
};
