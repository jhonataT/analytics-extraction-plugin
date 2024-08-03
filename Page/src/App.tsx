import { ThemeProvider } from "styled-components";
import { theme } from "./styles/Theme";
import { Global } from "./styles/Global";
import { useThemeContext, UseThemeContext } from "./core/providers/theme";
import { Header } from "./components/Header";
import { HomeContainer } from "./containers/HomeContainer";
import { AboutContainer } from "./containers/AboutContainer";
import { ProjectsContainer } from "./containers/ProjectsContainer";
import { PostsContainer } from "./containers/PostsContainer";
import { Footer } from "./components/Footer";

const App = () => {
  const { selectedTheme }: UseThemeContext = useThemeContext();

  return <>
    <ThemeProvider theme={theme[selectedTheme]}>
      <Global/>
      <Header/>
      <HomeContainer/>
      <AboutContainer/>
      <ProjectsContainer/>
      <PostsContainer/>
      <Footer/>
    </ThemeProvider>
  </>
};

export default App;
