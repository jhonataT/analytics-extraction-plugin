import { AboutScreen } from "../../screens/AboutScreen";
import { ResumeItem } from "./@types";

export const AboutContainer = () => {
  const resumeDetails: ResumeItem[] = [
    {
      title: 'Ferramentas',
      options: ['Inteligência Artificial', 'Tecnologias Web', 'Tecnologias Mobile']
    },
    {
      title: 'Propósito',
      options: ['Um mundo mais acessível', 'Foco humano', 'Impacto Social']
    },
    {
      title: 'Conteúdos',
      options: ['Artigos', 'E-Books', 'Link: Festival Digital de Acessibilidade']
    },
    {
      title: 'Aplicativo Social',
      options: ['Gratuito', 'Português e Libras', 'Inglês e ASL']
    },
  ];

  return <AboutScreen
    resumeDetails={resumeDetails}
  />
};
