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

  p {
    margin-bottom: 8px;
  }

  @media (max-width: 900px) {
    width: 80%;
    text-align: center;
    
    align-items: center;
    margin-bottom: 32px;
  }
`;

export const RightSide = styled.section<{ theme: ThemeColors }>`
  height: 100%;
  width: 45%;

  display: grid;
  gap: 48px;
  align-items: flex-start;
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

    ul {
      display: flex;
      flex-direction: column;
      gap: 4px
    }

  }
  
  @media (max-width: 900px) {
    width: 100%;

    grid-template-columns: 1fr;
  }
`;
