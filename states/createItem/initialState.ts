import { ICreateItemState, ICreateFormData } from "./types";

const createFormData: ICreateFormData = {
  name: "",
  category: "Brand New Tanks",
  description: "",
  weight: 0,
  stock: 1,
  customerPrice: 0,
  retailerPrice: 0,
};

export const initialState: ICreateItemState = {
  createFormData,
  createSuccess: false,
  image: null,
};
