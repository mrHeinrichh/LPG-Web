import { ISearchFilter } from "@/interfaces";

export const SEARCH_FILTERS: ISearchFilter[] = [
  { key: "name", type: "string" },
  { key: "contactNumber", type: "string" },
  { key: "total", type: "number" },
];

export const TABLE_HEADERS: string[] = [
  "Name",
  "Contact Number",
  "Type",
  "Total",
  "Date Created",
  "Action",
];
