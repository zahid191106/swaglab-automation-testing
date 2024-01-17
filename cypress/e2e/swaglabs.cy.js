import Selecters from './sources/locaters';
import { LoginPage } from './sources/login_page';

let swagln;
describe('Swag labs', () =>{
    
    const loginPage = new LoginPage()

    // to run before each test case
    beforeEach(() =>{
        cy.visit('https://www.saucedemo.com/v1/index.html')
        cy.contains('Accepted usernames are:')
    })

    // get data from fixture folder
    before(() =>{
        cy.fixture('swaglogin').then((data =>{
            swagln = data;
        }))
    })
    
    // Test cases 
    it('Verify if login page is reaschable ', () =>{
        cy.visit('https://www.saucedemo.com/v1/index.html')
        cy.contains('Accepted usernames are:')
    })

    // using locater and get data from fixture
    it('Verify if user is able to login with valid credentials ', () =>{
        cy.get(Selecters.username).type(swagln.validname)
        cy.get(Selecters.password).type(swagln.validpassword)
        cy.get(Selecters.loginBtn).click()
        cy.contains('Products')
    })

    // get data from sources folder
    it('Verify if user is able to login with valid credentials ', () =>{
        loginPage.username()
        loginPage.password()
        loginPage.loginBtn()
        cy.contains('Products')
    })

    // get data from fixture
    it('Verify if ENTER button from keyboard should be work as a login btn ', () =>{
        cy.get('#user-name').type(swagln.validname)
        cy.get('#password').type(swagln.validpassword)
        cy.get('#password').type('{ENTER}')
        cy.url().should('include', '/inventory.html')
    })

    it.only('Verify if user is not able to login with invalid credentials ', () =>{
      loginPage.invalidusername()
      loginPage.invalidpassword()
      loginPage.loginBtn()
        cy.contains('Epic sadface: Username and password do not match any user in this service')
    })

    it('Verify if user is not able to login with invalid username and valid password ', () =>{
      loginPage.invalidusername()
      loginPage.password()
      loginPage.loginBtn()
        cy.contains('Epic sadface: Username and password do not match any user in this service')
    })
    it('Verify if user is not able to login with valid username and invalid password  ', () =>{
      loginPage.username()
      loginPage.invalidpassword()
      loginPage.loginBtn()
        cy.contains('Epic sadface: Username and password do not match any user in this service')
    })

    it('Verify if user is not able to login with empty login fields', () =>{
        cy.get('#user-name')
        cy.get('#password')
        cy.get('#login-button').click()
        cy.contains('Epic sadface: Username is required')
    })

    // using custom commands
    it('Verify if products should be visiable', () =>{
        cy.login('standard_user', 'secret_sauce')
        cy.get('#inventory_container').should('be.visible')
    })

    it('Verify if user is able to add product to the cart', () =>{
        cy.login('standard_user', 'secret_sauce')
        cy.get('#inventory_container > div > div:nth-child(1) > div.pricebar > button').click()
        cy.get('.btn_secondary').should('contain', 'REMOVE')
    })

    it('Verify if the product should be added to the cart', () =>{
        cy.login('standard_user', 'secret_sauce')
        cy.get(':nth-child(1) > .pricebar > .btn_primary').click()
        cy.get('.fa-layers-counter').click()
        cy.get('.item_pricebar > .btn_secondary').should('contain', 'REMOVE')
        cy.contains('Sauce Labs Backpack')
        cy.get('.cart_quantity').should('have.length', '1')
    })

    it('Verify if user is able to remove product from the cart', () =>{
        cy.login('standard_user', 'secret_sauce')
        cy.get(':nth-child(1) > .pricebar > .btn_primary').click()
        cy.get('.fa-layers-counter').click()
        cy.get('.item_pricebar > .btn_secondary').click()
        cy.get('.cart_quantity').should('have.length', '0')
    })

    it('Verify if user is able to continue shopping from cart menu by clicking continue shopping btn', () =>{
        cy.login('standard_user', 'secret_sauce')
        cy.get(':nth-child(1) > .pricebar > .btn_primary').click()
        cy.get('.fa-layers-counter').click()
        cy.get('.item_pricebar > .btn_secondary').click()
        cy.get('.cart_quantity').should('have.length', '0')
        cy.get('.btn_secondary').click()
        cy.url().should('include', '/inventory.html')
    })

    it('Verify if user is able to ordered thier products', () =>{
        cy.login('standard_user', 'secret_sauce')
        cy.get(':nth-child(1) > .pricebar > .btn_primary').click()
        cy.get('.fa-layers-counter').click()
        cy.get('.item_pricebar > .btn_secondary').click()
        cy.get('.cart_quantity').should('have.length', '0')
        cy.get('.btn_action').click()
        cy.url().should('include', '/checkout-step-one.html')
        cy.get('#first-name').type('zahid')
        cy.get('#last-name').type('khan')
        cy.get('#postal-code').type('25000')
        cy.get('.btn_primary').click()
        cy.get('.btn_action').click()
        cy.contains('THANK YOU FOR YOUR ORDER')

    })

    it('Verify the sidebar links ', () => {
        cy.login('standard_user', 'secret_sauce')
        cy.get('.bm-burger-button > button').click()
        cy.get('#logout_sidebar_link').click()
        cy.contains('Accepted usernames are:')
    })

    it('Verify if user is able to logout successfully', () => {
        cy.login('standard_user', 'secret_sauce')
        cy.get('.bm-burger-button > button').click()
        cy.get('#logout_sidebar_link').click()
        cy.contains('Accepted usernames are:')
    })


})