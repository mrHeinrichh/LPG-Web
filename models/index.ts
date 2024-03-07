export interface IModel {
  _id?: String;
  deleted: boolean;
  createdAt: Date | String;
  updatedAt: Date | String;
}

export interface IAnnouncementModel extends IModel {
  _id?: string;
  image: string;
  start: Date | string;
  end: Date | string;
  text?: string;
  deleted: boolean;
}
