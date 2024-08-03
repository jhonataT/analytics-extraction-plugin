import styled from "styled-components";
import { ThemeColors } from "../../styles/Theme";

export const ProjectCard = styled.div<{ theme: ThemeColors }>`
  width: 100%;
  height: 100%;

  display: flex;
  gap: 16px;
  flex-direction: column;

  @media (max-width: 900px) {
    align-items: center;
  }
`;

export const ProjectContent = styled.div<{ theme: ThemeColors }>`
  width: 100%;
  height: 500px;
  
  border: 2px solid ${({ theme }) => theme.text_color};
  border-radius: 8px;

  display: flex;
  align-items: center;

  position: relative;

  img {
    height: 100%;
    width: 100%;
    border-radius: 8px 0 0 8px;

    object-fit: contain;
  }

  @media (max-width: 900px) {
    width: 90%;

    flex-direction: column;

    img {
      height: 70%;
    }
  }
`;

export const ProjectFooter = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

export const TextBox = styled.div<{ theme: ThemeColors }>`
  width: 100%;

  display: flex;
  gap: 16px;
  align-items: center;
  flex-direction: column;
  
  padding: 12px;

  h4 {
    font-size: 20px;
    font-weight: bold;

    color: ${({ theme }) => theme.highlight_text_color};
    text-align: center;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }

  a {
    color: ${({ theme }) => theme.highlight_text_color};
    text-decoration: underline;
  }
`;
