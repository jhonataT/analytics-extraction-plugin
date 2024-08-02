import { ThemeProvider } from "styled-components";
import { theme } from "./styles/Theme";
import { Global } from "./styles/Global";
import { useThemeContext, UseThemeContext } from "./core/providers/theme";
import { Header } from "./components/Header";
import { HomeContainer } from "./containers/HomeContainer";
import { AboutContainer } from "./containers/AboutContainer";

const App = () => {
  const { selectedTheme }: UseThemeContext = useThemeContext();

  return <>
    <ThemeProvider theme={theme[selectedTheme]}>
      <Global/>
      <Header/>
      <HomeContainer/>
      <AboutContainer/>
    </ThemeProvider>
  </>
};

export default App;
