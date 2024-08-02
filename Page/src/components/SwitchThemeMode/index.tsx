import { IoMdSunny, IoMdMoon } from 'react-icons/io';
import { useThemeContext } from '../../core/providers/theme';
import { SwitchContainer } from "./styles"

export const SwitchThemeMode = () => {
  const { selectedTheme, toggleTheme } = useThemeContext();

  return <SwitchContainer onClick={toggleTheme}>
    <IoMdMoon className={selectedTheme === 'dark' ? 'active' : ''}/>
    <IoMdSunny className={selectedTheme === 'light' ? 'active' : ''}/>
  </SwitchContainer>
}