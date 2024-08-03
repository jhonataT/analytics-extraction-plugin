import { ReactNode } from "react";
import { SectionStyle } from "./styles";

interface SectionProps {
  children: ReactNode;
  isReverseColumn?: boolean;
};

export const Section = ({ children, isReverseColumn = true }: SectionProps) => {
  return <SectionStyle reverse={isReverseColumn.toString()}>
    {children}
  </SectionStyle>
};
