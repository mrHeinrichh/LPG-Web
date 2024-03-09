import { IDevliveryState } from "./types";

export const initialState: IDevliveryState = {
  pendingDeliveries: [],
  approvedDeliveries: [],
  onGoingDeliveries: [],
  feedbacks: [],
  page: 1,
  limit: 10,
};
