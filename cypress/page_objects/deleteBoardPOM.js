export default class DeleteBoard{

    get clickBoard() { return cy.get("a").contains(Cypress.env("titleBoard")) } 
    get clickSettingBoard() { return cy.get(".vs-c-site-logo").eq(10)} 
    get deleteBtn() { return cy.get(".vs-c-btn--warning")} 
    get deleteConfirmBtn() { return cy.get(".el-button--success").eq(3)}  
    deleteBoard(){
        deleteBoard.clickBoard.click({force: true});
        cy.wait(2000)
        deleteBoard.clickSettingBoard.click();
        deleteBoard.deleteBtn.click();
        deleteBoard.deleteConfirmBtn.click()
    
    }
}

export const deleteBoard = new DeleteBoard();