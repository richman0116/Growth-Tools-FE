"use client";

import React, { useEffect, useState } from 'react';
import { getCategoryList } from '../../../services/tool';
import { useGlobalStoreContext } from '../../../hooks/GlobalStoreContext';
import Image from "next/image";
import { cn } from '@/lib/utils';

export default function CategoryPage() {
    const { isCategoryLoading, setCategoryLoading } = useGlobalStoreContext()
    const [dashboardNavigation, setDashboardNavigation] = useState<Category[]>(
        []
    );

    useEffect(() => {
        setCategoryLoading(true);
        getCategoryList().then((res: Category[]) => {
            const elementsToMove = res.splice(13, 2);
            const newArr = [...elementsToMove, ...res];
            setDashboardNavigation(newArr);
            setCategoryLoading(false);
        });
    }, [setCategoryLoading]);

    return (
        <div className='min-h-[70vh]'>
            <div className="relative overflow-x-auto">
                <ul className='mt-2 mb-2'>
                    {
                        dashboardNavigation.map((cate, index) => {
                            return <li key={cate.id+index}>
                                <a href={cate.handle} className="flex flex-row max-w-sm p-3 m-auto mb-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <Image
                                        className={cn(
                                            "mr-2 h-6 w-6",
                                            (cate.handle === "/trending-tools") && "h-6 w-6 flex justify-center items-center mr-2 px-1 py-[2px]"
                                        )}
                                        src={cate.icon}
                                        width={24}
                                        height={24}
                                        alt={cate.description}
                                    />
                                    <p className='font-satoshi'>{cate.name}</p>
                                </a>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    );
};