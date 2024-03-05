export type TimeFilter = "Daily" | "Weekly" | "Monthly" | "Yearly";

export interface FieldOption {
  value: string | number;
  title: string;
}

export interface ISelectField {
  options: FieldOption[];
  name: string;
  title: string;
  defaultValue?: string;
  onChange: (e: any) => void;
}
export interface ISearchFilter {
  key: string;
  type: "string" | "number";
}

export type ItemCategory = "Brand New Tanks" | "Refill Tanks" | "Accessories";

export type ResponseStatus = "success" | "failed";

export interface IHttpResponseMeta {
  refresh?: string;
  access?: string;
  page?: Number;
  max?: Number;
  limit?: Number;
}

export interface IHttpResponse<T> {
  data: T[];
  status: ResponseStatus;
  message: string;
  meta?: IHttpResponseMeta;
}

export interface IQuery {
  page?: number;
  limit?: number;
  filter?: string;
  populate?: string;
}
export type TransationStatus =
  | "Pending"
  | "Approved"
  | "Declined"
  | "Completed"
  | "On Going"
  | "Cancelled";
export type AppointmentStatus = "Pending" | "Approved" | "Declined";
