
describe('pages > setting/index.vue', () => {

  beforeEach(function () {
    cy.loginByGoogleApi()
    cy.visit('/setting')
  })

  it('Setting Page index', () => {
    cy.get('h1').should('have.text', 'Dharmawan Sukma Hardi Pratama');
  })

  it('Setting Page > Profile', () => {
    cy.get('#profile').should('be.visible').click()
    cy.get('h1').should('have.text', 'Profile');
    cy.get('#profileName').should('have.value', 'Dharmawan Sukma Hardi Pratama');
  })

  it('Setting Page > Logout', () => {
    cy.get('#logout').should('be.visible').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('Setting Page > Power Rank', () => {
    cy.get('#powerrank').should('be.visible').click()
    cy.get('h1').should('have.text', 'Power Rank')
    cy.url().should('eq', Cypress.config().baseUrl + '/setting/powerrank')
  })

});
