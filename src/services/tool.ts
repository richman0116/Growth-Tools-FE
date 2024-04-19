import { AxiosError, AxiosResponse } from "axios";
import axiosClient from "./config";

export const getCategoryList = async (): Promise<Category[]> => {
  try {
    const  response = await axiosClient.get<null, AxiosResponse<Category[]>>(`/categories/list`);

    return (response as any)?.result;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const getCategoryByHandle = async (handle: string): Promise<Category> => {
    try {
      const  response = await axiosClient.get<null, AxiosResponse<Category>>(`/categories/info/${handle}`);
  
      return (response as any)?.result;
    } catch (error) {
      const err = error as AxiosError<any>;
      const errData = err.response?.data;
      return errData;
    }
  };
  
export const getToolByName = async (name: string): Promise<Tool> => {
    try {
      const  response = await axiosClient.get<null, AxiosResponse<Tool>>(`/tools/info/${name}`);
  
      return (response as any)?.result;
    } catch (error) {
      const err = error as AxiosError<any>;
      const errData = err.response?.data;
      return errData;
    }
  };
  

export const getTools = async (params: {
    page: number;
    take: number;
    order: string;
    sort?: string;
    categoryId?: string;
}): Promise<PaginationResponse<Tool>> => {
    let url = `/tools/filter?page=${params.page}&take=${params.take}&order=${params.order}`;
    if (params.sort) {
        url += `&sort=${params.sort}`
    }
    if (params.categoryId) {
        url += `&categoryId=${params.categoryId}`
    }

    try {
      const  response = await axiosClient.get<null, AxiosResponse<PaginationResponse<Tool>>>(url);
  
      return (response as any)?.result;
    } catch (error) {
      const err = error as AxiosError<any>;
      const errData = err.response?.data;
      return errData;
    }
  };
  