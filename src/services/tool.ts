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
};

export type SubmitToolResponse = {
  url: string;
};

export const submitTool = async (data: SubmitToolRequest) => {
  try {
    const res = await axiosClient.post<SubmitToolRequest, SubmitToolResponse>(
      `/tools/submit-tool`,
      data
    );

    console.log(res);

    return {};
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    throw errData;
  }
};
