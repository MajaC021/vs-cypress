export default class CreateBoard {
    get groupBtn() { return cy.get(".vs-c-list__btn").eq(1) }
    get addBoard() { return cy.get("span").contains('Add Board') }
    get selectOrg() { return cy.get('.el-select-dropdown').contains("test1") }
    get titleBoard() { return cy.get('input').eq(1) }
    get nextBtn() { return cy.get('button').contains('Next') }
    get radioBtn() { return cy.get('.vs-c-radio') }
    get finishBtn() { return cy.get('button').contains('Finish') }
 
    createNewBoard() {
        let titleBoard = Cypress.env("titleBoard")
        createBoard.groupBtn.click({ force: true })
        createBoard.addBoard.click()
        this.titleBoard.type(titleBoard);
        createBoard.selectOrg.click({ force: true })
        createBoard.nextBtn.click();
        createBoard.radioBtn.first().click();
        createBoard.nextBtn.click();
        createBoard.nextBtn.click();
        createBoard.nextBtn.click();
        createBoard.finishBtn.click();

    }
}

export const createBoard = new CreateBoard();