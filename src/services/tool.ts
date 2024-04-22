import { AxiosError, AxiosResponse } from "axios";
import axiosClient from "./config";

export type ToolDealsType = {
  name: string;
  descriptions: string;
  price: number;
  discountPrice: number;
};

export type SubmitToolRequest = {
  name: string;
  shortDescription: string;
  description: string;
  website: string;
  toolDeals: ToolDealsType[];
  keyFeatures: string[];
  useCases: string[];
  price: number;
  categoryId: string;
  subscriptionId: string;
  logo: File;
  screenshots: File[];
};

export type SubmitToolResponse = {
  result: {
    checkoutUrl: string;
    tool: {
      name: string;
      shortDescription: string;
      description: string;
    };
    category: {
      id: string;
      name: string;
      handle: string;
    };
    description: string;
    logo: string;
    name: string;
    price: number;
    shortDescription: string;
    website: string;
  };
};

export type Tool = {
  description: string;
  id: string;
  keyFeatures: string[];
  screenshots: string[];
  useCases: string[];
  logo: string;
  status: string;
  toolDeals: Tool;
  name: string;
  price: number;
  shortDescription: string;
  website: string;
};

export type GetToolResponse = {
  result: {
    data: Tool[];
  };
};

export type GetToolByNameResponse = {
  result: ToolInfo;
};

export const submitTool = async (data: SubmitToolRequest) => {
  try {
    const res = await axiosClient.post<SubmitToolRequest, SubmitToolResponse>(
      `/tools/submit-tool`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return {
      url: res.result.checkoutUrl,
    };
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    throw errData;
  }
};

export const getTools = async () => {
  try {
    const res = await axiosClient.get<null, GetToolResponse>(`/tools/list`);

    return res.result;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const publishTool = async (id: string) => {
  try {
    const res = await axiosClient.post<null, GetToolResponse>(
      `/tools/publish-tool/${id}`
    );

    return res.result;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const getCategoryList = async (): Promise<Category[]> => {
  try {
    const response = await axiosClient.get<null, AxiosResponse<Category[]>>(
      `/categories/list`
    );

    return (response as any)?.result;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const getCategoryByHandle = async (
  handle: string
): Promise<Category> => {
  try {
    const response = await axiosClient.get<null, AxiosResponse<Category>>(
      `/categories/info/${handle}`
    );

    return (response as any)?.result;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const response = await axiosClient.get<null, AxiosResponse<Category>>(
      `/categories/info-by-id/${id}`
    );

    return (response as any)?.result;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const getToolByName = async (
  name: string
): Promise<GetToolByNameResponse> => {
  try {
    const response = await axiosClient.get<null, GetToolByNameResponse>(
      `/tools/info/${name}`
    );

    return response;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const filterTool = async (params: {
  page: number;
  take: number;
  order: string;
  sort?: string;
  categoryId?: string;
}): Promise<PaginationResponse<ToolInfo>> => {
  let url = `/tools/filter?page=${params.page}&take=${params.take}&order=${params.order}`;
  if (params.sort) {
    url += `&sort=${params.sort}`;
  }
  if (params.categoryId) {
    url += `&categoryId=${params.categoryId}`;
  }

  try {
    const response = await axiosClient.get<
      null,
      AxiosResponse<PaginationResponse<ToolInfo>>
    >(url);

    return (response as any)?.result;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};
