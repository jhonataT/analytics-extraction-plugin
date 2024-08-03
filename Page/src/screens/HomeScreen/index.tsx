import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { getAvatarName } from '../../core/utils/getAvatarName';

import AvatarHugo from '../../assets/Images/hugo_avatar.webp';
import AvatarMaya from '../../assets/Images/maya_avatar.webp';
import {
  AvatarImg,
  ConicGradient,
  Content,
  TextField
} from "./styles";
import { Section } from '../../components/Section';

interface HomeScreenProps {
  currentTheme: 'light' | 'dark';
};

export const HomeScreen = ({ currentTheme }: HomeScreenProps) => {
  return <Container id='inicio'>
    <ConicGradient/>
    <Section>
      <Content>
        <TextField>
          <h1>Olá, meu nome é {getAvatarName(currentTheme, true)}!</h1>
          <span>
            Sou responsável por traduções virtuais incríveis.
          </span>
        </TextField>
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
