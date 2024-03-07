import { ICreateRiderState, ICreateFormData } from "./types";

const createFormData: ICreateFormData = {
  name: "",
  contactNumber: "",
  address: "",
  gcash: "",
  email: "",
  password: "",
};

export const initialState: ICreateRiderState = {
  createFormData,
  createSuccess: false,
  image: null,
  gcashQr: null,
  license: null,
  seminarCert: null,
};
