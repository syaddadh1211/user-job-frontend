import { create } from "zustand";

export const useNameStore = create((set) => ({
  userName: "",
  //   increaseCounterNumber: () => set((state) => ({ number: state.number + 1 })),
  setUserName: (userName) => set({ userName }),
}));
