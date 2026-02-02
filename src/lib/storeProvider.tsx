import * as React from "react";
import {rootStore} from "../store/rootStore.ts";
import { StoreContext } from "../store/StoreContext.tsx";

interface StoreProps {
    children: React.ReactNode
}

export const StoreProvider = ({ children }: StoreProps) => {
    return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
}