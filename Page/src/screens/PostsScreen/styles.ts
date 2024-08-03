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

export const PostCard = styled.div<{ theme: ThemeColors }>`
  width: 100%;
  height: 100%;

  display: flex;
  gap: 16px;
  flex-direction: column;

  @media (max-width: 900px) {
    align-items: center;
  }
`;

export const PostContent = styled.div<{ theme: ThemeColors }>`
  width: 100%;
  height: 500px;
  
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;

  ul {
    max-height: 400px !important;
    width: 100%;

    overflow-y: scroll !important;
  }
`;

export const PostRowContainer = styled.li<{ theme: ThemeColors }>`
  padding: 8px;

  display: flex;
  gap: 32px;
  align-items: center;

  .date_content {
    font-size: 14px;
    color: ${({ theme }) => theme.text_color};
  }

  .profile__container {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .profile_details__container {
      display: flex;
      gap: 4px;
      flex-direction: column;
      align-items: flex-start;
  
      & > span:first-child {
        font-size: 14px;
        color: ${({ theme }) => theme.text_color};
      }
      
      & > span:last-child {
        font-size: 12px;
        color: ${({ theme }) => theme.neutral_text_color};
      }
  
    }
  }

  
  @media (max-width: 900px) {
    .profile__container {
      display: none;
    }
  }

  .post_content {
    display: flex;
    gap: 4px;
    flex-direction: column;

    h5 {
      font-size: 14px;
    }

    a {
      font-size: 12px;
      color: ${({ theme }) => theme.highlight_text_color};
    }

    @media (max-width: 900px) {
      align-items: flex-start;

      h5 {
        text-align: start;
      }
    }
  }

`;
