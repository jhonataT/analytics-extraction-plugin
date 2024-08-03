import { Button } from './index';

describe('<Button />', () => {
  it('renders and handles click', () => {
    cy.mount(<Button label='LABEL HERE' handleClick={() => {}} />);

    cy.get('[data-testid="button-container"]').should('exist');
    cy.get('[data-testid="button-container"]').contains('ANY LABEL');
    
    const handleClick = cy.spy().as('handleClickSpy');

    cy.mount(<Button label='ANY LABEL' handleClick={handleClick} />);
    cy.get('[data-testid="button-container"]').click();
    cy.get('@handleClickSpy').should('have.been.calledOnce');
  });
});
