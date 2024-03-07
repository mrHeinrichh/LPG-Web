import { get, patch, post, remove } from "@/config";
import { IQuery } from "@/interfaces";
import {
  FaqResponse,
  CreateFaq,
  DeleteFaqs,
  GetFaqById,
  GetFaqs,
  UpdateFaq,
} from "./types";

export const getFaqs: GetFaqs = async function ({
  page = 1,
  limit = 10,
  filter = "{}",
  populate = "",
}: IQuery) {
  const { data } = await get(
    `faqs?page=${page}&limit=${limit}&filter=${filter}&populate=${populate}`
  );

  return data as FaqResponse;
};

export const getFaqbyId: GetFaqById = async function (id: string) {
  const { data } = await get(`faqs/${id}`);
  return data as FaqResponse;
};

export const createFaq: CreateFaq = async function (body: any) {
  const { data } = await post(`faqs`, body);
  return data as FaqResponse;
};

export const updateAnnouncement: UpdateFaq = async function (
  id: string,
  body: any
) {
  const { data } = await patch(`faqs/${id}`, body);
  return data as FaqResponse;
};

export const deleteFaq: DeleteFaqs = async function (id: string) {
  const { data } = await remove(`faqs/${id}`);
  return data as FaqResponse;
};

export default {
  getFaqs,
  deleteFaq,
  createFaq,
  getFaqbyId,
  updateAnnouncement,
};
