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

export type Baranggay =
  | "All"
  | "Bagumbayan"
  | "Bambang"
  | "Calzada Tipas"
  | "Central Bicutan"
  | "Central Signal Village"
  | "Cembo"
  | "Comembo"
  | "East Rembo"
  | "Fort Bonifacio"
  | "Hagonoy"
  | "Ibayo Tipas"
  | "Katuparan"
  | "Ligid Tipas"
  | "Lower Bicutan"
  | "Maharlika Village"
  | "Napindan"
  | "New Lower Bicutan"
  | "North Daang Hari"
  | "North Signal Village"
  | "Palingon Tipas"
  | "Pembo"
  | "Pinagsama"
  | "Pitogo"
  | "Post Proper Northside"
  | "Post Proper Southside"
  | "Rizal"
  | "San Miguel"
  | "Santa Ana"
  | "South Cembo"
  | "South Daang Hari"
  | "South Signal Village"
  | "Tanyag"
  | "Tuktukan"
  | "Ususan"
  | "Upper Bicutan"
  | "Wawa"
  | "West Rembo"
  | "Western Bicutan";
