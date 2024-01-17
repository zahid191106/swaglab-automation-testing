export class LoginPage{

    username(){
        cy.get('#user-name').type('standard_user')
    }

    password(){
        cy.get('#password').type('secret_sauce')
    }
    
    invalidusername(){
        cy.get('#user-name').type('standard')
    }

    invalidpassword(){
        cy.get('#password').type('secret')
    }
    
    loginBtn(){
        cy.get('#login-button').click()
    }

}