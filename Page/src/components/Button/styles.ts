import styled from "styled-components";
import { ThemeColors } from "../../styles/Theme";

export const Container = styled.button<{ theme: ThemeColors }>`
  width: 220px;
  height: 60px;
  
  border: none;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.highlight_background_color};
`;

export const Label = styled.span<{ theme: ThemeColors }>`
  font-size: 16px;
  font-weight: 400;
  color: #fff;

`;