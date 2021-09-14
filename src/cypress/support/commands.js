// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import jwtDecode from 'jwt-decode'
const _ = require('lodash');

Cypress.Commands.add('loginByGoogleApi', () => {
  cy.log('Logging in to Google')
  window.localStorage.setItem('token', Cypress.env('token'))
  cy.visit('/')
})

Cypress.Commands.add('checkToken', () => {
  cy.window().its('localStorage.token').should('eq', Cypress.env('googleClientId'))
})
