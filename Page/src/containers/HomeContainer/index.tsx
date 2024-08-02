import { UseThemeContext, useThemeContext } from "../../core/providers/theme";
import { HomeScreen } from "../../screens/HomeScreen";

export const HomeContainer = () => {
  const { selectedTheme }: UseThemeContext = useThemeContext();

  return <HomeScreen
    currentTheme={selectedTheme}
  />
}