describe('Add New Task', () => {
  it('should be initialized', () => {
    cy.visit('/');
    cy.contains('Task Tracker');
    //cy.get('app-button button').should('have.css', 'background-color', 'green');
  });

  it('should open task form', ()=>{
    cy.get('app-button').click();
    //cy.get('app-button button').should('have.css', 'background-color', 'red');
    cy.get('.add-form').should('be.visible');
  });

  it('should add new data in the list (with reminder)', ()=>{
    cy.get('input[name="text"]').type("Morning with reminder!");
    cy.get('input[name="day"]').type("October 1");
    cy.get('input[name="reminder"]').click();
    cy.get('input[type="submit"]').click();
    cy.contains("Morning with reminder!");
    cy.contains("October 1");
  });

  it('reminder should exist', ()=>{
    cy.get('.reminder').should('exist');
  })

  it('should update reminder on double click', ()=>{
    cy.get('app-task-item').dblclick();
    cy.get('.reminder').should('not.exist');
  });

  it('should close form', ()=>{
    cy.get('app-button').click();
    //cy.get('app-button button').should('have.css', 'background-color', 'red');
    cy.get('.add-form').should('not.exist');
  });
})
