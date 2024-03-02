export interface IModel {
  _id?: String;
  deleted: boolean;
  createdAt: Date | String;
  updatedAt: Date | String;
}

export interface IAnnouncementModel extends IModel {
  _id?: String;
  image: String;
  start: Date | String;
  end: Date | String;
  text?: String;
  deleted: boolean;
}
