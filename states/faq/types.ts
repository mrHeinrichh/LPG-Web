import { IQuery } from "@/interfaces";
import { IFaqModel } from "@/models";

// Types & Interfaces
export type GetFaqs = (query: IQuery) => void;
export type RemoveFaq = (id: string) => void;
export type SetLimit = (value: number) => void;
export type NextPage = () => void;
export type PreviousPage = () => void;

// Actions
export interface IFaqActions {
  getFaqs: GetFaqs;
  removeFaq: RemoveFaq;
  setLimit: SetLimit;
  nextPage: NextPage;
  previousPage: PreviousPage;
}

// States
export interface IFaqState {
  faqs: IFaqModel[];
  page: number;
  limit: number;
}

export type FaqStore = IFaqActions & IFaqState;
