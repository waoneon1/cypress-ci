// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginByGoogleApi', () => {
  cy.log('Logging in to Google')
  // cy.request({
  //   method: 'POST',
  //   url: 'https://accounts.google.com/o/oauth2/token',
  //   body: {
  //     grant_type: 'authorization_code',
  //     client_id: Cypress.env('googleClientId'),
  //   },
  // }).then(({ body }) => {
  //   const { access_token, id_token } = body

  //   cy.request({
  //     method: 'GET',
  //     url: 'https://www.googleapis.com/oauth2/v3/userinfo',
  //     headers: { Authorization: `Bearer ${access_token}` },
  //   }).then(({ body }) => {
  //     cy.log(body)
  //     const userItem = {
  //       token: id_token,
  //       user: {
  //         googleId: body.sub,
  //         email: body.email,
  //         givenName: body.given_name,
  //         familyName: body.family_name,
  //         imageUrl: body.picture,
  //       },
  //     }

  //     window.localStorage.setItem('token', JSON.stringify('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzE2ODIxMzYuNjQzNjY4NywidXNlcl9pZCI6IjYwYjQ2ZGYxZmQ0MGU5Yjk4MjZiZjAzNyIsInVzZXJfb2F1dGhfaWQiOiIxMTMzMzI3NjE3NTgwODA3Njc5MjkiLCJ1c2VyX2VtYWlsIjoiZGhhcm1hd2FuQGFsdGVycmEuaWQiLCJ1c2VyX25hbWUiOiJEaGFybWF3YW4gU3VrbWEgSGFyZGkgUHJhdGFtYSIsInVzZXJfb3JnYW5pemF0aW9uIjoiVEVDIC0gRU5HIiwidXNlcl9vcmdhbml6YXRpb25fZnVsbF90ZXh0IjoiVGVjaG5vbG9neSAtIEVuZ2luZWVyaW5nIiwidXNlcl9pbWFnZV91cmwiOiJodHRwczovL3RhbGVudGEuczMuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbS9hdmF0YXIvVlhlcnZVa0VtOExva0ZtYTdlMTJGMzRjNVRTZXhudU8uanBnIiwidXNlcl9idXNpbmVzc191bml0IjoiSE8gLSBUZWNobm9sb2d5In0.uwZmTkQxhPPRajCzlSnjLXPXygufDb4lkoJhIrnsrk4'))
  //     cy.visit('/')
  //   })
  // })
  window.localStorage.setItem('token', JSON.stringify('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzE3MDcyODEuMTk3MzM3MiwidXNlcl9pZCI6IjYwYjQ2ZGYxZmQ0MGU5Yjk4MjZiZjAzNyIsInVzZXJfb2F1dGhfaWQiOiIxMTMzMzI3NjE3NTgwODA3Njc5MjkiLCJ1c2VyX2VtYWlsIjoiZGhhcm1hd2FuQGFsdGVycmEuaWQiLCJ1c2VyX25hbWUiOiJEaGFybWF3YW4gU3VrbWEgSGFyZGkgUHJhdGFtYSIsInVzZXJfb3JnYW5pemF0aW9uIjoiVEVDIC0gRU5HIiwidXNlcl9vcmdhbml6YXRpb25fZnVsbF90ZXh0IjoiVGVjaG5vbG9neSAtIEVuZ2luZWVyaW5nIiwidXNlcl9pbWFnZV91cmwiOiJodHRwczovL3RhbGVudGEuczMuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbS9hdmF0YXIvVlhlcnZVa0VtOExva0ZtYTdlMTJGMzRjNVRTZXhudU8uanBnIiwidXNlcl9idXNpbmVzc191bml0IjoiSE8gLSBUZWNobm9sb2d5In0.FwTe-7OKI0829lZ1bFgG9cmomLxZhYEMPBrdW2Rs1J0'))
  cy.visit('/')
})