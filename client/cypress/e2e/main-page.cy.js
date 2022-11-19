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
        delay: 0,
      });
    })

    cy.get('#textArea span').each((span, index) => {
      if (index < text.length - 1) {
        cy.wrap(span).should('have.css', 'color', 'rgb(255, 0, 0)')
      }
    })
  });

  // ! Do later
  // it('shows the grey coloured text when erasing a letter with backspace', () => {

  //   // Grab the text
  //   cy.visit('http://localhost:3000/');

  //   let text = '';
  //   let parts = [];
  //   cy.get('#textArea span').each((span, index) => {
  //     text += span.text();
  //   }).then(() => {


  //   });

  //   // Split it into parts of 10 (don't count by the first digit, as it may be bigger than 99)
  //   // ? You might want to include the letters you are going to erase in the next part
  //   // ? Should I keep the span id? or I could just use the index to grab the right one?
  //   // Type out every part
  //   // After every part erase 1
  //   // Check if the erased letter has grey color
  //   // // Type the erased letter
  //   // // Type the next part and do the same
  //   // Type the next part, that includes the erased letter
  //   // Do until all of the text is typed out


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

  it('displays "Accuracy: ~50%" when type the text only half right', () => {
    cy.visit('http://localhost:3000/');

    let text = '';
    let theRightLetter = true;
    cy.get('#textArea span')
      .each((span, index) => {
        if (theRightLetter) {
          text += span.text();
          theRightLetter = false;
        } else {
          text += '|';
          theRightLetter = true;
        }
      })
      .then(() => {
        console.log(text);
        cy.get('#mainPageInput').type(text, {
          delay: 0,
        });
      })
    cy.get('.stats').each((el, index) => {
      if (index === 3) {
        let accuracy = Number(el.text().replace('Accuracy: ', '').replace('%', ''));
        expect(49 < accuracy).to.be.true;
        expect(accuracy < 51).to.be.true;
      }
    });
  });

  it('if typing speed is 100 (delay: 100 in the test) - WPM ~ 111 ', () => {
    cy.visit('http://localhost:3000/');

    let text = '';
    cy.get('#textArea span')
      .each((span) => {
        text += span.text();
      })
      .then(() => {
        cy.get('#mainPageInput').type(text, {
          delay: 100,
        });
      })
      .url()
      .should('equal', 'http://localhost:3000/stats');
      cy.get('.stats').each((el, index) => {
        if (index === 1) {
          let rawWPM = Number(el.text().replace('Raw WPM: ', ''));
          console.log(rawWPM);
          expect(105 < rawWPM).to.be.true;
          expect(rawWPM < 114).to.be.true;
        }
      });
  });

  it('if typing speed is 200 (delay: 200 in the test) - WPM ~ 57 ', () => {
    cy.visit('http://localhost:3000/');

    let text = '';
    cy.get('#textArea span')
      .each((span) => {
        text += span.text();
      })
      .then(() => {
        cy.get('#mainPageInput').type(text, {
          delay: 200,
        });
      })
      .url()
      .should('equal', 'http://localhost:3000/stats');
      cy.get('.stats').each((el, index) => {
        if (index === 1) {
          let rawWPM = Number(el.text().replace('Raw WPM: ', ''));
          expect(54 < rawWPM).to.be.true;
          expect(rawWPM < 60).to.be.true;
        }
      });
  });

  it('shows the author when typing a quote (but not showing when typing random words)', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.typing-container .author').should('not.exist');

    cy.get('.choiceBar button')
      .each((button, index) => {
        if (index === 1) {
          // console.log(button.text());
          button.click();
          cy.get('.typing-container .author').should('be.visible');
        }
      })
  });

  it('takes you to the "/register" page when click on LOGIN', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.logIn').click();

    cy.url().should('equal', 'http://localhost:3000/register');
  });

  it('reset button clears the text and changes the quote', () => {
    cy.visit('http://localhost:3000/');
    let originalText = '';
    let textToFill = '';
    let firstInputText;
    let refreshedInput;

    cy.get('#textArea span')
      .each((span) => {
        textToFill += span.text();
      })
      .then(() => {
        originalText = textToFill;
        textToFill = textToFill.slice(0, textToFill.length - 10);
        cy.get('#mainPageInput').type(textToFill, {
          delay: 0,
        });
      }).then(() => {
        cy.get('#mainPageInput').each((el) => {
          // console.log(el);
          // console.log(el[0].value);
          firstInputText = el[0].value;
        });
      });

    cy.get('.resetButton').click();

    let updatedText = '';
    textToFill = '';
    cy.get('#textArea span')
    .each((span) => {
      updatedText += span.text();
    }).then(() => {
      expect(originalText).to.not.equal(updatedText);
    });

    cy.get('#mainPageInput').each((el) => {
      refreshedInput = el[0].value;
    }).then(() => {
      expect(firstInputText).to.not.equal(refreshedInput);
    });
  });

});

