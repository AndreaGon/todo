describe('Route Test', ()=>{
    it('should route to About', ()=>{
        cy.get('a').click();
        cy.url().should('include', 'about');
        cy.contains('Task Tracker');
        cy.contains('Version: 1.0.0');
    });

    it('should go back to home page', ()=>{
        cy.get('.home').click();
        cy.url().should('include', '/');
    });
});