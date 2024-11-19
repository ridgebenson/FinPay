describe('Landing Page', () => {
  it('should load the landing page and display the correct title', () => {
    cy.visit('/')
    cy.title().should('include', "FinPay")
  })

  it('should navigate to login when login button is clicked', () => {
    cy.visit('/')
    cy.get('[data-test=login_button]').should('exist').click()
  });

  it('should login when login button is clicked after correct email and password', () => {
    cy.visit('/')
    cy.wait(3000)
    cy.get('[data-test=login_button]').should('exist').click()
    cy.wait(3000)
    cy.get('[data-test=email]').type('test@example.com')
    cy.wait(3000)
    cy.get('[data-test=pwd]').type('Password123')
    cy.wait(3000)
    cy.get('[data-test=lgn_btn]').click()
  });

})