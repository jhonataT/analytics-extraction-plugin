import styled from "styled-components";
import { ThemeColors } from "../../styles/Theme";

export const SwitchContainer = styled.div<{ theme: ThemeColors }>`
  width: 45px;
  height: 25px;
  
  cursor: pointer;
  border-radius: 30px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 20px;
  border: 1px solid #171b27;
  padding: 5px;

  background-color: ${({ theme }) => theme.neutral_text_color};
  color: #171b27;

  & svg:not(.active) {
    color: transparent;
  }
`;