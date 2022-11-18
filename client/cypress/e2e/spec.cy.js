describe('empty spec', () => {
  it('loads the page', () => {
    cy.visit('http://localhost:3000/');

    cy.contains('aTYPEical').click()
    cy.url().should('equal', 'http://localhost:3000/')

    let text = '';
    cy.get('#textArea span').each(span => {
      text += span.text();
    }).then(()=>{
      cy.get('#mainPageInput')
      .type(text, {
        delay:0
      })
    }).url().should('equal', 'http://localhost:3000/stats')


    cy.get('.stats').each((el, index) => {
      console.log(el.text());
      console.log(index);
      if (index === 3) {
        cy.contains('Accuracy: 100.00%');
      }
    });

    console.log({text});


  })
})