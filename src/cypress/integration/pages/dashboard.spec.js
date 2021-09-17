import jwtDecode from 'jwt-decode';
const _ = require('lodash');

describe('Dashboard Page', {
  viewportHeight: 700,
  viewportWidth: 900,
}, () => {

  beforeEach(() => {
    cy.loginByGoogleApi();
    cy.visit('/dashboard');
  });

  it('Dashboard show Name', () => {
    const loginData = jwtDecode(Cypress.env('token'));
    const usernameArray = _.split(loginData.user_name, ' ', 2);
    const username = _.join(usernameArray, ' ');

    // dashboard
    cy.log('Dashboard Page');
    cy.get('h1').should('have.text', username);
    cy.url().should('eq', `${Cypress.env('baseUrl')}/dashboard`);
  });

  it('Dashboard show 9 criteria Success', () => {
    cy.get('#design').within(() => {
      cy.contains('Design').should('have.text', 'Design')
    })
    cy.get('#requirements').within(() => {
      cy.contains('Requirements').should('have.text', 'Requirements')
    })
    cy.get('#construction').within(() => {
      cy.contains('Construction').should('have.text', 'Construction')
    })
    cy.get('#sustainment').within(() => {
      cy.contains('Sustainment').should('have.text', 'Sustainment')
    })
    cy.get('#process').within(() => {
      cy.contains('Process').should('have.text', 'Process')
    })
    cy.get('#systems-engineering').within(() => {
      cy.contains('Systems Engineering').should('have.text', 'Systems Engineering')
    })
    cy.get('#quality').within(() => {
      cy.contains('Quality').should('have.text', 'Quality')
    })
    cy.get('#security').within(() => {
      cy.contains('Security').should('have.text', 'Security')
    })
    cy.get('#measurement').within(() => {
      cy.contains('Measurement').should('have.text', 'Measurement')
    })
  });

});
