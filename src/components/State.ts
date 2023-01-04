import { atom } from "jotai";

export const sideNavState = atom(false);
export const deckAtom = atom<any>(undefined);
export const tabAtom = atom<string | undefined>(undefined);
