import { createContext, useContext } from "react"
import { rootStore, RootStore } from "./rootStore"
import * as React from "react";

const StoreContext = createContext<RootStore| undefined>(undefined);

interface StoreProps {
    children: React.ReactNode
}

export const StoreProvider = ({ children }: StoreProps) => {
    return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
}

// Кастомный хук для удобства
export const useStores = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error("useStores must be used within a StoreProvider");
    }
    return context;
};