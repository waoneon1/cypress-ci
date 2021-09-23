describe('AHP Choose Page Success', {
  viewportHeight: 700,
  viewportWidth: 900,
}, () => {
  beforeEach(() => {
    cy.loginByGoogleApi();
    cy.setWhitelist();
    cy.visit('/qna/design');
  });

  it('AHP default button lanjut disabled Success', () => {
    cy.get('#getNextBtn').should('be.disabled');
  });

  it('AHP button lanjut enabled Success', () => {
    cy.get('#employeeList').children().should('have.length', 9);
    cy.get('#employeeList')
      .within(() => {
        cy.get('div.employee').eq(1).click();
        cy.get('div.employee').eq(2).click();
        cy.get('div.employee').eq(3).click();
      });
    cy.get('#getNextBtn').should('not.be.disabled');
  });

  it('AHP max 3 choose Success', () => {
    cy.get('#employeeList').children().should('have.length', 9);
    cy.get('#employeeList')
      .within(() => {
        cy.get('div.employee').eq(1).click();
        cy.get('.fill-current.text-success').parent().filter(':visible').should('have.length', 1);

        cy.get('div.employee').eq(2).click();
        cy.get('.fill-current.text-success').parent().filter(':visible').should('have.length', 2);

        cy.get('div.employee').eq(3).click();
        cy.get('.fill-current.text-success').parent().filter(':visible').should('have.length', 3);

        cy.get('div.employee').eq(4).click();
        cy.get('.fill-current.text-success').parent().filter(':visible').should('have.length', 3);

        cy.get('div.employee').eq(5).click();
        cy.get('.fill-current.text-success').parent().filter(':visible').should('have.length', 3);
      });
    cy.get('#getNextBtn').should('not.be.disabled');
  });
});
