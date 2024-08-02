import styled from "styled-components";

export const SectionStyle = styled.section<{ isReverseColumn: boolean }>`
  width: 1120px;

  display: flex;
  
  align-items: center;
  justify-content: space-between;

  margin-top: 60px;
  padding: 100px 32px;

  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);

  @media (max-width: 900px) {
    flex-direction: ${({ isReverseColumn }) => isReverseColumn ? 'column-reverse' : 'column'};
  }
`;