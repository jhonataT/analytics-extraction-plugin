import { createContext, ReactNode, useContext, useState } from "react";

export interface UseThemeContext {
  selectedTheme: 'light' | 'dark';
  toggleTheme: () => void;
};

interface ThemeContextProviderProps {
  children: ReactNode;
};

export const ThemeContext = createContext<UseThemeContext>({
  selectedTheme: 'dark',
  toggleTheme: () => {},
});

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [selectedTheme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    
    const rootElement = document.getElementById('root');
    rootElement?.classList.add(`theme-${selectedTheme === 'dark' ? 'light' : 'dark'}`);
    rootElement?.classList.remove(`theme-${selectedTheme}`);
  };

  return (
    <ThemeContext.Provider value={{ selectedTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
