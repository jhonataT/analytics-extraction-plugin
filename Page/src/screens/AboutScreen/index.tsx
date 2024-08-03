import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Section } from "../../components/Section";
import { ResumeItem } from "../../containers/AboutContainer/@types";
import { ConicGradient, LeftSide, RightSide } from "./styles";

interface AboutScreenProps {
  resumeDetails: ResumeItem[];
};

export const AboutScreen = ({ resumeDetails }: AboutScreenProps) => {
  const description = `Sou um Tradutor Automático de Libras e ASL da Hand Talk conecta o seu site a milhões de pessoas 
  através da nossa tecnologia de AI para Língua de Sinais. Única no Brasil com mais de 10 anos de aprendizado.`

  const ResumeListItem = ({ title, options }: ResumeItem) => {
    return <div className="list__container">
      <h3>{title}</h3>
      <ul>
        {options.map(option => (<li key={option}>
          {option}
        </li>))}
      </ul>
    </div>
  }

  return <Container id="sobre">
    <ConicGradient/>
    <Section isReverseColumn={false}>
      <LeftSide>
        <h3>
          Sobre mim
        </h3>
        <p title={description}>{description}</p>
        <Button
          label="Solicite um orçamento"
          handleClick={() => {}}
        />
      </LeftSide>
      <RightSide>
        {resumeDetails.map(resumeItem => <ResumeListItem {...resumeItem}/>)}
      </RightSide>
    </Section>
  </Container>
}