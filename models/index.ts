export interface IModel {
  _id?: String;
  deleted: boolean;
  createdAt: Date | String;
  updatedAt: Date | String;
}

export interface IAnnouncementModel extends IModel {
  image: string;
  start: Date | string;
  end: Date | string;
  text?: string;
}

export interface IFaqModel extends IModel {
  image: string;
  question: string;
  answer: string;
}
