import { ISearchFilter } from "@/interfaces";

export const SEARCH_FILTERS: ISearchFilter[] = [
  { key: "name", type: "string" },
  { key: "contactNumber", type: "string" },
  { key: "email", type: "string" },
  { key: "address", type: "string" },
];

export const TABLE_HEADERS: string[] = [
  "Name",
  "Contact Number",
  "Email",
  "Address",
  "Verified",
  "Action",
];
