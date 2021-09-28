// Save localstorage
Cypress.Commands.add('loginByGoogleApi', () => {
  cy.log('Logging in to Google');
  window.localStorage.setItem('token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzI5Njk1MDMuMTgxMTA5MiwidXNlcl9pZCI6IjYwYjQ2ZGYxZmQ0MGU5Yjk4MjZiZjAzNyIsInVzZXJfb2F1dGhfaWQiOiIxMTMzMzI3NjE3NTgwODA3Njc5MjkiLCJ1c2VyX2VtYWlsIjoiZGhhcm1hd2FuQGFsdGVycmEuaWQiLCJ1c2VyX25hbWUiOiJEaGFybWF3YW4gU3VrbWEgSGFyZGkgUHJhdGFtYSIsInVzZXJfb3JnYW5pemF0aW9uIjoiVEVDIC0gRU5HIiwidXNlcl9vcmdhbml6YXRpb25fZnVsbF90ZXh0IjoiVGVjaG5vbG9neSAtIEVuZ2luZWVyaW5nIiwidXNlcl9pbWFnZV91cmwiOiJodHRwczovL3RhbGVudGEuczMuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbS9hdmF0YXIvVlhlcnZVa0VtOExva0ZtYTdlMTJGMzRjNVRTZXhudU8uanBnIiwidXNlcl9idXNpbmVzc191bml0IjoiSE8gLSBUZWNobm9sb2d5In0.NfQ3ieKpFEDEqIRUVdKN9wrAsOh3hfObDnf1TEKgd5M");
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

// save localstoreage whitelist env
Cypress.Commands.add('setWhitelist', () => {
  cy.log('White list Set');
  window.localStorage.setItem('rrs_whitelist', JSON.stringify(Cypress.env('rrs_whitelist')));
});
