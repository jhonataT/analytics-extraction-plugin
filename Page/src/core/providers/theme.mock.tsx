import { ThemeProvider } from "styled-components";
import { ThemeContext } from "./theme";
import { theme as themeOptions } from "../../styles/Theme";
import { ReactNode } from "react";

interface MockThemeProviderProps {
  children: ReactNode;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
};

export const MockThemeProvider = ({ children, theme, toggleTheme }: MockThemeProviderProps) => (
  <ThemeContext.Provider value={{ selectedTheme: theme, toggleTheme }}>
    <ThemeProvider theme={themeOptions[theme]}>
      {children}
    </ThemeProvider>
  </ThemeContext.Provider>
);
