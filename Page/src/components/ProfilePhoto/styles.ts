import styled from "styled-components";
import { ThemeColors } from "../../styles/Theme";

export const ProfileContainer = styled.div<{ theme: ThemeColors }>`
  height: 32px;
  width: 32px;

  background-color: ${({ theme }) => theme.neutral_background_color};

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 32px;
  outline: 1px solid ${({ theme }) => theme.text_color};

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.text_color};
  }
`;
