import { AxiosError, AxiosResponse } from "axios";
import axiosClient from "./config";

export type AuthRequest = {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  company: string;
};

export type LoginResponse = {
  _id: string;
  access_token: string;
};

export type RegisterResponse = {
  status: boolean;
};

export const login = async (authData: AuthRequest) => {
  try {
    const { data } = await axiosClient.post<
      AuthRequest,
      AxiosResponse<LoginResponse>
    >(`/auth/authenticate`, authData);

    return data;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    throw errData;
  }
};

export const register = async (authData: AuthRequest) => {
  try {
    const { status } = await axiosClient.post<
      AuthRequest,
      AxiosResponse<RegisterResponse>
    >(`/auth/sign-up`, authData);

    return {
      status,
    };
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    throw errData;
  }
};
