import { MUTIPLIERS } from "@/constants";
import {
  Baranggay,
  ISearchFilter,
  ItemCategory,
  TimeFilter,
} from "@/interfaces";
import { IDeliveryModel, ITransactionModel } from "@/models";

export function filterTransactionsByBaranggay(
  transactions: IDeliveryModel[],
  baranggay: Baranggay
) {
  if (baranggay != "All") {
    return transactions.filter((transaction) => {
      return transaction.__t == "Delivery" && transaction.barangay == baranggay;
    });
  }

  return transactions;
}

export function filterTransactionsByTimeSpan(
  transactions: ITransactionModel[],
  date: Date,
  multiplier: number
) {
  return transactions.filter((transaction) => {
    return (
      date.getTime() <=
        getStartDayDate(new Date(transaction.createdAt)).getTime() &&
      date.getTime() + 86399999 * multiplier >=
        getStartDayDate(new Date(transaction.createdAt)).getTime()
    );
  });
}

export function parseDatesToStartDay(dates: Date[]) {
  return dates.map((e: Date) => getStartDayDate(e));
}

export function getKeywordsFromItems(
  soldTransactions: ITransactionModel[],
  category: ItemCategory
) {
  const itemsList = soldTransactions.map((sold) => sold.items);
  const temp = new Set<string>();
  itemsList.forEach((items: any) => {
    items.forEach((item: any) => {
      if (!temp.has(item.name) && item.category == category) {
        temp.add(item.name);
      }
    });
  });

  return [...temp];
}

export function parseToFiat(value: string | number) {
  if (typeof value == "string" && !isNumber(value)) {
    return Number(0).toFixed(2);
  }

  if (typeof value == "string" && isNumber(value)) {
    return Number.parseFloat(value).toFixed(2);
  }

  return `₱ ${parseToFloat(value)}`;
}

export function parseToFloat(value: string | number) {
  if (typeof value == "string" && !isNumber(value)) {
    return Number(0).toFixed(2);
  }

  if (typeof value == "string" && isNumber(value)) {
    return Number.parseFloat(value).toFixed(2);
  }

  return Number(value).toFixed(2);
}

export const parseToInputFieldDate = (date: Date | string) => {
  if (date instanceof Date) {
    return date.toISOString().substring(0, 10);
  }
  const temp = new Date(date);
  return temp.toISOString().substring(0, 10);
};

export function generateRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export function getDateToString(date: string) {
  return new Date(date).toDateString();
}

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

export function getEndDayDate(date: Date): Date {
  const start = getStartDayDate(date).getTime();
  return new Date(start + 86399999);
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
      todayDate.setDate(todayDate.getDate() - i * MUTIPLIERS.DAILY + 1);
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
