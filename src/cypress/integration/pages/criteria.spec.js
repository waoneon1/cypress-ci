describe('Dashboard Page', {
  viewportHeight: 700,
  viewportWidth: 900,
}, () => {
  beforeEach(() => {
    cy.loginByGoogleApi();
    cy.visit('/dashboard');
  });

  it('Criteria Design Show Short Description Success', () => {
    const domain = 'Design';
    const domainSlug = domain.toLowerCase();
    cy.get(`#${domainSlug}`).click();

    while (cy.get('#criteriaTitle').contains('Loading ...').length > 0) {
      cy.wait(1000);
    }

    cy.get('#criteriaTitle').should('have.text', domain);

    cy.get('p').invoke('text').then((text) => {
      const short = 'Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk membuat design arsitektur';
      expect(text.length).to.be.at.least(20);
      expect(text).to.contain(short);
    });
  });

  it('Criteria Design Show Full Description Success', () => {
    const domain = 'Design';
    const domainSlug = domain.toLowerCase();
    cy.get(`#${domainSlug}`).click();

    cy.get('#btnInfo').click();
    cy.contains(`Competency ${domain}`).should('be.visible');

    cy.get('p').invoke('text').then((text) => {
      const long = 'Keterampilan desain perangkat lunak digunakan untuk mengembangkan dan menggambarkan arsitektur perangkat lunak suatu sistem berdasarkan persyaratan perangkat lunaknya';

      expect(text.length).to.be.at.least(20);
      expect(text).to.contain(long);
    });

    cy.get('#btnInfo').click();
    cy.contains(`Competency ${domain}`).should('not.be.visible');
  });
});
