import { AxiosError, AxiosResponse } from "axios";
import axiosClient from "./config";

export const subcribeToSubscription = async (payload: { price: number; name: string; plan: "month" | "year"; }): Promise<SubscriptionResponse> => {
    try {
        const { data } = await axiosClient.post<null, AxiosResponse<SubscriptionResponse>>(`/subscriptions`, payload);

        return data;
    } catch (error) {
        const err = error as AxiosError<any>;
        const errData = err.response?.data;
        return errData;
    }
};
