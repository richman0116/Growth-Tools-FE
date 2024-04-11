import React from 'react';
import { subcribeToSubscription } from '../../services/payment';

export const SubscriptionList = () => {

    const subcribe = async (params: {
        price: number,
        name: string,
        plan: 'month' | 'year',
    }) => {
        const resposne = await subcribeToSubscription(params);
        if (resposne.url) {
            window.location.href = resposne.url;
        }
    }

    return (
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-12  md:space-y-0 justify-center items-center mt-10">
            <div className="bg-[#F9ECFF] rounded-xl">
                <div className="flex flex-col p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-96 md:w-auto">
                    <div className="mt-3 font-semibold text-lg">Monthly subscriptions</div>
                    <div className="my-4">
                        <span className="font-bold text-base">10$</span>
                        <span className="font-light text-sm">/month</span>
                    </div>
                    <button onClick={() => {
                        subcribe({
                            price: 10,
                            name: "Monthly subscription",
                            plan: "month",
                        })
                    }} className="bg-[#F4F5FA] px-4 py-3 rounded-full  border border-[#F0F0F6] shadow-xl mt-4">
                        Subscribe
                    </button>
                </div>
            </div>
            <div className="bg-[#ECEEFF] rounded-xl">
                <div className="flex flex-col p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-96 md:w-auto">
                    <div className="mt-3 font-semibold text-lg">Yearly subscriptions</div>
                    <div className="my-4">
                        <span className="font-bold text-base">59</span>
                        <span className="font-light text-sm">/year</span>
                    </div>
                    <button onClick={() => {
                        subcribe({
                            price: 59,
                            name: "Yearly subscription",
                            plan: "year",
                        })
                    }} className="bg-[#F4F5FA] px-4 py-3 rounded-full  border border-[#F0F0F6] shadow-xl mt-4">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};