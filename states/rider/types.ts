import { IQuery } from "@/interfaces";
import { IRiderModel } from "@/models";

// Types & Interfaces
export type GetOverallRiders = (query: IQuery) => Promise<void>;
export type GetRiders = (query: IQuery) => Promise<void>;
export type SetLimit = (value: number) => void;
export type NextPage = () => void;
export type PreviousPage = () => void;

// Actions
export interface IRiderActions {
  getOverallRiders: GetOverallRiders;
  getRiders: GetRiders;
  setLimit: SetLimit;
  nextPage: NextPage;
  previousPage: PreviousPage;
}

// States
export interface IRiderState {
  overallRiders: IRiderModel[];
  riders: IRiderModel[];
  limit: number;
  page: number;
}

export type RiderStore = IRiderActions & IRiderState;
