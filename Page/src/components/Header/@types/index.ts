import { ReactNode } from "react";

export type HeaderItem = {
  id: number;
  title: string;
  to: 'inicio' | 'sobre' | 'projetos' | 'posts';
};

export interface HeaderContainerProps {
  menuIsOpen: boolean; 
  setMenuIsOpen: (value: boolean) => void;
  children: ReactNode;
};