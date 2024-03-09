// Types & Interfaces
export interface IEditFormData {
  name: string;
  contactNumber: string;
  address: string;
}

export interface IEditCustomerArgs extends IEditFormData {
  image: string;
}

export type SetEditFormData = (form: IEditFormData) => void;
export type GetCustomerById = (id: string) => Promise<void>;
export type UpdateCustomer = (
  id: string,
  body: IEditCustomerArgs
) => Promise<void>;
export type UploadImage = (request: FormData) => Promise<void>;
export type Reset = () => void;

// Actions
export interface IEditCustomerActions {
  getCustomerById: GetCustomerById;
  setEditFormData: SetEditFormData;
  uploadImage: UploadImage;
  updateCustomer: UpdateCustomer;
  reset: Reset;
}

// States
export interface IEditCustomerState {
  editFormData: IEditFormData;
  image: string | null;
  editSuccess: boolean;
}

export type EditCustomerStore = IEditCustomerActions & IEditCustomerState;
