import { ReactNode } from 'react';
import { SwitchThemeMode } from './index';
import { ThemeProvider } from 'styled-components';
import { theme as themeOptions } from '../../styles/Theme';
import { ThemeContext } from '../../core/providers/theme';

interface MockThemeProviderProps {
  children: ReactNode;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
};

const MockThemeProvider = ({ children, theme, toggleTheme }: MockThemeProviderProps) => (
  <ThemeContext.Provider value={{ selectedTheme: theme, toggleTheme }}>
    <ThemeProvider theme={themeOptions[theme]}>
      {children}
    </ThemeProvider>
  </ThemeContext.Provider>
);

describe('<SwitchThemeMode />', () => {
  it('renders in light mode and toggles theme', () => {
    const toggleTheme = cy.spy().as('toggleThemeSpy');

    cy.mount(
      <MockThemeProvider theme="light" toggleTheme={toggleTheme}>
        <SwitchThemeMode />
      </MockThemeProvider>
    );

    cy.get('[data-testid="theme-switch"]').should('exist');
    cy.get('[data-testid="icon-sun"]').should('have.class', 'active');
    cy.get('[data-testid="icon-moon"]').should('not.have.class', 'active');

    cy.get('[data-testid="theme-switch"]').click();
    cy.get('@toggleThemeSpy').should('have.been.calledOnce');
  });

  it('renders in dark mode', () => {
    const toggleTheme = cy.spy().as('toggleThemeSpy');

    cy.mount(
      <MockThemeProvider theme="dark" toggleTheme={toggleTheme}>
        <SwitchThemeMode />
      </MockThemeProvider>
    );

    cy.get('[data-testid="icon-moon"]').should('have.class', 'active');
    cy.get('[data-testid="icon-sun"]').should('not.have.class', 'active');
  });
});
