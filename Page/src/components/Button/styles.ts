import styled from "styled-components";
import { ThemeColors } from "../../styles/Theme";

export const Container = styled.button<{ theme: ThemeColors }>`
  width: 220px;
  height: 50px;
  
  border: none;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.highlight_background_color};

  cursor: pointer;
  transition: opacity .3s;

  &:hover {
    opacity: .9;
  }

  @media (max-width: 400px) {
    width: 180px;
    height: 40px;
  }
`;

export const Label = styled.span<{ theme: ThemeColors }>`
  font-size: 16px;
  font-weight: 400;
  color: #fff;

  @media (max-width: 900px) {
    font-size: 14px;
  }
`;