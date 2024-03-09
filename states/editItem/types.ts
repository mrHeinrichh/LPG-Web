import { ItemType } from "@/models";

// Types & Interfaces
export interface IEditFormData {
  name: string;
  category: string;
  description: string;
  weight: number;
  stock: number;
  type: ItemType | string;
}

export interface IEditCustomerPriceFormData {
  customerPrice: number;
  reason: string;
}

export interface IEditRetailerPriceFormData {
  retailerPrice: number;
  reason: string;
}

export interface IEditItemArgs extends IEditFormData {
  image: string;
}

export type SetEditFormData = (form: IEditFormData) => void;
export type SetCustomerPriceData = (form: IEditCustomerPriceFormData) => void;
export type SetRetailerPriceData = (form: IEditRetailerPriceFormData) => void;
export type GetItemById = (id: string) => Promise<void>;
export type UpdateItem = (id: string, body: IEditItemArgs) => Promise<void>;
// TODO: Add types
export type UpdateItemCustomerPrice = (id: string, body: any) => Promise<void>;
// TODO: Add types
export type UpdateItemRetailerPrice = (id: string, body: any) => Promise<void>;
export type UploadImage = (request: FormData) => Promise<void>;
export type Reset = () => void;

// Actions
export interface IEditItemActions {
  getItemById: GetItemById;
  setCustomerPriceFormData: SetCustomerPriceData;
  setRetailerPriceData: SetRetailerPriceData;
  setEditFormData: SetEditFormData;
  uploadImage: UploadImage;
  updateItem: UpdateItem;
  updateItemCustomerPrice: UpdateItemCustomerPrice;
  updateItemRetailerPrice: UpdateItemRetailerPrice;
  reset: Reset;
}
// States
export interface IEditItemState {
  editFormData: IEditFormData;
  editCustomerPriceFormData: IEditCustomerPriceFormData;
  editRetailerPriceFormData: IEditRetailerPriceFormData;
  image: string | null;
  editSuccess: boolean;
  customerPrice: number;
  retailerPrice: number;
}

export type EditItemStore = IEditItemActions & IEditItemState;
