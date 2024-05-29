import { AxiosError } from "axios";
import axiosClient from "./config";

export type Category = {
  description: string;
  handle: string;
  id: string;
  name: string;
};

export type CategoriesResponse = {
  result: Category[];
};

export const getCategoriesList = async () => {
  try {
    const res = await axiosClient.get<null, CategoriesResponse>(
      `/categories/list`
    );
    const categories = res.result.filter(item => item.name !== 'Admin');
    return categories;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    throw errData;
  }
};
