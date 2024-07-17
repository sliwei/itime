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

export interface Record {
  id: number;
  etime: string;
  weight: number;
  height: number;
  message: string;
  media: string;
  address: string;
}

export const activeIndexState = atom("/pages/index/index");
export const showTabBarState = atom(true);
export const userinfoState = atom<null | Userinfo>(null);
export const isLockState = atom<0 | 1 | 2>(0);
export const openState = atom<-1 | 0 | 1 | 2>(-1);
export const updateListState = atom<number>(0);
export const lastRecordState = atom<Record>({
  id: 0,
  etime: "",
  weight: 10,
  height: 75,
  message: "",
  media: "",
  address: "",
});
