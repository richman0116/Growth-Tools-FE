import { AxiosError } from "axios";
import axiosClient from "./config";

export type Subcriptions = {
  currency: string;
  id: string;
  interval: string;
  name: string;
  price: number;
};

export type SubcriptionsResponse = {
  result: Subcriptions[];
};

export const getSubscriptions = async () => {
  try {
    const res = await axiosClient.get<null, SubcriptionsResponse>(
      `/subscriptions/list`
    );

    return res?.result;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    throw errData;
  }
};
