import { ReactNode } from "react"
import { ContainerStyle } from "./styles";

interface ContainerProps {
  children: ReactNode;
  id: string;
};

export const Container = ({ children, id }: ContainerProps) => {
  return <ContainerStyle id={id} data-testid="layout-container">
    {children}
  </ContainerStyle>
}