import React from 'react';
import { ProfilePhoto } from './index';

describe('<ProfilePhoto />', () => {
  it('renders and displays formatted name correctly', () => {
    const name = 'Jhonata Tenorio';

    cy.mount(<ProfilePhoto name={name} />);

    cy.get('[data-testid="profile-container"]').should('exist');
    cy.get('[data-testid="profile-name"]').should('contain', 'JT');
  });

  it('handles single name input', () => {
    const name = 'Jhonata';

    cy.mount(<ProfilePhoto name={name} />);

    cy.get('[data-testid="profile-container"]').should('exist');
    cy.get('[data-testid="profile-name"]').should('contain', 'J');
  });

  it('handles empty name input', () => {
    const name = '';

    cy.mount(<ProfilePhoto name={name} />);

    cy.get('[data-testid="profile-container"]').should('exist');
    cy.get('[data-testid="profile-name"]').should('contain', 'U');
  });
});
