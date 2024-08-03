import { Container } from "../../components/Container";
import { Section } from "../../components/Section";

import gupyProjectBg from '../../assets/Images/project_gupy_bg.png';
import { ProjectCard, ProjectContent, ProjectFooter, TextBox } from "./styles";

export const ProjectsScreen = () => {
  return <Container id="projetos">
    <Section>
      <ProjectCard>
        <h3>Projetos</h3>
        <ProjectContent>
          <img
            src={gupyProjectBg}
            alt="Projeto realizado em parceria com a gupy"
          />
          <TextBox>
            <h4>
              Gupy e Hand Talk: mãos que falam, talentos que brilham
            </h4>
            <p>
              Conheça as práticas de diversidade e inclusão que fazem essa ser uma parceria de sucesso.
            </p>
            <a
              href="https://www.handtalk.me/br/conteudos/formato/case/"
              title="Ver mais sobre o projeto Gupy + Hand Talk"
            >
              Ver mais
            </a>
          </TextBox>
        </ProjectContent>
        <ProjectFooter>
          <a
            href="https://www.handtalk.me/br/conteudos/formato/case/"
            title="Ver todos os projetos"
          >
            Ver todos os projetos
          </a>
        </ProjectFooter>
      </ProjectCard>
    </Section>
  </Container>
};
