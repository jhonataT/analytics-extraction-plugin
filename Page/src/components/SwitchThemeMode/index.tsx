import { IoMdSunny, IoMdMoon } from 'react-icons/io';
import { useThemeContext } from '../../core/providers/theme';
import { SwitchContainer } from "./styles";

export const SwitchThemeMode = () => {
  const { selectedTheme, toggleTheme } = useThemeContext();

  return (
    <SwitchContainer onClick={toggleTheme} data-testid="theme-switch">
      <IoMdMoon
        className={selectedTheme === 'dark' ? 'active' : ''}
        data-testid="icon-moon"
      />
      <IoMdSunny
        className={selectedTheme === 'light' ? 'active' : ''}
        data-testid="icon-sun"
      />
    </SwitchContainer>
  );
};
