// Types & Interfaces
export interface ICreateFormData {
  name: string;
  category: string;
  description: string;
  weight: number;
  stock: number;
  customerPrice: number;
  retailerPrice: number;
}

export interface ICreateItemArgs extends ICreateFormData {
  image: string;
}

export type SetCreateFormData = (form: ICreateFormData) => void;
export type CreateItem = (form: ICreateItemArgs) => void;
export type Reset = () => void;
export type UploadImage = (request: FormData) => Promise<void>;
// Actions
export interface ICreateItemActions {
  setCreateFormData: SetCreateFormData;
  createItem: CreateItem;
  uploadImage: UploadImage;
  reset: Reset;
}

// States
export interface ICreateItemState {
  createFormData: ICreateFormData;
  createSuccess: boolean;
  image: string | null;
}

export type CreateItemStore = ICreateItemActions & ICreateItemState;
