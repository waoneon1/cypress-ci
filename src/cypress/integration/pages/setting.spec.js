import jwtDecode from 'jwt-decode';

describe('pages > setting/index.vue', () => {
  const loginData = jwtDecode(Cypress.env('token'));

  beforeEach(() => {
    cy.loginByGoogleApi();
    cy.visit('/setting');
  });

  it('Setting Page index', () => {
    cy.get('h1').should('have.text', loginData.user_name);
  });

  it('Setting Page > Profile', () => {
    cy.get('#profile').should('be.visible').click();
    cy.get('h1').should('have.text', 'Profile');
    cy.get('#profileName').should('have.value', loginData.user_name);
  });

  it('Setting Page > Logout', () => {
    cy.get('#logout').should('be.visible').click();
    cy.url().should('eq', `${Cypress.env('baseUrl')}/`);
  });

  it('Setting Page > Power Rank', () => {
    cy.get('#powerrank').should('be.visible').click();
    cy.get('h1').should('have.text', 'Power Rank');
    cy.url().should('eq', `${Cypress.env('baseUrl')}/setting/powerrank`);
  });
});
