// Types & Interfaces
export interface IEditFormData {
  text: string;
  start: string;
  end: string;
}

export interface IEditAnnouncementArgs extends IEditFormData {
  image: string;
}

export type SetEditFormData = (form: IEditFormData) => void;
export type GetAnnouncementById = (id: string) => Promise<void>;
export type UpdateAnnouncement = (
  id: string,
  body: IEditAnnouncementArgs
) => Promise<void>;
export type UploadImage = (request: FormData) => Promise<void>;
export type Reset = () => void;

// Actions
export interface IEditAnnouncementActions {
  getAnnouncementById: GetAnnouncementById;
  setEditFormData: SetEditFormData;
  uploadImage: UploadImage;
  updateAnnouncement: UpdateAnnouncement;
  reset: Reset;
}

// States
export interface IEditAnnouncementState {
  editFormData: IEditFormData;
  image: string | null;
  editSuccess: boolean;
}

export type EditAnnouncementStore = IEditAnnouncementActions &
  IEditAnnouncementState;
