import { createGlobalStyle } from "styled-components";
import { ThemeColors } from "./Theme";

export const Global = createGlobalStyle<{ theme?: ThemeColors }>`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: .5em;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px ${({ theme }) => theme.background_color};
    }

    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
  }

  body {
    width: 100vw;
    height: 100%;

    display: block;

    font-family: "Lato", sans-serif;
    font-weight: 400;
    letter-spacing: 1px;

    color: ${({ theme }) => theme.text_color};
    background-color: ${({ theme }) => theme.background_color};

    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text_color};
    cursor: pointer;
  }

  h1 {
    font-size: 48px;
    font-weight: bold;

    color: ${({ theme }) => theme.text_color};

    @media (max-width: 900px) {
      font-size: 40px;
    }

    @media (max-width: 500px) {
      font-size: 24px;
    }
  }

  h3 {
    font-size: 48px;
    font-weight: bold;
    color: ${({ theme }) => theme.highlight_text_color};

    @media (max-width: 900px) {
      font-size: 32px;
      text-align: center;
    }

    @media (max-width: 500px) {
      font-size: 24px;
    }
  }

  p {
    font-size: 20px;
    font-weight: 400;
    color: ${({ theme }) => theme.neutral_text_color};

    @media (max-width: 900px) {
      font-size: 16px;
    }

    @media (max-width: 500px) {
      font-size: 12px;
    }
  }

  span {
    font-size: 32px;
    font-weight: bold;

    color: ${({ theme }) => theme.highlight_text_color};

    @media (max-width: 900px) {
      font-size: 24px;
      text-align: center;
    }

    @media (max-width: 500px) {
      font-size: 14px;
    }
  }

  ul > li  {
    font-size: 14px;
    color: ${({ theme }) => theme.neutral_text_color};
    
    @media (max-width: 900px) {
      font-size: 12px;
      list-style-type: none;

      text-align: center;
    }
  }
`;
