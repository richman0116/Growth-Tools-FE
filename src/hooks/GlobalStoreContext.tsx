"use client";

import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useRef, useState, MutableRefObject } from 'react';

type GlobalContextProps = {
  isCategoryLoading: boolean
  setCategoryLoading: Dispatch<SetStateAction<boolean>>
  isToolsListLoading: boolean
  setToolsListLoading: Dispatch<SetStateAction<boolean>>
  isFirstRender: boolean
  setIsFirstRender: Dispatch<SetStateAction<boolean>> 
  clapToolIds: any[]
  setClapToolIds: Dispatch<SetStateAction<any[]>>
  isPublishedTool: boolean
  setIsPublishedTool: Dispatch<SetStateAction<boolean>>
}

const initGlobalState: GlobalContextProps = {
  isCategoryLoading: true,
  setCategoryLoading: () => {},
  isToolsListLoading: true,
  setToolsListLoading: () => { },
  isFirstRender: true,
  setIsFirstRender: () => { },
  clapToolIds: [],
  setClapToolIds: () => { },
  isPublishedTool: false,
  setIsPublishedTool: () => { }
}

const GlobalStoreContext = createContext<GlobalContextProps>(initGlobalState);
GlobalStoreContext.displayName = 'GlobalStoreContext';

export const useGlobalStoreContext = () => useContext(GlobalStoreContext);

// Provider component to wrap your app
export const GlobalStoreProvider = ({ children }: {
    children: any;
}) => {
  const [isToolsListLoading, setToolsListLoading] = useState<boolean>(initGlobalState.isToolsListLoading);
  const [isCategoryLoading, setCategoryLoading] = useState<boolean>(initGlobalState.isCategoryLoading);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [clapToolIds, setClapToolIds] = useState<any[]>([]);
  const [isPublishedTool, setIsPublishedTool] = useState<boolean>(false);

  const contextValue: GlobalContextProps = {
    isToolsListLoading,
    setToolsListLoading,
    isCategoryLoading,
    setCategoryLoading,
    isFirstRender,
    setIsFirstRender,
    clapToolIds,
    setClapToolIds,
    isPublishedTool,
    setIsPublishedTool
  };

  return <GlobalStoreContext.Provider value={contextValue}>{children}</GlobalStoreContext.Provider>;
};
