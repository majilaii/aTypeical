/* eslint-disable no-undef */
describe('Registration', () => {
  it('Loads the page', () => {
    cy.visit('http://localhost:3000/register');
    cy.contains('Register').click();
    cy.contains('Login').click();
    cy.url().should('equal', 'http://localhost:3000/register');
  });
  it('Checks that email is written correctly', () => {
    cy.get('#email').type('email').get('#buttonRegister').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.contains('your Email sucks ass btw');
    });
  });
  it('Register sends the correct request', () => {
    cy.visit('http://localhost:3000/register')

    cy.get('#email').type('email@email.email')
      .get('#username').type('email')
      .get('#password').type('email')
      .get('#buttonRegister').click()
    
    cy.request('POST', 'http://localhost:3000/register', { email: 'email@email.email', username: 'email', password: 'email' }).then(
      (response) => {
        expect(response.body).to.have.property('message')
      })
  });
  // it('Login sends the correct request', () => {
  //   cy.visit('http://localhost:3000/register')

  //   cy.get('#usernameLogin').type('email')
  //     .get('#passwordLogin').type('email')
  //     .get('#buttonLogin').click()
    
  //   cy.request('POST', 'http://localhost:3000/register', { username: 'email', password: 'email' }).then(
  //     (response) => {
  //       expect(response.body).to.have.property('message')
  //     })
    
  // });
  // it('Username or password is incorrect', () => {
    
  // });
  // it('Register and login send to the same page', () => {
    
  // });
})
