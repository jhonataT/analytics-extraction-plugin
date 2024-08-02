import styled from "styled-components";
import { ThemeColors } from "../../styles/Theme";

export const ConicGradient = styled.div<{ theme: ThemeColors }>`
  width: 1100px;
  height: 400px;

  background-image: conic-gradient(
    from 36deg at 20% 80%,
    ${({ theme }) => theme.neutral_background_color} 0%, 
    ${({ theme }) => theme.neutral_background_color} 25%, 
    ${({ theme }) => theme.neutral_background_color} 30%
  );

  filter: blur(120px);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
`;

export const LeftSide = styled.section<{ theme: ThemeColors }>`
  height: 100%;
  width: 45%;

  display: flex;
  gap: 16px;
  flex-direction: column;

  h2 {
    font-size: 48px;
    font-weight: bold;
    color: ${({ theme }) => theme.highlight_text_color};
  }

  p {
    font-size: 20px;
    font-weight: 400;
    color: ${({ theme }) => theme.neutral_text_color};

    margin-bottom: 8px;
  }
`;

export const RightSide = styled.section<{ theme: ThemeColors }>`
  height: 100%;
  width: 45%;

  display: grid;
  gap: 48px;
  grid-template-columns: 1fr 1fr;
  
  .list__container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    h3 {
      font-size: 24px;
      font-weight: bold;
      color: ${({ theme }) => theme.text_color};
    }

    ul > li  {
      font-size: 16px;
      color: ${({ theme }) => theme.neutral_text_color};
    }
  }

  @media (max-width: 900px) {
    margin-top: 64px;
    grid-template-columns: 1fr 1fr;
  }
`;
