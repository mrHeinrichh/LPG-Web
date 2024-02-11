import { MUTIPLIERS } from "@/constants";
import { ISearchFilter, TimeFilter } from "@/interfaces";

export function isNumber(string: string) {
  return /^[0-9]*$/.test(string);
}

export function getSearchFilterQuery(
  searchFilters: ISearchFilter[],
  string: string
) {
  const parsed = searchFilters.map((e: any) => {
    if (e.type === "string") {
      return `{ "${e.key}": {"$regex": "${string}", "$options": "i" }}`;
    }

    if (e.type === "number") {
      return isNumber(string) ? `{"${e.key}": ${string}}` : "";
    }
  });

  const filtered = parsed.filter((e: any) => e != "");
  const joined = filtered.join(",");
  return `{ "$or": [ ${joined} ] }`;
}

export function getStartDayDate(date: Date): Date {
  const now = date.getTime();
  return new Date(now - (now % 86400000));
}

export function getDates(filter: TimeFilter, units: number): Date[] {
  const temp: Date[] = [];

  if (filter == "Daily") {
    for (let i: number = units; i > 0; i--) {
      const todayDate = new Date();
      todayDate.setDate(todayDate.getDate() - (i + MUTIPLIERS.DAILY) + 1);
      temp.push(todayDate);
    }
  }

  if (filter == "Weekly") {
    for (let i: number = units; i > 0; i--) {
      const todayDate = new Date();
      todayDate.setDate(todayDate.getDate() - i * MUTIPLIERS.WEEKLY + 1);
      temp.push(todayDate);
    }
  }

  if (filter == "Monthly") {
    for (let i: number = units; i > 0; i--) {
      const todayDate = new Date();
      todayDate.setDate(todayDate.getDate() - i * MUTIPLIERS.MONTHLY + 1);
      temp.push(todayDate);
    }
  }

  if (filter == "Yearly") {
    for (let i: number = units; i > 0; i--) {
      const todayDate = new Date();
      todayDate.setDate(todayDate.getDate() - i * MUTIPLIERS.YEARLY + 1);
      temp.push(todayDate);
    }
  }

  return temp;
}

export function getMutiplier(filter: TimeFilter): number {
  if (filter == "Daily") {
    return MUTIPLIERS.DAILY;
  }

  if (filter == "Weekly") {
    return MUTIPLIERS.WEEKLY;
  }

  if (filter == "Monthly") {
    return MUTIPLIERS.MONTHLY;
  }

  if (filter == "Yearly") {
    return MUTIPLIERS.YEARLY;
  }

  return MUTIPLIERS.DAILY;
}
