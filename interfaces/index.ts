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
