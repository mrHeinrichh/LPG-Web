import { IEditCustomerState, IEditFormData } from "./types";

const editFormData: IEditFormData = {
  name: "",
  contactNumber: "",
  address: "",
};

export const initialState: IEditCustomerState = {
  editFormData,
  image: null,
  editSuccess: false,
};
