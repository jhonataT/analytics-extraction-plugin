import React from 'react';
import { Footer } from './index';

describe('<Footer />', () => {
  it('renders and has correct links', () => {
    cy.mount(<Footer />);

    cy.get('[data-testid="footer-container"]').should('exist');
    cy.get('[data-testid="footer-section"]').should('exist');

    cy.get('[data-testid="github-link"]').should('have.attr', 'href', 'https://github.com/jhonataT');
    cy.get('[data-testid="linkedin-link"]').should('have.attr', 'href', 'https://www.linkedin.com/in/jhonatat/');

    cy.get('[data-testid="github-link"]').find('svg').should('exist');
    cy.get('[data-testid="linkedin-link"]').find('svg').should('exist');

    cy.get('[data-testid="github-link"]').contains('Meu Github');
    cy.get('[data-testid="linkedin-link"]').contains('Meu Linkedin');
  });
});
