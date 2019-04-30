/// <reference types="Cypress" />
context('Latest News List', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('at least some a link should have links', () => {
    // when it's ShowHN/AskHN, there's no link with the story object
    cy.get('[data-cy=story-container] a[href]')
      .first()
      .should('have.attr', 'href');
  });

  it.only('when scrolled to bottom, more stories are loaded', () => {
    cy.get('[data-cy=story-container] a').then(() => {
      const initCount = Cypress.$('[data-cy=story-container]').length;
      cy.get('[data-cy=story-container]')
        .last()
        .scrollIntoView();
      cy.wait(1000);
      cy.get('[data-cy=story-container]')
        .its('length')
        .should('be.gt', initCount);
    });
  });
});
