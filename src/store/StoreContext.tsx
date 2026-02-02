import { createContext } from "react"
import { RootStore } from "./rootStore"

export const StoreContext = createContext<RootStore| undefined>(undefined);


