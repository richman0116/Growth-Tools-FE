"use client";

import React, { useEffect, useState } from 'react';
import { getCategoryList } from '../../../services/tool';
import { useGlobalStoreContext } from '../../../hooks/GlobalStoreContext';
import Image from "next/image";

export default function CategoryPage() {
    const { isCategoryLoading, setCategoryLoading } = useGlobalStoreContext()
    const [dashboardNavigation, setDashboardNavigation] = useState<Category[]>(
        []
    );

    useEffect(() => {
        setCategoryLoading(true);
        getCategoryList().then((res) => {
            setDashboardNavigation(res);
            setCategoryLoading(false);
        });
    }, [setCategoryLoading]);

    return (
        <div className='min-h-[70vh]'>
            <div className="relative overflow-x-auto">
                <ul className='mt-2 mb-2'>
                    {
                        dashboardNavigation.map(cate => {
                            return <li key={cate.id}>
                                <a href={cate.handle} className="flex flex-row max-w-sm p-3 m-auto mb-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <Image
                                        className="mr-2 h-6 w-6"
                                        src={cate.icon}
                                        width={24}
                                        height={24}
                                        alt={cate.description}
                                    />
                                    {cate.name}
                                </a>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    );
};