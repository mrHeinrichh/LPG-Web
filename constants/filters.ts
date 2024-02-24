import { FieldOption } from "@/interfaces";
import { BARANGGAYS } from "./baranggays";

const TIME_FILTERS: FieldOption[] = [
  {
    value: "Daily",
    title: "Daily",
  },
  {
    value: "Weekly",
    title: "Weekly",
  },
  {
    value: "Monthly",
    title: "Monthly",
  },
  {
    value: "Yearly",
    title: "Yearly",
  },
];

const BARANGGAY_FILTERS = BARANGGAYS.map((e: any) => ({
  value: e,
  title: e,
}));

export default { BARANGGAY_FILTERS, TIME_FILTERS };
