import { ISearchFilter } from "@/interfaces";

export const SEARCH_FILTERS: ISearchFilter[] = [
  { key: "type", type: "string" },
  { key: "name", type: "string" },
  { key: "category", type: "string" },
  { key: "customerPrice", type: "number" },
  { key: "retailerPrice", type: "number" },
  { key: "stock", type: "number" },
  { key: "weight", type: "number" },
];

export const TABLE_HEADERS: string[] = [
  "Name",
  "Category",
  "Stock",
  "Weight",
  "Customer Price",
  "Retailer Price",
  "Type",
  "Action",
];
