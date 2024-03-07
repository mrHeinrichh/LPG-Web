// Types & Interfaces
export interface ICreateFormData {
  question: string;
  answer: string;
}

export interface ICreateFaqArgs extends ICreateFormData {
  image: string;
}

export type SetCreateFormData = (form: ICreateFormData) => void;
export type CreateFaq = (form: ICreateFaqArgs) => void;
export type Reset = () => void;
export type UploadImage = (request: FormData) => Promise<void>;
// Actions
export interface ICreateFaqActions {
  setCreateFormData: SetCreateFormData;
  createFaq: CreateFaq;
  uploadImage: UploadImage;
  reset: Reset;
}

// States
export interface ICreateFaqState {
  createFormData: ICreateFormData;
  createSuccess: boolean;
  image: string | null;
}

export type CreateFaqStore = ICreateFaqActions & ICreateFaqState;
