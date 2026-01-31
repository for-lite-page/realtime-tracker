import {makeAutoObservable, runInAction} from "mobx";
import type {RootStore} from "./rootStore"
import type {Drone} from "../lib/globalInterface.ts";

export class MainStore {
    objects = new Map<string, any>()
    rootStore: RootStore;
    private socket: WebSocket | null = null

    constructor(rootStore: RootStore) {
        makeAutoObservable(this, {rootStore: false})
        setInterval(() => this.cleanUp(), 1000)
        this.rootStore = rootStore
    }

    updateObjects(data: Drone[]) {
        runInAction(() => {
            data.forEach(item => {
                this.objects.set(item.id, {
                    ...item,
                    lastSeen: Date.now(),
                    isLost: false
                })
            })
        })
    }

    cleanUp() {
        const now = Date.now()
        runInAction(() => {
            this.objects.forEach((obj, id) => {
                const diff = now - obj.lastSeen;
                if (diff > 300000) {
                    this.objects.delete(id);
                } else if (diff > 10000) {
                    obj.isLost = true;
                }
            })
        })
    }

    connect() {
        if (this.socket) return

        this.socket = new WebSocket('ws://localhost:8080')

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            this.updateObjects(data)
        }

        this.socket.onclose = () => {
            this.socket = null;
        }
        this.socket.onerror = (error) => {
            console.error('WebSocket Error:', error)
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}