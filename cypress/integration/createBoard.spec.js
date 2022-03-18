import { createBoard } from '../page_objects/createBoardPOM';
import { loginPage } from '../page_objects/loginPOM';

describe("create board test", () => {

  var boardId;

  beforeEach("login user", () => {
    cy.visit("/login")
    cy.intercept({
      method: "POST",
      url: "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
    }).as('loginRequest')
    loginPage.loginUser();
    cy.wait('@loginRequest').then((interceptObj) => {
      expect(interceptObj.response.statusCode).eq(200)
    });
    cy.get('.vs-l-sidebar').should('have.css', 'background-color', 'rgb(41, 41, 41)')
  });

  it.only('create Board', () => {
    cy.intercept({
      method: "POST",
      url: "https://cypress-api.vivifyscrum-stage.com/api/v2/boards",
    }).as('createBoardRequest')
    createBoard.createNewBoard()
    cy.wait('@createBoardRequest').then((interceptObj) => {
      expect(interceptObj.response.statusCode).eq(201)
      expect(interceptObj.response.body.name).eq(Cypress.env('titleBoard'))

      cy.writeFile('cypress/fixtures/testdata.json', {
        "id": interceptObj.response.body.id
    });
    })
    cy.get('span').should('contain', 'test1') 
    cy.get('.vs-c-list__btn').should('contain', Cypress.env('titleBoard'))

  })
})