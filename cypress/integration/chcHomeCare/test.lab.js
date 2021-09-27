const {
	forEach,
	head,
    split
} = require("lodash")

///<reference types = "Cypress" />

describe('log in and edit appointment one week only  ', function() {
	beforeEach("viewport", function() {
		cy.viewport(1280, 720)
		cy.visit(Cypress.env('baseUrl'))



		cy.get('#email').type(Cypress.env('username'))
		cy.get('#password').type(Cypress.env('password'),{log:false})
		cy.get('.btn').click()
		Cypress.on('uncaught:exception', (err, runnable) => {

			return false
		});
	})
    //done
    it('change open shift to aide - one week  - http://connected-testing.com:90/', function() {

        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        }).then(() => {
    
            const valid = () => {
                const numbers = [1]
    
                function addNumber(numbers) {
                    let arr1 = [];
                    for (let i = 1; i <= 50; i++) {
                        if (i == 1) {
                            i = 1
                        } else {
                            i = i + 2
                        }
    
                        arr1.push((i))
                    }
                    return arr1
    
                }
                cy.log(addNumber(numbers))
                const randomElement = addNumber(numbers)[Math.floor(Math.random() * addNumber(numbers).length)];
    
                function randomeEl(randomElement) {
    
                    if (randomElement == 0) {
                        randomElement = 1
                        return randomElement
                    }
                    return randomElement
                }
                cy.wait(2000)
                cy.get('input[role="textbox"]').first().click({force:true}).type('Open').then(()=>{
                    cy.wait(500)
                    cy.get('#select2-appt-staffs-results > :nth-child(1)').first().click({force:true})
              
                })
                cy.get('input[role="textbox"]').first().click({force:true}).type('Open').then(()=>{
                    cy.get('#select2-appt-staffs-results > :nth-child(2)').click({force:true})
              
                })
                cy.get('input[role="textbox"]').first().click({force:true}).type('Open').then(()=>{
                    cy.get('#select2-appt-staffs-results > :nth-child(3)').click({force:true})
              
                })
                cy.get('input[role="textbox"]').first().click({force:true}).type('Open').then(()=>{
                    cy.get('#select2-appt-staffs-results > :nth-child(4)').click({force:true})
              
                })
                cy.get('input[role="textbox"]').first().click({force:true}).type('Open').then(()=>{
                    cy.get('#select2-appt-staffs-results > :nth-child(5)').click({force:true})
              
                })
                cy.get('input[role="textbox"]').first().click({force:true}).type('Open').then(()=>{
                    cy.get('#select2-appt-staffs-results > :nth-child(6)').click({force:true})
              
                })
                cy.get('input[value="Go"]').first().click({force:true})
               
             
               
                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                    cy.log(aidcurrentname)
                    var newwcurrentname = aidcurrentname.split(' ')
                    cy.log(newwcurrentname[0])
                   
                        cy.wait(2000)
    
                        cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide) => {
                            const currentHref = currentAide.attr('href')
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            }).then(() => {
                              
                                cy.wait(4000)
                                cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {
                                    cy.wait(3000)
                                    if ($recomanded.children().length > 0) {
                                        cy.reload()
                                        cy.wait(2000)
                                        cy.get('input[role="textbox"]').first().click({force:true}).type('Open').then(()=>{
                                            cy.wait(500)
                                            cy.get('#select2-appt-staffs-results > :nth-child(1)').first().click({force:true})
                                      
                                        })
                                        cy.get('input[role="textbox"]').first().click({force:true}).type('Open').then(()=>{
                                            cy.get('#select2-appt-staffs-results > :nth-child(2)').click({force:true})
                                      
                                        })
                                        cy.get('input[role="textbox"]').first().click({force:true}).type('Open').then(()=>{
                                            cy.get('#select2-appt-staffs-results > :nth-child(3)').click({force:true})
                                      
                                        })
                                        cy.get('input[role="textbox"]').first().click({force:true}).type('Open').then(()=>{
                                            cy.get('#select2-appt-staffs-results > :nth-child(4)').click({force:true})
                                      
                                        })
                                        cy.get('input[role="textbox"]').first().click({force:true}).type('Open').then(()=>{
                                            cy.get('#select2-appt-staffs-results > :nth-child(5)').click({force:true})
                                      
                                        })
                                        cy.get('input[role="textbox"]').first().click({force:true}).type('Open').then(()=>{
                                            cy.get('#select2-appt-staffs-results > :nth-child(6)').click({force:true})
                                      
                                        })
                                        cy.get('input[value="Go"]').first().click({force:true})
                                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .btn').invoke('text').then((text) => {
                                            var fullText = text;
                                            var pattern = /[0-9]+/g;
                                            var appointmentNumber = fullText.match(pattern).toString();
                                            cy.log(appointmentNumber)
    
                                            var randomAid = Math.floor(Math.random() * 11);
    
                                            function randomeaid(randomAid) {
    
                                                if (randomAid == 0) {
                                                    randomAid = 1
                                                    return randomAid
                                                }
                                                return randomAid
                                            }
                                            cy.wait(2000)
                                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click()
                                            cy.wait(4000)
                                            cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                var aidId = $aid.attr("href");
                                                var aidName = $aid.text()
    
                                                cy.log(aidName)
                                                cy.get('#select2-sid-container').click()
                                                cy.wait(2000)
                                                cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(aidName)
                                                cy.wait(3000)
                                                cy.get('.select2-results__option--highlighted').click({
                                                    force: true
                                                })
                                                cy.get('#save-visit').click({
                                                    force: true
                                                })
                                                cy.get('#select-aides-from-circle').click({
                                                    force: true
                                                })
    
    
                                           
                                                cy.get('.toast-message').each(($toast) => {
    
    
                                                    const toastText =$toast.text()
                                                    const toastFirst = toastText.split(' ')
                                                    cy.log(toastFirst)
                                                    if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
                                                        cy.get(':nth-child(4) > #cancel-conflicts').click({
                                                            force: true
                                                        })
                                                        cy.reload()
                                                        cy.get('input[value="Reset"]').first().click({force:true})
                                                        cy.get('#appt-search').type(appointmentNumber, {
                                                            force: true
                                                        })
                                                        cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })
                                                        cy.wait(5000)
                                                        cy.get('tbody > :nth-child(1) > :nth-child(6) > a').then(($el) => {
                                                            const href = $el.attr('href')
                                                            cy.get('tbody > :nth-child(1) > :nth-child(6) > a').should('have.attr','href').and('contain', currentHref)
                                                            cy.end()
                                                        })
                                                    }else if(toastFirst[0] == "Invalid"){
                                                        cy.get(':nth-child(4) > #cancel-conflicts').click({
                                                            force: true
                                                        })
                                                        cy.reload()
                                                        cy.get('input[value="Reset"]').first().click({force:true})
    
                                                        cy.get('#appt-search').type(appointmentNumber, {
                                                            force: true
                                                        })
                                                        cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })
                                                        cy.wait(5000)
                                                        cy.get('tbody > :nth-child(1) > :nth-child(6) > a').then(($el) => {
                                                            const href = $el.attr('href')
                                                            cy.get('tbody > :nth-child(1) > :nth-child(6) > a').should('have.attr','href').and('contain', currentHref)
                                                            cy.end()
                                                        })  
    
                                                    } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                        cy.get(':nth-child(4) > #cancel-conflicts').click({
                                                            force: true
                                                        })
                                                        cy.reload()
    
                                                        cy.get('input[value="Reset"]').first().click({force:true})
                                                        cy.get('#appt-search').type(appointmentNumber, {
                                                            force: true
                                                        })
                                                        cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })
                                                        cy.wait(5000)
                                                        cy.get('tbody > :nth-child(1) > :nth-child(6) > a').then(($el) => {
                                                            const href = $el.attr('href')
                                                            cy.get('tbody > :nth-child(1) > :nth-child(6) > a').should('have.attr','href').and('contain', currentHref)
                                                            cy.end()
                                                        })
                                                    } else if(toastFirst[0] == "Successfully") {
                                                        cy.get(':nth-child(4) > #cancel-conflicts').click({
                                                            force: true
                                                        })
                                                        cy.reload()
    
                                                        cy.get('input[value="Reset"]').first().click({force:true})
                                                        cy.get('#appt-search').type(appointmentNumber, {
                                                            force: true
                                                        })
                                                        cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })
                                                        cy.wait(5000)
                                                        cy.get('tbody > :nth-child(1) > :nth-child(6) > a').then(($el) => {
                                                            const href = $el.attr('href')
                                                            cy.get('tbody > :nth-child(1) > :nth-child(6) > a').should('have.attr', 'href').and('contain',aidId)
                                                            cy.end()
                                                        })
    
                                                    }
                                                })
    
    
    
    
                                            })
    
    
    
                                        })
    
                                    } else {
                                        cy.wait(100)
                                        cy.reload()
                                        valid()
                                    }
    
    
    
    
                                })
                            })
    
    
                        })
                     
    
                   
    
                })
    
    
    
            }
    
            valid()
            cy.end()
    
    
        })
    
    
    
    
    })


})