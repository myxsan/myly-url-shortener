import { create } from "zustand";

export type Link = {
  id?: number;
  linkKey: string;
  src: string;
  creatorId: string;
  routerLink: string;
  createdAt?: string;
  updatedAt?: string;
};

interface LinkState {
  links: Link[];
  addLink: (link: Link) => void;
  removeLink: (id: number) => void;
  setLinks: (links: Link[]) => void;
}

export const linkState = create<LinkState>((set) => ({
  links: [],
  setLinks: (links: Link[]) => set(() => ({ links })),
  addLink: (link: Link) => set((state) => ({ links: [link, ...state.links] })),
  removeLink: (id: number) =>
    set((state) => ({
      links: state.links.filter((link) => link.id !== id),
    })),
}));
