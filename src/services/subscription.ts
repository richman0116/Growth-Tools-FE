import { AxiosError } from "axios";
import axiosClient from "./config";

export type SubcriptionsResponse = {
  amount: 0;
  name: "string";
  recursionPlan: "string";
}[];

export const getSubscriptions = async () => {
  try {
    const res = await axiosClient.get<null, SubcriptionsResponse>(
      `/subscriptions/list`
    );

    console.log(res);

    return res;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    throw errData;
  }
};
