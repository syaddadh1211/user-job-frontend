import { create } from "zustand";

export const useNameStore = create((set) => ({
  userName: "Syaddad",
  //   increaseCounterNumber: () => set((state) => ({ number: state.number + 1 })),
  setUserName: (userName) => set({ userName }),
}));
