import jwtDecode from 'jwt-decode'

describe('pages > setting/index.vue', () => {

  let loginData
  const domain = "Design"

  before(() => {
    loginData = jwtDecode(Cypress.env('token'));
    cy.loginByGoogleApi()
  })

  it('Visit Dashboard Page', () => {
    cy.visit('/dashboard')
    const loginData = jwtDecode(Cypress.env('token'));
    const usernameArray = _.split(loginData.user_name, ' ', 2);
    const username = _.join(usernameArray, ' ');
    cy.wait(5000)
    cy.get('h1').should('have.text', username);
    cy.url().should('eq', Cypress.env('baseUrl') + '/dashboard')
  })
  
  // it('Show Page Criteria Description', () => {
  //   const domainSlug = domain.toLowerCase();
  //   cy.get('#' + domainSlug).click();
  //   cy.get('h1').should('have.text', domainSlug);
  // })

  // it('Show Page QNA', () => {
  //   cy.get('#btnMulai').click();
  // })

});
  