import { AxiosError } from "axios";
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
