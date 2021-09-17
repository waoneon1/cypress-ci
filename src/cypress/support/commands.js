// Save localstorage
Cypress.Commands.add('loginByGoogleApi', () => {
  cy.log('Logging in to Google');
  window.localStorage.setItem('token', Cypress.env('token'));
  cy.visit('/');
});

// check token
Cypress.Commands.add('checkToken', () => {
  cy.window().its('localStorage.token').should('eq', Cypress.env('googleClientId'));
});

// Onboarding
Cypress.Commands.add('onboardingPage', () => {
  window.localStorage.setItem('rrs_onboard', 'true');
  cy.visit('/onboarding');
});
