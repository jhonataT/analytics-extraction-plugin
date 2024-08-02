import { createGlobalStyle } from "styled-components";
import { ThemeColors } from "./Theme";

export const Global = createGlobalStyle<{ theme?: ThemeColors }>`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
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

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text_color};
    cursor: pointer;
  }
`;
