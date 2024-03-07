import { ICreateFaqState, ICreateFormData } from "./types";

const createFormData: ICreateFormData = {
  question: "",
  answer: "",
};

export const initialState: ICreateFaqState = {
  createFormData,
  createSuccess: false,
  image: null,
};
