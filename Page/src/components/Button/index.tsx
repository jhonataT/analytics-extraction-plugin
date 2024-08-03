import { Container, Label } from "./styles";

interface ButtonProps {
  label: string;
  handleClick: () => void;
};

export const Button = ({ label, handleClick }: ButtonProps) => {
  return <Container
    onClick={handleClick}
    data-testid="button-container"
    type="button"
  >
    <Label>{label}</Label>
  </Container>
}