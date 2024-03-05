import { ICreateAnnouncementState, ICreateFormData } from "./types";

const createFormData: ICreateFormData = {
  text: "",
  start: "",
  end: "",
};

export const initialState: ICreateAnnouncementState = {
  createFormData,
  image: null,
  createSuccess: false,
};
