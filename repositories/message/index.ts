import { get, patch, post, remove } from "@/config";
import { IQuery } from "@/interfaces";
import {
  MessageResponse,
  CreateMessage,
  DeleteMessage,
  GetMessageById,
  GetMessages,
  UpdateMessage,
} from "./types";

export const getMessages: GetMessages = async function ({
  page = 1,
  limit = 10,
  filter = "{}",
  populate = "",
}: IQuery) {
  const { data } = await get(
    `messages?page=${page}&limit=${limit}&filter=${filter}&populate=${populate}`
  );

  return data as MessageResponse;
};

export const getMessagebyId: GetMessageById = async function (id: string) {
  const { data } = await get(`messages/${id}`);
  return data as MessageResponse;
};

export const createMessage: CreateMessage = async function (body: any) {
  const { data } = await post(`messages`, body);
  return data as MessageResponse;
};

export const updateMessage: UpdateMessage = async function (
  id: string,
  body: any
) {
  const { data } = await patch(`messages/${id}`, body);
  return data as MessageResponse;
};

export const deleteMessage: DeleteMessage = async function (id: string) {
  const { data } = await remove(`messages/${id}`);
  return data as MessageResponse;
};

export default {
  getMessages,
  deleteMessage,
  createMessage,
  getMessagebyId,
  updateMessage,
};
