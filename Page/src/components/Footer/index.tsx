import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FooterContainer, FooterSection } from "./styles";

export const Footer = () => {
  return (
    <FooterContainer data-testid="footer-container">
      <FooterSection data-testid="footer-section">
        <h3>Desafio para Hand Talk @2024</h3>
        <ul>
          <li>
            <a
              href="https://github.com/jhonataT"
              target="_blank"
              title="Acessar Github"
              data-testid="github-link"
            >
              <FaGithub />
              <span>Meu Github</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/jhonatat/"
              target="_blank"
              title="Acessar Linkedin"
              data-testid="linkedin-link"
            >
              <FaLinkedin />
              <span>Meu Linkedin</span>
            </a>
          </li>
        </ul>
      </FooterSection>
    </FooterContainer>
  );
};
