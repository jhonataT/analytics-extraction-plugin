import { getAvatarName } from '../../core/utils/getAvatarName';

import AvatarHugo from '../../assets/Images/hugo_avatar.webp';
import AvatarMaya from '../../assets/Images/maya_avatar.webp';
import { AvatarImg, ConicGradient, Container, Content, HighlightText, Section, Title } from "./styles";
import { Button } from '../../components/Button';

interface HomeScreenProps {
  currentTheme: 'light' | 'dark';
};

export const HomeScreen = ({ currentTheme }: HomeScreenProps) => {
  return <Container>
    <ConicGradient/>
    <Section>
      <Content>
        <Title>
          Olá, meu nome é {getAvatarName(currentTheme, true)}!
          <HighlightText>
            Sou responsável por traduções virtuais incríveis.
          </HighlightText>
        </Title>
        <Button
          label='Entre em contato'
          handleClick={() => {}}
        />
      </Content>
      <AvatarImg
        src={currentTheme === 'dark' ? AvatarHugo : AvatarMaya}
        alt={`${getAvatarName(currentTheme, false)} dando as boas-vindas`}
      />
    </Section>
  </Container>
}