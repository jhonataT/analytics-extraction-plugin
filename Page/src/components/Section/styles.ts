import styled from "styled-components";

export const SectionStyle = styled.section<{ isReverseColumn: boolean }>`
  width: 1120px;
  min-height: 100vh !important;

  display: flex;
  
  align-items: center;
  justify-content: space-between;

  margin-top: 60px;
  padding: 50px 32px;

  @media (max-width: 900px) {
    flex-direction: ${({ isReverseColumn }) => isReverseColumn ? 'column-reverse' : 'column'};
  }

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;