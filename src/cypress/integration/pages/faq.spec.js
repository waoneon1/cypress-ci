import jwtDecode from 'jwt-decode';
const _ = require('lodash');

describe('FAQ Page', {
  viewportHeight: 700,
  viewportWidth: 900,
}, () => {

  beforeEach(() => {
    cy.loginByGoogleApi();
    cy.visit('/faq');
  });

  it('FAQS Show Success', () => {
    cy.get('h1').should('include.text', 'FAQs');
    cy.get('h1').should('include.text', 'Apa yang di maksud Software Engineer Competency Matrix?');
    cy.get('h1').should('include.text', 'Bagaimana cara memilih Alterrans?');
    cy.get('h1').should('include.text', 'Bagaimana jika dalam 1 halaman tidak ada Alterrans yang bisa direkomendasikan?');
    cy.get('h1').should('include.text', 'Seberapa lama saya harus melakukan proses pemilihan Alterrans ini?');

    cy.url().should('eq', `${Cypress.env('baseUrl')}/faq`);

    cy.get('a[href="/faq"]').parent().should('have.class', 'text-secondary')
  });

});
