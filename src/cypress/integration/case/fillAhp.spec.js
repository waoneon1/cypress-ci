import jwtDecode from 'jwt-decode';

const _ = require('lodash');

describe('pages > setting/index.vue', () => {
  const domain = 'Design';

  beforeEach(() => {
    cy.loginByGoogleApi();
  });

  it('Choose 9 whitelist employee', {
    viewportHeight: 700,
    viewportWidth: 900,
  }, () => {
    cy.visit('/dashboard');
    const loginData = jwtDecode(Cypress.env('token'));
    const usernameArray = _.split(loginData.user_name, ' ', 2);
    const username = _.join(usernameArray, ' ');

    // dashboard
    cy.log('dashboard page');
    cy.get('h1').should('have.text', username);
    cy.url().should('eq', `${Cypress.env('baseUrl')}/dashboard`);

    // criteria page
    cy.log('citeria page');
    const domainSlug = domain.toLowerCase();
    cy.get(`#${domainSlug}`).click();
    cy.wait(2000);
    cy.get('#criteriaTitle').should('have.text', domain);

    // qna swipeable
    cy.log('swipeable page');
    cy.get('#btnMulai').click();
    cy.wait(1000);
    cy.get('#swipeTitle').should('have.text', 'Mempersiapkan Data Employee');

    cy.log('choose 9 whitelist');
    _.forEach([0, 1, 2, 3, 4, 5, 6, 7, 8], () => {
      cy.get('#swipeMatch').click();
      cy.wait(500);
    });

    // qna page
    cy.get('#qnaTitle span').should('have.text', `Siapa yang kamu rekomendasikan untuk kriteria ${domain}`);
    cy.get('#employeeList').children().should('have.length', 9);
  });

  it('Choose 15 blacklist and 5 whitlist to test prepare employee page', {
    viewportHeight: 700,
    viewportWidth: 900,
  }, () => {
    cy.visit('/dashboard');
    const loginData = jwtDecode(Cypress.env('token'));
    const usernameArray = _.split(loginData.user_name, ' ', 2);
    const username = _.join(usernameArray, ' ');

    // dashboard
    cy.log('dashboard page');
    cy.get('h1').should('have.text', username);
    cy.url().should('eq', `${Cypress.env('baseUrl')}/dashboard`);

    // criteria page
    cy.log('citeria page');
    const domainSlug = domain.toLowerCase();
    cy.get(`#${domainSlug}`).click();
    cy.wait(2000);
    cy.get('#criteriaTitle').should('have.text', domain);

    // qna swipeable
    cy.log('swipeable page');
    cy.get('#btnMulai')
      .click();
    cy.wait(1000);
    cy.get('#swipeTitle')
      .should('have.text', 'Mempersiapkan Data Employee');

    cy.log('reject 15 whitelist');
    _.forEach([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], () => {
      cy.get('#swipeReject')
        .click();
      cy.wait(500);
    });

    cy.log('choose 5 whitelist');
    _.forEach([0, 1, 2, 3, 4], () => {
      cy.get('#swipeMatch')
        .click();
      cy.wait(500);
    });

    // qna page
    cy.get('#moreTitle span')
      .should('have.text', 'Apakah ada alterran lain yang bisa anda nilai ?');
    cy.get('#employeeList')
      .children()
      .its('length')
      .should('be.gt', 0);

    // search employee
    cy.get('input#cariAlterran')
      .type('ekky');
    cy.get('#employeeList').find('div.employee').eq(0).click();

    // reset search employee
    cy.get('input#cariAlterran')
      .clear();

    // choose 3 employee
    cy.get('#employeeList')
      .within(() => {
      // all searches are automatically rooted to the found tr element
        cy.get('div.employee').eq(1).click();
        cy.get('div.employee').eq(2).click();
        cy.get('div.employee').eq(3).click();
        cy.get('div.employee').eq(4).click();
        cy.get('div.employee').eq(5).click();
      });

    cy.get('#btnSubmit').find('span').should('have.text', 'Lanjutkan Penilaian').click();
  });
});
