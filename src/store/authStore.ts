import {makeAutoObservable} from "mobx";
import type {RootStore} from "./rootStore.ts";

const SECRET_KEY = "testSecret"

export class AuthStore {
    authStatus: boolean = false
    token: string | null  = localStorage.getItem('authKey')
    rootStore: RootStore
    error: string | null = null

    constructor(rootStore: RootStore) {
        makeAutoObservable(this, {rootStore: false})
        this.rootStore = rootStore
    }

    login(authToken: string){
        if (authToken === SECRET_KEY){
            this.token = authToken
            this.authStatus = true
            localStorage.setItem('authKey', SECRET_KEY)
            this.error = null
        } else {
            this.error = "Ну вірний ключ доступу"
        }
    }
    logout(){
        this.authStatus = false
        this.token = null
        localStorage.removeItem('authKey')
    }

    get isAuthenticated() {
        if (this.token === SECRET_KEY) {
            this.authStatus = true
            return true
        }
    }

}