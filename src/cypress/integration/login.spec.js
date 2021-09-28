import jwtDecode from 'jwt-decode';

const _ = require('lodash');

describe('Login Page', {
  viewportHeight: 700,
  viewportWidth: 900,
}, () => {
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

  it('Login Success', () => {
    cy.loginByGoogleApi();

    cy.visit('/dashboard');
    const loginData = jwtDecode("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzI5Njk1MDMuMTgxMTA5MiwidXNlcl9pZCI6IjYwYjQ2ZGYxZmQ0MGU5Yjk4MjZiZjAzNyIsInVzZXJfb2F1dGhfaWQiOiIxMTMzMzI3NjE3NTgwODA3Njc5MjkiLCJ1c2VyX2VtYWlsIjoiZGhhcm1hd2FuQGFsdGVycmEuaWQiLCJ1c2VyX25hbWUiOiJEaGFybWF3YW4gU3VrbWEgSGFyZGkgUHJhdGFtYSIsInVzZXJfb3JnYW5pemF0aW9uIjoiVEVDIC0gRU5HIiwidXNlcl9vcmdhbml6YXRpb25fZnVsbF90ZXh0IjoiVGVjaG5vbG9neSAtIEVuZ2luZWVyaW5nIiwidXNlcl9pbWFnZV91cmwiOiJodHRwczovL3RhbGVudGEuczMuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbS9hdmF0YXIvVlhlcnZVa0VtOExva0ZtYTdlMTJGMzRjNVRTZXhudU8uanBnIiwidXNlcl9idXNpbmVzc191bml0IjoiSE8gLSBUZWNobm9sb2d5In0.NfQ3ieKpFEDEqIRUVdKN9wrAsOh3hfObDnf1TEKgd5M");
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
});
