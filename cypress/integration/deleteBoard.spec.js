import { deleteBoard } from '../page_objects/deleteBoardPOM';
import { loginPage } from '../page_objects/loginPOM';
const testdata = require('../fixtures/testdata.json');

describe("create board test", () => {
  let boardId = testdata.id;

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

  it.only('delete Board', () => {
    cy.intercept({
      method: "DELETE",
      url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
    }).as('deleteBoardRequest')
    deleteBoard.deleteBoard();
    cy.wait('@deleteBoardRequest').then((interceptObj) => {
      expect(interceptObj.response.statusCode).eq(200)
      expect(interceptObj.response.body.id).should('not.exist');
    })
   })
})