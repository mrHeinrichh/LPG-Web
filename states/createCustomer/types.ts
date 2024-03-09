// Types & Interfaces
export interface ICreateFormData {
  name: string;
  contactNumber: string;
  email: string;
  password: string;
  address: string;
  hasAppointment: boolean;
  verified: boolean;
  discounted: boolean;
}

export interface ICreateCustomerArgs extends ICreateFormData {
  image: string;
}

export type SetCreateFormData = (form: ICreateFormData) => void;
export type CreateCustomer = (form: ICreateCustomerArgs) => void;
export type Reset = () => void;
export type UploadImage = (request: FormData) => Promise<void>;
// Actions
export interface ICreateCustomerActions {
  setCreateFormData: SetCreateFormData;
  createCustomer: CreateCustomer;
  uploadImage: UploadImage;
  reset: Reset;
}

// States
export interface ICreateCustomerState {
  createFormData: ICreateFormData;
  createSuccess: boolean;
  image: string | null;
}

export type CreateCustomerStore = ICreateCustomerActions & ICreateCustomerState;
