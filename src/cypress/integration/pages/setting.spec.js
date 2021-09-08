
describe('pages > setting/index.vue', () => {
  it('berhasil mounting komponen', () => {
    cy.visit('/setting')
    //cy.get('h1').contains('Dharmawan Sukma Hardi Pratama');
    cy.get('h1').should('have.text', 'Dharmawan Sukma Hardi Pratama');

  });
});
