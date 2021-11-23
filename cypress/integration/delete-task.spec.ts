describe('Delete Task', () => {
  it('should be initialized', () => {
    cy.visit('/');
    cy.contains('Task Tracker');
    //cy.get('app-button button').should('have.css', 'background-color', 'green');
  });

  it('should delete task', ()=>{
    cy.get('fa-icon').click({multiple: true});
    //cy.get('app-button button').should('have.css', 'background-color', 'red');
    cy.get('app-task-item').should('not.exist');
  });
})
