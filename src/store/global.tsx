import { atom, createStore } from "jotai";

export const myStore = createStore();

export interface Userinfo {
  head: string;
  id: number;
  mobile: null | string;
  name: string;
  openid: string;
  session_key: string;
  token: string;
}

export const activeIndexState = atom("/pages/index/index");
export const showTabBarState = atom(true);
export const userinfoState = atom<null | Userinfo>(null);
export const isLockState = atom<0 | 1 | 2>(0);
export const openState = atom<-1 | 0 | 1 | 2>(-1);
