/* eslint-disable no-undef */
describe('Registration', function () {
    it('Loads the page', function () {
        cy.visit('http://localhost:3000/register');
        cy.contains('Register').click();
        cy.url().should('equal', 'http://localhost:3000/register');
    });
    it('Checks that email is written correctly', function () {
        cy.get('#email').type('email').get('#buttonRegister').click();
        cy.on('window:alert', function (alert) {
            expect(alert).to.contains('your Email sucks ass btw');
        });
    });
    it('Register sends the correct request, loads the /profile page, gets the cookie', function () {
        cy.visit('http://localhost:3000/register');
        cy.get('#email').type('email@email.email')
            .get('#username').type('email')
            .get('#password').type('email')
            .get('#buttonRegister').click();
        cy.request('POST', 'http://localhost:3000/register', { email: 'email@email.email', username: 'email', password: 'email' }).then(function (response) {
            expect(response.body).to.have.property('email');
        });
        cy.url().should('equal', 'http://localhost:3000/profile');
        cy.getCookie('sid').should('exist');
        cy.get('#welcomeUsername').should('contain', 'email');
    });
    it('After pressing LOGOUT loads the main page and contains word LOGIN', function () {
        cy.get('.logIn').click();
        cy.url().should('equal', 'http://localhost:3000/');
        cy.contains('LOGIN');
    });
});
