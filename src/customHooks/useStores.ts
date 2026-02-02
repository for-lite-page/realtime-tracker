import { useContext } from "react";
import {StoreContext} from "../store/StoreContext.tsx";

export const useStores = () => {
    const context = useContext(StoreContext)
    if (context === undefined) {
        throw new Error("хук має використовуватися лише з провайдером")
    }
    return context
}