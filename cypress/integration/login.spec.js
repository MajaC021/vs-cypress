import { loginPage } from '../page_objects/loginPOM';

describe("login test", () => {

  beforeEach("login user", () => {

    cy.visit("/login")
    cy.url().should('contain', '/login')
  });

  it('click on the login button', () => {
    cy.intercept({
      method: "POST",
      url: "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
    }).as('loginRequest')
    loginPage.loginUser();
    cy.wait('@loginRequest').then((interceptObj) => {
      expect(interceptObj.response.statusCode).eq(200)
      expect(interceptObj.response.body.user.email).eq(Cypress.env('testUserEmail'))
    })
    cy.get('.vs-l-sidebar').should('have.css', 'background-color', 'rgb(41, 41, 41)')
  });
})