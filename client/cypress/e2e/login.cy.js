/* eslint-disable no-undef */
describe('Registration', () => {

  it('Loads the page', () => {
    cy.visit('http://localhost:3000/login');
    cy.contains('Register').click();
    cy.contains('Login').click();
    cy.url().should('equal', 'http://localhost:3000/login');
  });

  it('Username or password is incorrect', () => {
    cy.visit('http://localhost:3000/register')
    cy.get('#usernameLogin').type('incorrect')
      .get('#passwordLogin').type('incorrect')
      .get('#buttonLogin').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.contains('Username or password is incorrect');
    });
  });

  it('Login sends the correct request, loads the /profile page, gets the cookie', () => {
    cy.visit('http://localhost:3000/register')

    cy.get('#usernameLogin').type('email')
      .get('#passwordLogin').type('email')
      .get('#buttonLogin').click()

    cy.request('POST', 'http://localhost:3000/register', { username: 'email', password: 'email' }).then(
      (response) => {
        expect(response.body).to.have.property('message')
      })
    cy.url().should('equal', 'http://localhost:3000/profile');
    cy.getCookie('sid').should('exist')
    cy.get('#welcomeUsername').should('contain', 'email')
  });

  it('After pressing LOGOUT loads the main page and contains word LOGIN', () => {
    cy.get('.logIn').click();
    cy.url().should('equal', 'http://localhost:3000/')
    cy.contains('LOGIN')
  });
});