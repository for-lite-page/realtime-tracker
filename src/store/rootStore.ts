import { MainStore } from "./mainStore.ts";
import { AuthStore } from "./authStore.ts";

export class RootStore {
    mainStore: MainStore
    authStore: AuthStore
    constructor() {
        this.mainStore = new MainStore(this)
        this.authStore = new AuthStore(this)
    }
}

export const rootStore = new RootStore()