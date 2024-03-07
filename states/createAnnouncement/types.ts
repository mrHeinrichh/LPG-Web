// Types & Interfaces
export interface ICreateFormData {
  text: string;
  start: string;
  end: string;
}

export interface ICreateAnnouncementArgs extends ICreateFormData {
  image: string;
}

export type SetCreateFormData = (form: ICreateFormData) => void;
export type CreateAnnouncement = (
  body: ICreateAnnouncementArgs
) => Promise<void>;
export type UploadImage = (request: FormData) => Promise<void>;
export type Reset = () => void;

// Actions
export interface ICreateAnnouncementActions {
  setCreateFormData: SetCreateFormData;
  uploadImage: UploadImage;
  createAnnouncement: CreateAnnouncement;
  reset: Reset;
}

// States
export interface ICreateAnnouncementState {
  createFormData: ICreateFormData;
  image: string | null;
  createSuccess: boolean;
}

export type CreateAnnouncementStore = ICreateAnnouncementActions &
  ICreateAnnouncementState;
