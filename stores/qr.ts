import { create } from "zustand";
import { Link } from "./link";

export type Qr = {
  id?: number;
  qrImage: string;
  link: Link;
  createdAt?: string;
  updatedAt?: string;
};

interface QrState {
  qrs: Qr[];
  setQrs: (qrs: Qr[]) => void;
  addQr: (qr: Qr) => void;
  removeQr: (id: number) => void;
}

export const qrState = create<QrState>((set) => ({
  qrs: [],
  setQrs: (qrs: Qr[]) => set(() => ({ qrs })),
  addQr: (qr: Qr) => set((state) => ({ qrs: [qr, ...state.qrs] })),
  removeQr: (id: number) =>
    set((state) => ({
      qrs: state.qrs.filter((qr) => qr.id !== id),
    })),
}));
