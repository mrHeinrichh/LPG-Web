import { ICreateCustomerState, ICreateFormData } from "./types";

const createFormData: ICreateFormData = {
  name: "",
  contactNumber: "",
  email: "",
  password: "",
  address: "",
  hasAppointment: false,
  verified: false,
  discounted: false,
};

export const initialState: ICreateCustomerState = {
  createFormData,
  createSuccess: false,
  image: null,
};
