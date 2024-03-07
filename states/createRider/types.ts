// Types & Interfaces
export interface ICreateFormData {
  name: string;
  contactNumber: string;
  address: string;
  gcash: string;
  email: string;
  password: string;
}

export interface ICreateRiderArgs extends ICreateFormData {
  image: string;
  gcashQr: string;
  license: string;
  seminarCert: string;
}

export type SetCreateFormData = (form: ICreateFormData) => void;
export type CreateRider = (form: ICreateRiderArgs) => void;
export type Reset = () => void;
export type UploadImage = (request: FormData) => Promise<void>;
export type UploadGcash = (request: FormData) => Promise<void>;
export type UploadLicense = (request: FormData) => Promise<void>;
export type UploadSeminarCert = (request: FormData) => Promise<void>;

// Actions
export interface ICreateRiderActions {
  setCreateFormData: SetCreateFormData;
  createRider: CreateRider;
  uploadImage: UploadImage;
  uploadGcash: UploadGcash;
  uploadLicense: UploadLicense;
  uploadSeminarCert: UploadSeminarCert;
  reset: Reset;
}

// States
export interface ICreateRiderState {
  createFormData: ICreateFormData;
  createSuccess: boolean;
  image: string | null;
  gcashQr: string | null;
  license: string | null;
  seminarCert: string | null;
}

export type CreateRiderStore = ICreateRiderActions & ICreateRiderState;
