import styled from "styled-components";
import { ThemeColors } from "../../styles/Theme";

export const FooterContainer = styled.footer<{ theme: ThemeColors }>`
  width: 100%;
  height: 60px;

  background-color: ${({ theme }) => theme.neutral_background_color};
  border-top: 2px solid ${({ theme }) => theme.neutral_text_color};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterSection = styled.section<{ theme: ThemeColors }>`
  width: 1120px;

  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 16px;
  }

  ul {
    display: flex;
    gap: 24px;

    list-style-type: none;

    li a, li a span {
      font-size: 16px !important;
      font-weight: bold;
      color: ${({ theme }) => theme.text_color};

      display: flex;
      gap: 4px;
      align-items: center;
    }

    @media (max-width: 500px) {
      display: none;
    }
  }

  @media (max-width: 500px) {
    justify-content: center;
  }
`;