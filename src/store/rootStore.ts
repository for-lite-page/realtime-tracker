import { MainStore } from "./mainStore.ts";

export class RootStore {
    mainStore: MainStore;

    constructor() {
        this.mainStore = new MainStore(this);
    }
}

export const rootStore = new RootStore();