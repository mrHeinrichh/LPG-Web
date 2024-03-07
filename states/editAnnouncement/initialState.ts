import { IEditAnnouncementState, IEditFormData } from "./types";

const editFormData: IEditFormData = {
  text: "",
  start: "",
  end: "",
};

export const initialState: IEditAnnouncementState = {
  editFormData,
  image: null,
  editSuccess: false,
};
