import React from 'react';
import { Container } from './index';

describe('<Container />', () => {
  it('renders and contains children', () => {
    cy.mount(
      <Container id="test-container">
        <div data-testid="child-element">Child Element</div>
      </Container>
    );

    cy.get('[data-testid="layout-container"]').should('exist');
    cy.get('#test-container').should('exist');
    cy.get('[data-testid="child-element"]').should('exist').and('contain', 'Child Element');
  });
});
