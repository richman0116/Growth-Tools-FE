import { AxiosError } from "axios";
import axiosClient from "./config";

export type Category = {
  description: string;
  handle: string;
  id: string;
  name: string;
};

export const getCategoriesList = async () => {
  try {
    const res = await axiosClient.get<null, Category[]>(`/categories/list`);

    return res;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    throw errData;
  }
};
