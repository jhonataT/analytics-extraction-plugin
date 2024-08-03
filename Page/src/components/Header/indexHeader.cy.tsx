import React from 'react';
import { Header } from './index';
import { MockThemeProvider } from '../../core/providers/theme.mock';

describe('<Header />', () => {
  it('renders and toggles menu', () => {
    const toggleTheme = cy.spy().as('toggleThemeSpy');

    cy.mount(
      <MockThemeProvider theme="light" toggleTheme={toggleTheme}>
        <Header />
      </MockThemeProvider>
    );

    cy.get('header').should('exist');
    cy.get('[data-testid="menu-icon"]').click();
    cy.get('.active').should('exist');

    cy.get('[data-testid="menu-icon"]').click();
    cy.get('[data-testid="header-list-item"]').should('have.length', 4);
    cy.get('[data-testid="theme-switch"]').should('exist');
  });
});
