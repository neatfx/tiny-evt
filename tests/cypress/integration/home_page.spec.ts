describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.get('[href="/#/c"]').click()
    cy.url().should('include', '/#/c')
  })
})
