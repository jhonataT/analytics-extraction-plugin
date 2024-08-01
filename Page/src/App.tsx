import { ThemeProvider } from "styled-components";
import { theme } from "./styles/Theme";
import { Global } from "./styles/Global";
import { HomeContainer } from "./containers/HomeContainer";

const App = () => {
  return <>
    <ThemeProvider theme={theme['dark']}>
      <Global/>
      <HomeContainer/>
    </ThemeProvider>
  </>
};

export default App;
