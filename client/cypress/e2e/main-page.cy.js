describe('Main page tests', () => {
  it('loads the main page if click the "aTYPEical" in the navbar', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('aTYPEical').click();
    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('shows the green coloured text when the input is correct (apart from the last letter)', () => {
    cy.visit('http://localhost:3000/');

    let text = '';
    let textForInput = cy.get('#textArea span');

    textForInput.each((span, index) => {
      text += span.text();
    }).then(() => {
      text = text.slice(0, text.length - 1);
      cy.get('#mainPageInput').type(text, {
        delay: 0,
      });
    })

    cy.get('#textArea span').each((span, index) => {
      if (index < text.length - 1) {
        cy.wrap(span).should('have.css', 'color', 'rgb(0, 128, 0)')
      }
    })
  });

  it('shows the red coloured text when the input the incorrect (apart from the last letter)', () => {
    cy.visit('http://localhost:3000/');

    let text = '';
    let textForInput = cy.get('#textArea span');

    textForInput.each((span) => {
      text += '|';
    }).then(() => {
      text = text.slice(0, text.length - 1);
      cy.get('#mainPageInput').type(text, {
        delay: 20,
      });
    })

    cy.get('#textArea span').each((span, index) => {
      if (index < text.length - 1) {
        cy.wrap(span).should('have.css', 'color', 'rgb(255, 0, 0)')
      }
    })
  });

  // it('shows the grey coloured text when erasing a letter with backspace', () => {

  //   // Somehow didn't manage to finish this one, got annoyed and erased everything. I'll try tomorrow
  // });

  it('takes you to the "/stats" page when finish typing the text', () => {
    cy.visit('http://localhost:3000/');

    let text = '';
    cy.get('#textArea span')
      .each((span) => {
        text += span.text();
      })
      .then(() => {
        cy.get('#mainPageInput').type(text, {
          delay: 0,
        });
      })
      .url()
      .should('equal', 'http://localhost:3000/stats');
      // cy.get('.stats').each((el, index) => {
      //   console.log(el.text());
      //   console.log(index);
      //   if (index === 3) {
      //     cy.contains('Accuracy: 100.00%');
      //   }
      // });
  });

  it('displays "Accuracy: 100.00%" when type the right text', () => {
    cy.get('.stats').each((el, index) => {
      if (index === 3) {
        cy.contains('Accuracy: 100.00%');
      }
    });
  });
});
