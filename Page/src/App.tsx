import { ThemeProvider } from "styled-components";
import { theme } from "./styles/Theme";
import { Global } from "./styles/Global";
import { HomeContainer } from "./containers/HomeContainer";
import { Header } from "./components/Header";
import { useThemeContext, UseThemeContext } from "./core/providers/theme";

const App = () => {
  const { selectedTheme }: UseThemeContext = useThemeContext();

  return <>
    <ThemeProvider theme={theme[selectedTheme]}>
      <Global/>
      <Header/>
      <HomeContainer/>
      <HomeContainer/>
    </ThemeProvider>
  </>
};

export default App;
