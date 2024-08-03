import { Container } from "../../components/Container";
import { ProfilePhoto } from "../../components/ProfilePhoto";
import { Section } from "../../components/Section";
import { ConicGradient, PostCard, PostContent, PostRowContainer } from "./styles";

export const PostsScreen = () => {

  const PostRow = () => {
    return <PostRowContainer title="Ver postagem">
      <span className="date_content">05/08/2024</span>
      <div className="profile__container">
        <ProfilePhoto name="Jhonata Tenorio"/>
        <div className="profile_details__container">
          <span>Hand Talk</span>
          <span>email@handtalk.com</span>
        </div>
      </div>
      <div className="post_content">
        <h5>Link Festival 2024: o maior evento de acessibilidade digital da América Latina está chegando!</h5>
        <a
          href="https://www.handtalk.me/br/blog/link-festival-2024/"
          title="Ver postagem"
        >
          Ver postagem
        </a>
      </div>
    </PostRowContainer>
  };

  return <Container id="posts">
    <Section>
      <ConicGradient/>
      <PostCard>
        <h3>Últimas postagens</h3>
        <PostContent>
          <ul>
            {[...Array(60)].map((_, idx) => (
              <PostRow key={idx}/>
            ))}
          </ul>
        </PostContent>
      </PostCard>
    </Section>
  </Container>
};
