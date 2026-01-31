import { makeAutoObservable } from "mobx";
import type { RootStore } from "./rootStore"


export class MainStore {
    counter: number = 0;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this, { rootStore: false });
        this.rootStore = rootStore;
    }

    setCount(newCount: number) {
        this.counter = newCount;
    }
}


