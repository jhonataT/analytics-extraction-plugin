import styled from "styled-components";
import { ThemeColors } from "../../styles/Theme";

export const Container = styled.header<{ theme: ThemeColors }>`
  width: 100vw;
  height: 100px;
  
  position: fixed;
  top: 0;
  left: 0;

  background-color: ${({ theme }) => theme.background_color};
  z-index: 500;

  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 900px) {
    width: 100vw;
    height: 100vh;

    left: -100vw;

    transition: ease-in-out .4s;

    &.active {
      left: 0;
    }
  }
`;

export const MenuIcon = styled.div<{ theme: ThemeColors }>`
  font-size: 36px;
  
  position: absolute;
  top: 25px;
  right: -55px;

  cursor: pointer;

  &.active {
    right: 25px;
  }

  &:not(.active) {
    height: 48px;
    width: 48px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 100%;

    background-color: ${({ theme }) => theme.background_color};
  }

  @media (min-width: 900px) {
    display: none;
  }
`;

export const HeaderGroup = styled.nav`
  width: 100%;
  max-width: 1120px;

  padding: 0 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const HeaderList = styled.ul`
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const HeaderListItem = styled.li<{ theme: ThemeColors }>`
  font-size: 24px;
  font-weight: 600;
  list-style-type: none;
  color: ${({ theme }) => theme.text_color} !important;
  
  margin-right: 32px;

  a.active {
    color: ${({ theme }) => theme.highlight_text_color};
  }

  a:after {
    width: 0%;
    height: 1px;

    content: "";
    background-color: ${({ theme }) => theme.text_color};
    
    display: flex;
    flex-direction: column;

    transition: width .5s;
  }

  a:not(.active):hover:after {
    width: 100%;
  }

  @media (max-width: 900px) {
    margin: 0;
    margin-bottom: 25px;
  }
`;

export const IconsCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &::first-child {
    margin-right: 5px;
  }
`;