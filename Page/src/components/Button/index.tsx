import { Container, Label } from "./styles";

interface ButtonProps {
  label: string;
  handleClick: () => void;
};

export const Button = ({ label, handleClick }: ButtonProps) => {
  return <Container onClick={handleClick} title={label} data-testid="button-container">
    <Label>{label}</Label>
  </Container>
}