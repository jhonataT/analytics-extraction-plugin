import React from 'react';
import { Section } from './index';

describe('<Section />', () => {
  it('renders and applies reverse column style', () => {
    cy.mount(
      <Section isReverseColumn={true}>
        <div data-testid="child-element">Child Element</div>
      </Section>
    );

    cy.get('[data-testid="layout-section"]').should('exist');
    cy.get('[data-testid="layout-section"]').should('have.attr', 'reverse', 'true');
    cy.get('[data-testid="child-element"]').should('exist').and('contain', 'Child Element');
  });

  it('applies correct style when isReverseColumn is false', () => {
    cy.mount(
      <Section isReverseColumn={false}>
        <div data-testid="child-element">Child Element</div>
      </Section>
    );

    cy.get('[data-testid="layout-section"]').should('exist');
    cy.get('[data-testid="layout-section"]').should('have.attr', 'reverse', 'false');
  });
});
