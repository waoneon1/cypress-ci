import jwtDecode from 'jwt-decode';
const _ = require('lodash');

describe('Onboarding Page', {
  viewportHeight: 700,
  viewportWidth: 900,
}, () => {

  beforeEach(() => {
    cy.loginByGoogleApi();
  });

  it('Onboarding Success', () => {
    cy.onboardingPage()
    const title = 'Selamat Datang di Aplikasi RRS'
    cy.get('h1').should('include.text', title)

    cy.get('h1').should('include.text', 'Apa itu RRS')
    cy.contains('Lanjut').should('be.visible')
    cy.contains('Kembali').should('not.be.visible')
    cy.contains('Lanjut').click()

    cy.get('h1').should('include.text', 'Mempersiapkan Data Alterrans')
    cy.contains('Lanjut').should('be.visible')
    cy.contains('Kembali').should('be.visible')
    cy.contains('Lanjut').click()

    cy.get('h1').should('include.text', 'Software Engineer Competency Matrix')
    cy.contains('Lanjut').should('be.visible')
    cy.contains('Kembali').should('be.visible')
    cy.contains('Lanjut').click()

    cy.get('h1').should('include.text', 'Pilih Alterans Rekomendasimu')
    cy.contains('Lanjut').should('be.visible')
    cy.contains('Kembali').should('be.visible')
    cy.contains('Lanjut').click()

    cy.get('h1').should('include.text', 'Pilih Bantuan')
    cy.contains('Selesai').should('be.visible')
    cy.contains('Kembali').should('be.visible')
    cy.contains('Selesai').click()

    cy.url().should('eq', `${Cypress.env('baseUrl')}/dashboard`);
  });

  it('Onboarding ByPass Dashboard', () => {    
    cy.visit('/dashboard');
    const loginData = jwtDecode(Cypress.env('token'));
    const usernameArray = _.split(loginData.user_name, ' ', 2);
    const username = _.join(usernameArray, ' ');

    // dashboard
    cy.log('Dashboard Page');
    cy.get('h1').should('have.text', username);
    cy.url().should('eq', `${Cypress.env('baseUrl')}/dashboard`);
  });
});
