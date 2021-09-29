import jwtDecode from 'jwt-decode';

const _ = require('lodash');

describe(
  'Login Page',
  {
    viewportHeight: 700,
    viewportWidth: 900,
  },
  () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Login page show success', () => {
      const title = 'Know Your Best';
      cy.get('h1').should('include.text', title);
    });

    it('Button clicked Success', () => {
      cy.get('#googleLoginBtn').should('not.have.class', 'active').click();
      cy.get('#googleLoginBtn').should('have.class', 'active');
    });

    it(`Login Success: ${Cypress.env('NUXT_ENV_CYPRESS_TOKEN')}`, () => {
      cy.loginByGoogleApi();

      cy.visit('/dashboard');
      cy.log('the log here');
      cy.log(Cypress.env('NUXT_ENV_CYPRESS_TOKEN'));
      const loginData = jwtDecode(Cypress.env('NUXT_ENV_CYPRESS_TOKEN'));
      const usernameArray = _.split(loginData.user_name, ' ', 2);
      const username = _.join(usernameArray, ' ');

      // dashboard
      cy.log('Dashboard Page');
      cy.get('h1').should('have.text', username);
      cy.url().should('eq', `${Cypress.env('BASEURL')}/dashboard`);
    });

    it('Login Failed', () => {
      cy.visit('/dashboard');
      cy.url().should('include', 'redirect_url');
    });
  },
);
