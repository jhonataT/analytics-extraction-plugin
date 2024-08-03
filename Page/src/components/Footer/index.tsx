import { FaGithub, FaLinkedin } from "react-icons/fa"
import { FooterContainer, FooterSection } from "./styles"

export const Footer = () => {
  return <FooterContainer>
    <FooterSection>
      <h3>Desafio para Hand Talk @2024</h3>
      <ul>
        <li>
          <a href="https://github.com/jhonataT" target="__blank" title="Acessar Github">
            <FaGithub/>
            <span>Meu Github</span>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/jhonatat/" target="__blank" title="Acessar Github">
            <FaLinkedin/>
            <span>Meu Linkedin</span>
          </a>
        </li>
      </ul>
    </FooterSection>
  </FooterContainer>
}