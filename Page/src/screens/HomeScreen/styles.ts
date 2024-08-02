import styled from "styled-components";
import { ThemeColors } from "../../styles/Theme";

export const ConicGradient = styled.div<{ theme: ThemeColors }>`
  width: 1100px;
  height: 400px;

  background: conic-gradient(
    ${({ theme }) => theme.opacity_highlight_background_color},
    ${({ theme }) => theme.neutral_background_color},
    ${({ theme }) => theme.opacity_highlight_background_color}
  );

  filter: blur(120px);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
`;

export const AvatarImg = styled.img`
  width: 400px;

  @media (max-width: 900px) {
    width: 200px;
  }
`;

export const Content = styled.div<{ theme: ThemeColors }>`
  display: flex;
  gap: 16px;
  flex-direction: column;

  @media (max-width: 900px) {
    align-items: center;
  }
`;

export const Title = styled.h1<{ theme: ThemeColors }>`
  font-size: 58px;
  font-weight: bold;

  color: ${({ theme }) => theme.text_color};

  display: flex;
  gap: 8px;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 80%;
    font-size: 48px;
    text-align: center;
  }

  @media (max-width: 500px) {
    font-size: 32px;
  }
`;

export const HighlightText = styled.span<{ theme: ThemeColors }>`
  font-size: 38px;
  font-weight: bold;

  color: ${({ theme }) => theme.highlight_text_color};

  @media (max-width: 900px) {
    font-size: 32px;
    text-align: center;
  }

  @media (max-width: 500px) {
    font-size: 16px;
  }
`;