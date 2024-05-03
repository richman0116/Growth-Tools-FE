import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type GlobalContextProps = {
    isPageLoading: boolean,
    setPageLoading: Dispatch<SetStateAction<boolean>>
}

const initGlobalState: GlobalContextProps = {
    isPageLoading: false,
    setPageLoading: () => {},
}

const GlobalStoreContext = createContext<GlobalContextProps>(initGlobalState);
GlobalStoreContext.displayName = 'GlobalStoreContext';

export const useGlobalStoreContext = () => useContext(GlobalStoreContext);

// Provider component to wrap your app
export const GlobalStoreProvider = ({ children }: {
    children: React.ReactNode;
}) => {
  const [isPageLoading, setPageLoading] = useState<boolean>(false);

  const contextValue: GlobalContextProps = {
    isPageLoading,
    setPageLoading
  };

  return <GlobalStoreContext.Provider value={contextValue}>{children}</GlobalStoreContext.Provider>;
};
