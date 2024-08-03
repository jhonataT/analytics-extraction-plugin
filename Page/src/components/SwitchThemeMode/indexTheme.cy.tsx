import { MockThemeProvider } from '../../core/providers/theme.mock';
import { SwitchThemeMode } from './index';

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
