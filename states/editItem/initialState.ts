import {
  IEditItemState,
  IEditFormData,
  IEditCustomerPriceFormData,
  IEditRetailerPriceFormData,
} from "./types";

const editFormData: IEditFormData = {
  name: "",
  category: "",
  description: "",
  weight: 0,
  stock: 1,
  type: "",
};

const editCustomerPriceFormData: IEditCustomerPriceFormData = {
  customerPrice: 0,
  reason: "",
};

const editRetailerPriceFormData: IEditRetailerPriceFormData = {
  retailerPrice: 0,
  reason: "",
};

export const initialState: IEditItemState = {
  editFormData,
  editCustomerPriceFormData,
  editRetailerPriceFormData,
  image: null,
  editSuccess: false,
  customerPrice: 0,
  retailerPrice: 0,
};
