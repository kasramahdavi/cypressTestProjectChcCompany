const {
    forEach,
    head
} = require("lodash")

///<reference types = "Cypress" />

describe('log in and edit appointment one week only -  http://connected-testing.com:90/  ', function() {
    beforeEach("viewport", function() {
        cy.viewport(1280, 720)
        cy.visit(Cypress.env('baseUrl'))



        cy.get('#email').type(Cypress.env('username'))
        cy.get('#password').type(Cypress.env('password'), { log: false })
        cy.get('.btn').click()
        Cypress.on('uncaught:exception', (err, runnable) => {

            return false
        });
    })
  

    //done
    it('change  aide to open  shift   - one week  - http://connected-testing.com:90/', function() {

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
                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                    cy.log(aidcurrentname)
                    var newwcurrentname = aidcurrentname.split(' ')
                    cy.log(newwcurrentname[0])
                    if (newwcurrentname[0] != "Open") {
                        cy.wait(2000)
                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                            force: true
                        }).then(() => {
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                         
                            cy.wait(7000)
                            cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {
                                cy.wait(3000)
                                if ($recomanded.children().length > 0) {
                                    cy.get('#select2-sid-container').click()
                                    // cy.get('#sid').click({force:true})
                                    cy.wait(1000)
                                    cy.get('.select2-dropdown > .select2-search > .select2-search__field').type('Open')
                                    cy.wait(5000)
                                    cy.get('#select2-sid-results > :nth-child(1)').wait(4000).invoke('text').then((open) => {

                                        let splitedOpen = open.split(' ')
                                        cy.log(splitedOpen)

                                        if (splitedOpen[0] != 'Open') {
                                            cy.wait(100)
                                            cy.reload()
                                            valid()
                                        } else {
                                            cy.reload()
                                            cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide)=>{
                                               const currentHref = currentAide.attr('href')
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
                                                   
                                                    cy.get('.select2-dropdown > .select2-search > .select2-search__field').type('open')
                                                    cy.wait(5000)
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



                                                            cy.get('#appt-search').type(appointmentNumber, {
                                                                force: true
                                                            })
                                                            cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                                force: true
                                                            })
                                                            cy.wait(5000)
                                                            cy.get('tbody > :nth-child(1) > :nth-child(6) > a').then(($el) => {
                                                                const href = $el.attr('href')
                                                                cy.get('tbody > :nth-child(1) > :nth-child(6) > a').should('contain', 'Open')
                                                                cy.end()
                                                            })

                                                        }
                                                    })




                                                })



                                            })
                                            })
                                        
                                        }
                                    })




                                } else {
                                    cy.wait(100)
                                    cy.reload()
                                    valid()
                                }




                            })
                        })

                    } else {

                        cy.wait(100)
                        cy.reload()
                        valid()

                    }

                })



            }

            valid()
            cy.end()


        })




    })
 
  //not done
  it.skip('change open shift to aide - one week  - http://connected-testing.com:90/', function() {

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
   //not done
it('change aide to aide by input - one week  - http://connected-testing.com:90/', function() {

    cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
    cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
        force: true
    }).then(() => {
        cy.wait(2000)
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
            cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                cy.log(aidcurrentname)
                var newwcurrentname = aidcurrentname.split(' ')
                cy.log(newwcurrentname[0])
                if (newwcurrentname[0] != "Open") {

                    cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide) => {
                        const currentHref = currentAide.attr('href')
                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                            force: true
                        }).then(() => {
                            cy.wait(2000)
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                            cy.wait(8000)
                            cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {
                                cy.wait(3000)
                                if ($recomanded.children().length > 0) {
                                    cy.reload()
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
                                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                            force: true
                                        })
                                        cy.wait(4000)
                                        cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                            var aidId = $aid.attr("href");
                                            var aidName = $aid.text()

                                            cy.log(aidName)
                                            cy.get('#select2-sid-container').click()
                                            cy.wait(3000)
                                            cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(aidName)
                                            cy.wait(10000)
                                            cy.get('.select2-results__option--highlighted').click({
                                                force: true
                                            })
                                            cy.get('#save-visit').click({
                                                force: true
                                            })
                                            cy.get('#proceed-anyway-conflicts').click({
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



                                                    cy.get('#appt-search').type(appointmentNumber, {
                                                        force: true
                                                    })
                                                    cy.get('input[value="Go"]').first().click({force:true})
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



                                                    cy.get('#appt-search').type(appointmentNumber, {
                                                        force: true
                                                    })
                                                    cy.get('input[value="Go"]').first().click({force:true})
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



                                                    cy.get('#appt-search').type(appointmentNumber, {
                                                        force: true
                                                    })
                                                    cy.get('input[value="Go"]').first().click({force:true})
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



                                                    cy.get('#appt-search').type(appointmentNumber, {
                                                        force: true
                                                    })
                                                    cy.get('input[value="Go"]').first().click({force:true})
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
                 

                } else {
                    cy.wait(2000)
                    cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide) => {
                        const currentHref = currentAide.attr('href')   
                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                            force: true
                        }).then(() => {
                            cy.wait(2000)
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                            cy.wait(7000)
                            if (cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)')) {
                                cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {
                                    cy.wait(3000)
                                    if ($recomanded.children().length > 0) {
                                        cy.reload()
                                        cy.wait(2000)
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
                                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click()
                                            cy.wait(4000)
                                            cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                var aidId = $aid.attr("href");
                                                var aidName = $aid.text()

                                                cy.log(aidName)
                                                cy.get('#select2-sid-container').click()
                                                cy.wait(4000)
                                                cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(aidName)
                                                cy.wait(10000)
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
                            } else {
                                cy.wait(100)
                                cy.reload()
                                valid()
                            }

                        })
                    })
                 
                }

            })



        }

        valid()
        cy.end()


    })




})
  //done
  it('change aide to aide  - one week  - http://connected-testing.com:90/', function() {

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
            cy.wait(7000)
            cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                cy.log(aidcurrentname)
                var newwcurrentname = aidcurrentname.split(' ')
                cy.log(newwcurrentname[0])
                if (newwcurrentname[0] != "Open") {
                    cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide) => {
                        const currentHref = currentAide.attr('href')
                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                            force: true
                        }).then(() => {
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                            cy.wait(8000)
                            if (cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)')) {
                                cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {

                                    if ($recomanded.children().length > 0) {
                                        cy.reload()
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
                                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click()
                                            cy.wait(5000)
                                            cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                var aidId = $aid.attr("href");

                                                cy.log(aidId)
                                                cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > .radio > :nth-child(1) > :nth-child(2)').click({
                                                    force: true
                                                })
                                                cy.get('#save-visit').click({
                                                    force: true
                                                })
                                                cy.get('#proceed-anyway-conflicts').click({
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
                                        return
                                    } else {
                                        cy.wait(100)
                                        cy.reload()
                                        valid()
                                    }




                                })
                            } else {
                                cy.wait(100)
                                cy.reload()
                                valid()
                            }

                        })
                    
                    })
                   
                } else {
                    cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide) => {
                        const currentHref = currentAide.attr('href')
                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                            force: true
                        }).then(() => {
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                            cy.wait(8000)
                            if (cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)')) {
                                cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {

                                    if ($recomanded.children().length > 0) {
                                        cy.reload()
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
                                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click()
                                            cy.wait(5000)
                                            cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                var aidId = $aid.attr("href");

                                                cy.log(aidId)
                                                cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > .radio > :nth-child(1) > :nth-child(2)').click({
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
                                        return
                                    } else {
                                        cy.wait(100)
                                        cy.reload()
                                        valid()
                                    }




                                })
                            } else {
                                cy.wait(100)
                                cy.reload()
                                valid()
                            }

                        })
                    
                    })
                   
                }
            })



        }
        valid()


    })




})
  
    	//done
	it('change duration - one week  - http://connected-testing.com:90/', function() {

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
				cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
					cy.log(aidcurrentname)
					var newwcurrentname = aidcurrentname.split(' ')
					cy.log(newwcurrentname[0])
					if (newwcurrentname[0] != "Open") {

						cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide) => {
							cy.wait(2000)
							cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
								force: true
							}).then(() => {
								cy.wait(7000)




								cy.reload()
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

									cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
										force: true
									})
									cy.wait(5000)
								
										cy.get('#visit_duration').then((currentDuration) => {
											const time = currentDuration.attr('value')
											var randomDuration = Math.floor(Math.random() * 7);
											cy.log(time)

											function randome(randomDuration) {

												if (randomDuration == 0) {
													randomDuration = 1
													return randomDuration
												}
												return randomDuration
											}


											cy.get('#visit_duration').clear().type(randome(randomDuration) + .00)


											cy.get('#save-visit').click({
												force: true
											})
											cy.get('#proceed-anyway-conflicts').click({
												force: true
											})

											cy.get('.toast-message').each(($toast) => {


												const toastText = $toast.text()
												const toastFirst = toastText.split(' ')
												cy.log(toastFirst)
												if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
													cy.get(':nth-child(4) > #cancel-conflicts').click({
														force: true
													})
													cy.reload()



													cy.get('#appt-search').type(appointmentNumber, {
														force: true
													})
													cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
														force: true
													})
													cy.wait(5000)
													cy.get('tbody > :nth-child(1) > :nth-child(9)').should('contain', time)
												} else if (toastFirst[0] == "Invalid") {
												           cy.get(':nth-child(4) > #cancel-conflicts').click({
														force: true
													})
													cy.reload()



													cy.get('#appt-search').type(appointmentNumber, {
														force: true
													})
													cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
														force: true
													})
													cy.wait(5000)
													cy.get('tbody > :nth-child(1) > :nth-child(9)').should('contain', time)

												} else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                    cy.get(':nth-child(4) > #cancel-conflicts').click({
														force: true
													})
													cy.reload()



													cy.get('#appt-search').type(appointmentNumber, {
														force: true
													})
													cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
														force: true
													})
													cy.wait(5000)
													cy.get('tbody > :nth-child(1) > :nth-child(9)').should('contain', time)
												
												
												} else if (toastFirst[0] == "Successfully") {
													cy.get(':nth-child(4) > #cancel-conflicts').click({
														force: true
													})
													cy.reload()



													cy.get('#appt-search').type(appointmentNumber, {
														force: true
													})
													cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
														force: true
													})
													cy.wait(5000)
													cy.get('tbody > :nth-child(1) > :nth-child(9)').contains(randome(randomDuration) + .00)

												}
											})
										})





									



								})
								









							})
						})


					} else{

						cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide) => {
							cy.wait(2000)
							cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
								force: true
							}).then(() => {
								cy.wait(7000)




								cy.reload()
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

									cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
										force: true
									})
									cy.wait(5000)
								
										cy.get('#visit_duration').then((currentDuration) => {
											const time = currentDuration.attr('value')
											var randomDuration = Math.floor(Math.random() * 7);
											cy.log(time)

											function randome(randomDuration) {

												if (randomDuration == 0) {
													randomDuration = 1
													return randomDuration
												}
												return randomDuration
											}


											cy.get('#visit_duration').clear().type(randome(randomDuration) + .00)


											cy.get('#save-visit').click({
												force: true
											})
                                            cy.get('#select-aides-from-circle').click({
                                                force: true
                                            })

											cy.get('.toast-message').each(($toast) => {


												const toastText = $toast.text()
												const toastFirst = toastText.split(' ')
												cy.log(toastFirst)
												if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
													cy.get(':nth-child(4) > #cancel-conflicts').click({
														force: true
													})
													cy.reload()



													cy.get('#appt-search').type(appointmentNumber, {
														force: true
													})
													cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
														force: true
													})
													cy.wait(5000)
													cy.get('tbody > :nth-child(1) > :nth-child(9)').should('contain', time)
												} else if (toastFirst[0] == "Invalid") {
													cy.get(':nth-child(4) > #cancel-conflicts').click({
														force: true
													})
													cy.reload()



													cy.get('#appt-search').type(appointmentNumber, {
														force: true
													})
													cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
														force: true
													})
													cy.wait(5000)
													cy.get('tbody > :nth-child(1) > :nth-child(9)').should('contain', time)

												} else if ($toast.text() == "The Aide does not have an active wage for this service.") {
													cy.get(':nth-child(4) > #cancel-conflicts').click({
														force: true
													})
													cy.reload()



													cy.get('#appt-search').type(appointmentNumber, {
														force: true
													})
													cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
														force: true
													})
													cy.wait(5000)
													cy.get('tbody > :nth-child(1) > :nth-child(9)').should('contain', time)
												} else if (toastFirst[0] == "Successfully") {
													cy.get(':nth-child(4) > #cancel-conflicts').click({
														force: true
													})
													cy.reload()



													cy.get('#appt-search').type(appointmentNumber, {
														force: true
													})
													cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
														force: true
													})
													cy.wait(5000)
													cy.get('tbody > :nth-child(1) > :nth-child(9)').contains(randome(randomDuration) + .00)

												}
											})
										})





									



								})
								









							})
						})


					}
				})



			}
			valid()


		})




	})
   //done
   it('change date - one week  - http://connected-testing.com:90/', function() {

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
				cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
					cy.log(aidcurrentname)
					var newwcurrentname = aidcurrentname.split(' ')
					cy.log(newwcurrentname[0])
					if (newwcurrentname[0] != "Open") {

						cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide) => {
							cy.wait(2000)
							cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
								force: true
							}).then(() => {
								cy.wait(2000)




								cy.reload()
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

									cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
										force: true
									})
									cy.wait(2000)
								
									
                                    cy.get('.calendar_select > .form-group > :nth-child(2)>:nth-child(1)').then(($date) => {
                                        var currentDate = $date.attr("value");
                                        cy.get('.calendar_select > .form-group>:nth-child(2)').click()
                                        cy.wait(3000)
                                        var activeDays = [];
                                        cy.get('.day',{force:true}).not('.old, .disabled',{force:true}).each(function($item, $activeDays) {
                                            const title = $item.attr('data-day')
                                            activeDays.push(title.toString());
                                        }).then(($item) => {


                                            var randomday = activeDays[Math.floor(Math.random() * activeDays.length)];
                                            if (randomday < 10) {
                                                var randomday = '0' + randomday
                                            }
                                            cy.get('[data-day="' + randomday + '"]').click()
                                            cy.get('#save-visit').click({
												force: true
											})
											cy.get('#proceed-anyway-conflicts').click({
												force: true
											})

											cy.get('.toast-message').each(($toast) => {


												const toastText = $toast.text()
												const toastFirst = toastText.split(' ')
												cy.log(toastFirst)
												if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
												    cy.reload()
                                                    cy.get('#appt-search').clear().type(appointmentNumber, {
                                                        force: true
                                                    })
                                                    cy.get('#appt-filter-date').then(($dates) => {
                                                        var datestext = $dates.attr('value')
                                                        var dateArray = datestext.split(' - ')
                                                        cy.log(dateArray)
                                                        const first = dateArray[0]
                                                        const last = dateArray[1]


                                                        function startDate(first) {
                                                            var start1 = first.split("/");
                                                            cy.log(start1)
                                                            var startmounth1 = parseInt(start1[0]) - 1
                                                            if (startmounth1 < 10) {
                                                                var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                var startdateString1 = startdate1.toString()

                                                            } else if (startmounth1 <= 0) {
                                                                var year = start1[2] - 1
                                                                var startdate1 = '01/' + start1[1] + '/' + year
                                                                var startdateString1 = startdate1.toString()
                                                            } else {
                                                                var startdate1 = startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                var startdateString1 = startdate1.toString()
                                                            }

                                                            return startdateString1

                                                        }
                                                        cy.log(startDate(first))

                                                        function endDate(last) {
                                                            var end = last.split("/");
                                                            var endMounth = parseInt(end[0]) + 1
                                                            if (endMounth < 10) {
                                                                var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            } else {
                                                                var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            }

                                                            return enddateString

                                                        }
                                                        var splitedDate = currentDate.split("-");
                                                        cy.log(endDate(last))
                                                        cy.get('#appt-filter-date').clear().type(startDate(first)+' - '+ last,  {
                                                            force: true
                                                        })
                                                        cy.contains('Apply').click({force:true})
                                                        cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })




                                                        cy.get('tbody > :nth-child(1) > :nth-child(8)').should('contain', splitedDate[1] + '/' + splitedDate[2])

                                                    })

												} else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                    cy.reload()
                                                    cy.get('#appt-search').clear().type(appointmentNumber, {
                                                        force: true
                                                    })
                                                    cy.get('#appt-filter-date').then(($dates) => {
                                                        var datestext = $dates.attr('value')
                                                        var dateArray = datestext.split(' - ')
                                                        cy.log(dateArray)
                                                        const first = dateArray[0]
                                                        const last = dateArray[1]


                                                        function startDate(first) {
                                                            var start1 = first.split("/");
                                                            cy.log(start1)
                                                            var startmounth1 = parseInt(start1[0]) - 1
                                                            if (startmounth1 < 10) {
                                                                var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                var startdateString1 = startdate1.toString()

                                                            } else if (startmounth1 <= 0) {
                                                                var year = start1[2] - 1
                                                                var startdate1 = '01/' + start1[1] + '/' + year
                                                                var startdateString1 = startdate1.toString()
                                                            } else {
                                                                var startdate1 = startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                var startdateString1 = startdate1.toString()
                                                            }

                                                            return startdateString1

                                                        }
                                                        cy.log(startDate(first))

                                                        function endDate(last) {
                                                            var end = last.split("/");
                                                            var endMounth = parseInt(end[0]) + 1
                                                            if (endMounth < 10) {
                                                                var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            } else {
                                                                var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            }

                                                            return enddateString

                                                        }
                                                        var splitedDate = currentDate.split("-");
                                                        cy.log(endDate(last))
                                                        cy.get('#appt-filter-date').clear().type(startDate(first)+' - '+ last,  {
                                                            force: true
                                                        })
                                                        cy.contains('Apply').click({force:true})
                                                        cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })




                                                        cy.get('tbody > :nth-child(1) > :nth-child(8)').should('contain', splitedDate[1] + '/' + splitedDate[2])

                                                    })
												
												
												} else if (toastFirst[0] == "Successfully") {
                                                    cy.reload()
                                                    cy.get('#appt-search').clear().type(appointmentNumber, {
                                                        force: true
                                                    })
                                                    cy.get('#appt-filter-date').then(($dates) => {
                                                        var datestext = $dates.attr('value')
                                                        var dateArray = datestext.split(' - ')
                                                        cy.log(dateArray)
                                                        const first = dateArray[0]
                                                        const last = dateArray[1]


                                                        function startDate(first) {
                                                            var start1 = first.split("/");
                                                            cy.log(start1)
                                                            var startmounth1 = parseInt(start1[0]) - 1
                                                            if (startmounth1 < 10) {
                                                                var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                var startdateString1 = startdate1.toString()

                                                            } else if (startmounth1 <= 0) {
                                                                var year = start1[2] - 1
                                                                var startdate1 = '01/' + start1[1] + '/' + year
                                                                var startdateString1 = startdate1.toString()
                                                            } else {
                                                                var startdate1 = startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                var startdateString1 = startdate1.toString()
                                                            }

                                                            return startdateString1

                                                        }
                                                        cy.log(startDate(first))

                                                        function endDate(last) {
                                                            var end = last.split("/");
                                                            var endMounth = parseInt(end[0]) + 1
                                                            if (endMounth < 10) {
                                                                var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            } else {
                                                                var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            }

                                                            return enddateString

                                                        }
                                                        var splitedDate = currentDate.split("-");
                                                        cy.log(endDate(last))
                                                        cy.get('#appt-filter-date').clear().type( randomday+ '-' + randomday, {
                                                            force: true
                                                        })
                                                        cy.contains('Apply').click({force:true})
                                                        cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })


                                                        const  dayArraye  = randomday.split('/')
                        
                                                        cy.get('tbody > :nth-child(1) > :nth-child(8)').should('contain', dayArraye[0]+'/'+dayArraye[1])


                                                    })

												}
											})
									

                                        })
                                })








										





									



								})
								









							})
						})


					} else{

						cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide) => {
							cy.wait(2000)
							cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
								force: true
							}).then(() => {
								cy.wait(2000)




								cy.reload()
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

									cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
										force: true
									})
									cy.wait(2000)
								
									
                                    cy.get('.calendar_select > .form-group > :nth-child(2)>:nth-child(1)').then(($date) => {
                                        var currentDate = $date.attr("value");
                                        cy.get('.calendar_select > .form-group>:nth-child(2)').click()
                                        cy.wait(3000)
                                        var activeDays = [];
                                        cy.get('.day',{force:true}).not('.old, .disabled',{force:true}).each(function($item, $activeDays) {
                                            const title = $item.attr('data-day')
                                            activeDays.push(title.toString());
                                        }).then(($item) => {


                                            var randomday = activeDays[Math.floor(Math.random() * activeDays.length)];
                                            if (randomday < 10) {
                                                var randomday = '0' + randomday
                                            }
                                            cy.get('[data-day="' + randomday + '"]').click()
                                            cy.get('#save-visit').click({
												force: true
											})
                                            cy.get('#select-aides-from-circle').click({
                                                force: true
                                            })

											cy.get('.toast-message').each(($toast) => {


												const toastText = $toast.text()
												const toastFirst = toastText.split(' ')
												cy.log(toastFirst)
												if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
												    cy.reload()
                                                    cy.get('#appt-search').clear().type(appointmentNumber, {
                                                        force: true
                                                    })
                                                    cy.get('#appt-filter-date').then(($dates) => {
                                                        var datestext = $dates.attr('value')
                                                        var dateArray = datestext.split(' - ')
                                                        cy.log(dateArray)
                                                        const first = dateArray[0]
                                                        const last = dateArray[1]


                                                        function startDate(first) {
                                                            var start1 = first.split("/");
                                                            cy.log(start1)
                                                            var startmounth1 = parseInt(start1[0]) - 1
                                                            if (startmounth1 < 10) {
                                                                var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                var startdateString1 = startdate1.toString()

                                                            } else if (startmounth1 <= 0) {
                                                                var year = start1[2] - 1
                                                                var startdate1 = '01/' + start1[1] + '/' + year
                                                                var startdateString1 = startdate1.toString()
                                                            } else {
                                                                var startdate1 = startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                var startdateString1 = startdate1.toString()
                                                            }

                                                            return startdateString1

                                                        }
                                                        cy.log(startDate(first))

                                                        function endDate(last) {
                                                            var end = last.split("/");
                                                            var endMounth = parseInt(end[0]) + 1
                                                            if (endMounth < 10) {
                                                                var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            } else {
                                                                var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            }

                                                            return enddateString

                                                        }
                                                        var splitedDate = currentDate.split("-");
                                                        cy.log(endDate(last))
                                                        cy.get('#appt-filter-date').clear().type(startDate(first)+' - '+ last,  {
                                                            force: true
                                                        })
                                                        cy.contains('Apply').click({force:true})
                                                        cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })




                                                        cy.get('tbody > :nth-child(1) > :nth-child(8)').should('contain', splitedDate[1] + '/' + splitedDate[2])

                                                    })

												} else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                    cy.reload()
                                                    cy.get('#appt-search').clear().type(appointmentNumber, {
                                                        force: true
                                                    })
                                                    cy.get('#appt-filter-date').then(($dates) => {
                                                        var datestext = $dates.attr('value')
                                                        var dateArray = datestext.split(' - ')
                                                        cy.log(dateArray)
                                                        const first = dateArray[0]
                                                        const last = dateArray[1]


                                                        function startDate(first) {
                                                            var start1 = first.split("/");
                                                            cy.log(start1)
                                                            var startmounth1 = parseInt(start1[0]) - 1
                                                            if (startmounth1 < 10) {
                                                                var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                var startdateString1 = startdate1.toString()

                                                            } else if (startmounth1 <= 0) {
                                                                var year = start1[2] - 1
                                                                var startdate1 = '01/' + start1[1] + '/' + year
                                                                var startdateString1 = startdate1.toString()
                                                            } else {
                                                                var startdate1 = startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                var startdateString1 = startdate1.toString()
                                                            }

                                                            return startdateString1

                                                        }
                                                        cy.log(startDate(first))

                                                        function endDate(last) {
                                                            var end = last.split("/");
                                                            var endMounth = parseInt(end[0]) + 1
                                                            if (endMounth < 10) {
                                                                var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            } else {
                                                                var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            }

                                                            return enddateString

                                                        }
                                                        var splitedDate = currentDate.split("-");
                                                        cy.log(endDate(last))
                                                        cy.get('#appt-filter-date').clear().type(startDate(first)+' - '+ last,  {
                                                            force: true
                                                        })
                                                        cy.contains('Apply').click({force:true})
                                                        cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })




                                                        cy.get('tbody > :nth-child(1) > :nth-child(8)').should('contain', splitedDate[1] + '/' + splitedDate[2])

                                                    })
												
												
												} else if (toastFirst[0] == "Successfully") {
                                                    cy.reload()
                                                    cy.get('#appt-search').clear().type(appointmentNumber, {
                                                        force: true
                                                    })
                                                    cy.get('#appt-filter-date').then(($dates) => {
                                                        var datestext = $dates.attr('value')
                                                        var dateArray = datestext.split(' - ')
                                                        cy.log(dateArray)
                                                        const first = dateArray[0]
                                                        const last = dateArray[1]


                                                        function startDate(first) {
                                                            var start1 = first.split("/");
                                                            cy.log(start1)
                                                            var startmounth1 = parseInt(start1[0]) - 1
                                                            if (startmounth1 < 10) {
                                                                var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                var startdateString1 = startdate1.toString()

                                                            } else if (startmounth1 <= 0) {
                                                                var year = start1[2] - 1
                                                                var startdate1 = '01/' + start1[1] + '/' + year
                                                                var startdateString1 = startdate1.toString()
                                                            } else {
                                                                var startdate1 = startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                var startdateString1 = startdate1.toString()
                                                            }

                                                            return startdateString1

                                                        }
                                                        cy.log(startDate(first))

                                                        function endDate(last) {
                                                            var end = last.split("/");
                                                            var endMounth = parseInt(end[0]) + 1
                                                            if (endMounth < 10) {
                                                                var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            } else {
                                                                var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            }

                                                            return enddateString

                                                        }
                                                        var splitedDate = currentDate.split("-");
                                                        cy.log(endDate(last))
                                                        cy.get('#appt-filter-date').clear().type( randomday+ '-' + randomday, {
                                                            force: true
                                                        })
                                                        cy.contains('Apply').click({force:true})
                                                        cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })


                                                        const  dayArraye  = randomday.split('/')
                        
                                                        cy.get('tbody > :nth-child(1) > :nth-child(8)').should('contain', dayArraye[0]+'/'+dayArraye[1])


                                                    })

												}
											})
									

                                        })
                                })








										





									



								})
								









							})
						})


					}
				})



			}
			valid()


		})




	})
   
    //done
    it('change All  - one week  - http://connected-testing.com:90/', function() {

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
                cy.wait(3000)
                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                    cy.log(aidcurrentname)
                    var newwcurrentname = aidcurrentname.split(' ')
                    cy.log(newwcurrentname[0])
                    if (newwcurrentname[0] != "Open") {
                        cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide) => {
                            const currentHref = currentAide.attr('href')
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            }).then(() => {
                                cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                    force: true
                                })
                                cy.wait(3000)
                                if (cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)')) {
                                    cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {
    
                                        if ($recomanded.children().length > 0) {
                                            cy.reload()
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
                                                cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click()
                                                cy.wait(3000)
                                                cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                    var aidId = $aid.attr("href");
    
                                                    cy.log(aidId)
                                                    cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > .radio > :nth-child(1) > :nth-child(2)').click({
                                                        force: true
                                                    })
                                                 
                                                   
                                                
                                                        cy.get('#visit_duration').then((currentDuration) => {
                                                            const time = currentDuration.attr('value')
                                                            var randomDuration = Math.floor(Math.random() * 7);
                                                            cy.log(time)
                
                                                            function randome(randomDuration) {
                
                                                                if (randomDuration == 0) {
                                                                    randomDuration = 1
                                                                    return randomDuration
                                                                }
                                                                return randomDuration
                                                            }
                
                
                                                            cy.get('#visit_duration').clear().type(randome(randomDuration) + .00)

                                                            cy.get('.calendar_select > .form-group > :nth-child(2)>:nth-child(1)').then(($date) => {
                                                                var currentDate = $date.attr("value");
                                                                cy.get('.calendar_select > .form-group>:nth-child(2)').click()
                                                                cy.wait(3000)
                                                                var activeDays = [];
                                                                cy.get('.day',{force:true}).not('.old, .disabled',{force:true}).each(function($item, $activeDays) {
                                                                    const title = $item.attr('data-day')
                                                                    activeDays.push(title.toString());
                                                                }).then(($item) => {
                                                                            cy.log(activeDays)
                                                                         
                                                                       
                                                                    var randomday = activeDays[Math.floor(Math.random() * activeDays.length)];
                                                                    if (randomday < 10) {
                                                                        var randomday = '0' + randomday
                                                                    }
                                                                    cy.get('[data-day="' + randomday + '"]').click({force:true})
                                                                    cy.get('#save-visit').click({
                                                                        force: true
                                                                    })
                                                                    cy.get('#proceed-anyway-conflicts').click({
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
                        
                                                                            cy.get('#appt-filter-date').then(($dates) => {
                                                                                var datestext = $dates.attr('value')
                                                                                var dateArray = datestext.split(' - ')
                                                                                cy.log(dateArray)
                                                                                const first = dateArray[0]
                                                                                const last = dateArray[1]
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) +' - '+last, {
                                                                                    force: true
                                                                                })
                        
                                                                                function startDate(first) {
                                                                                    var start1 = first.split("/");
                                                                                    cy.log(start1)
                                                                                    var startmounth1 = parseInt(start1[0]) - 1
                                                                                    if (startmounth1 < 10) {
                                                                                        var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                        
                                                                                    } else if (startmounth1 <= 0) {
                                                                                        var year = start1[2] - 1
                                                                                        var startdate1 = '01/' + start1[1] + '/' + year
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    } else {
                                                                                        var startdate1 = startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    }
                        
                                                                                    return startdateString1
                        
                                                                                }
                                                                                cy.log(startDate(first))
                        
                                                                                function endDate(last) {
                                                                                    var end = last.split("/");
                                                                                    var endMounth = parseInt(end[0]) + 1
                                                                                    if (endMounth < 10) {
                                                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    } else {
                                                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    }
                        
                                                                                    return enddateString
                        
                                                                                }
                                                                                var splitedDate = currentDate.split("-");
                                                                                cy.log(endDate(last))
                        
                                                                            cy.get('#appt-search').clear({force:true}).type(appointmentNumber, {
                                                                                force: true
                                                                            })
                                                                            cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.wait(3000)
                                                                            cy.get('tbody > :nth-child(1) > :nth-child(6) > a').then(($el) => {
                                                                                const href = $el.attr('href')
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(6) > a').should('have.attr', 'href').and('contain',currentHref)
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(9)').contains(time)
                                                                                cy.end()
                                                                            })
                                                                   
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(8)').should('contain', splitedDate[1] + '/' + splitedDate[2])
                        
                                                                            })
                                                                        }else if(toastFirst[0] == "Invalid"){
                                                                            cy.get(':nth-child(4) > #cancel-conflicts').click({
                                                                                force: true
                                                                            })
                                                                            cy.reload()
                        
                                                                            cy.get('#appt-filter-date').then(($dates) => {
                                                                                var datestext = $dates.attr('value')
                                                                                var dateArray = datestext.split(' - ')
                                                                                cy.log(dateArray)
                                                                                const first = dateArray[0]
                                                                                const last = dateArray[1]
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) +' - '+last, {
                                                                                    force: true
                                                                                })
                        
                                                                                function startDate(first) {
                                                                                    var start1 = first.split("/");
                                                                                    cy.log(start1)
                                                                                    var startmounth1 = parseInt(start1[0]) - 1
                                                                                    if (startmounth1 < 10) {
                                                                                        var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                        
                                                                                    } else if (startmounth1 <= 0) {
                                                                                        var year = start1[2] - 1
                                                                                        var startdate1 = '01/' + start1[1] + '/' + year
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    } else {
                                                                                        var startdate1 = startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    }
                        
                                                                                    return startdateString1
                        
                                                                                }
                                                                                cy.log(startDate(first))
                        
                                                                                function endDate(last) {
                                                                                    var end = last.split("/");
                                                                                    var endMounth = parseInt(end[0]) + 1
                                                                                    if (endMounth < 10) {
                                                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    } else {
                                                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    }
                        
                                                                                    return enddateString
                        
                                                                                }
                                                                                var splitedDate = currentDate.split("-");
                                                                                cy.log(endDate(last))
                        
                                                                            cy.get('#appt-search').clear({force:true}).type(appointmentNumber, {
                                                                                force: true
                                                                            })
                                                                            cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.wait(5000)
                                                                            cy.get('tbody > :nth-child(1) > :nth-child(6) > a').then(($el) => {
                                                                                const href = $el.attr('href')
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(6) > a').should('have.attr', 'href').and('contain',currentHref)
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(9)').contains(time)
                                                                                cy.end()
                                                                            })
                                                                           
                                                                         
                                                              
                        
                        
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(8)').should('contain', splitedDate[1] + '/' + splitedDate[2])
                        
                                                                            })
                        
                                                                        } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                            cy.get(':nth-child(4) > #cancel-conflicts').click({
                                                                                force: true
                                                                            })
                                                                            cy.reload()
                        
                                                                            cy.get('#appt-filter-date').then(($dates) => {
                                                                                var datestext = $dates.attr('value')
                                                                                var dateArray = datestext.split(' - ')
                                                                                cy.log(dateArray)
                                                                                const first = dateArray[0]
                                                                                const last = dateArray[1]
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) +' - '+last, {
                                                                                    force: true
                                                                                })
                        
                                                                                function startDate(first) {
                                                                                    var start1 = first.split("/");
                                                                                    cy.log(start1)
                                                                                    var startmounth1 = parseInt(start1[0]) - 1
                                                                                    if (startmounth1 < 10) {
                                                                                        var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                        
                                                                                    } else if (startmounth1 <= 0) {
                                                                                        var year = start1[2] - 1
                                                                                        var startdate1 = '01/' + start1[1] + '/' + year
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    } else {
                                                                                        var startdate1 = startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    }
                        
                                                                                    return startdateString1
                        
                                                                                }
                                                                                cy.log(startDate(first))
                        
                                                                                function endDate(last) {
                                                                                    var end = last.split("/");
                                                                                    var endMounth = parseInt(end[0]) + 1
                                                                                    if (endMounth < 10) {
                                                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    } else {
                                                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    }
                        
                                                                                    return enddateString
                        
                                                                                }
                                                                                var splitedDate = currentDate.split("-");
                                                                                cy.log(endDate(last))
                        
                                                                            cy.get('#appt-search').clear({force:true}).type(appointmentNumber, {
                                                                                force: true
                                                                            })
                                                                            cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.wait(5000)
                                                                            cy.get('tbody > :nth-child(1) > :nth-child(6) > a').then(($el) => {
                                                                                const href = $el.attr('href')
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(6) > a').should('have.attr', 'href').and('contain',currentHref)
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(9)').contains(time)
                                                                                cy.end()
                                                                            })
                                                                          
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(8)').should('contain', splitedDate[1] + '/' + splitedDate[2])
                        
                                                                            })
                                                                        } else if(toastFirst[0] == "Successfully") {
                                                                            cy.get(':nth-child(4) > #cancel-conflicts').click({
                                                                                force: true
                                                                            })
                                                                            cy.reload()
                        
                                                                            cy.get('#appt-filter-date').then(($dates) => {
                                                                                var datestext = $dates.attr('value')
                                                                                var dateArray = datestext.split(' - ')
                                                                                cy.log(dateArray)
                                                                                const first = dateArray[0]
                                                                                const last = dateArray[1]
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) +' - '+last, {
                                                                                    force: true
                                                                                })
                        
                                                                                function startDate(first) {
                                                                                    var start1 = first.split("/");
                                                                                    cy.log(start1)
                                                                                    var startmounth1 = parseInt(start1[0]) - 1
                                                                                    if (startmounth1 < 10) {
                                                                                        var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                        
                                                                                    } else if (startmounth1 <= 0) {
                                                                                        var year = start1[2] - 1
                                                                                        var startdate1 = '01/' + start1[1] + '/' + year
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    } else {
                                                                                        var startdate1 = startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    }
                        
                                                                                    return startdateString1
                        
                                                                                }
                                                                                cy.log(startDate(first))
                        
                                                                                function endDate(last) {
                                                                                    var end = last.split("/");
                                                                                    var endMounth = parseInt(end[0]) + 1
                                                                                    if (endMounth < 10) {
                                                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    } else {
                                                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    }
                        
                                                                                    return enddateString
                        
                                                                                }
                                                                                var splitedDate = currentDate.split("-");
                                                                                cy.log(endDate(last))
                        
                                                                            cy.get('#appt-search').clear({force:true}).type(appointmentNumber, {
                                                                                force: true
                                                                            })
                                                                            cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.wait(5000)
                                                                            cy.get('tbody > :nth-child(1) > :nth-child(6) > a').then(($el) => {
                                                                                const href = $el.attr('href')
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(6) > a').should('have.attr', 'href').and('contain',aidId)
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(9)').contains(randome(randomDuration) + .00)
                                                                                cy.end()
                                                                            })
                                                                            cy.reload()
                                                                            cy.get('#appt-search').clear().type(appointmentNumber, {
                                                                                force: true
                                                                            })
                                                                         
                                                                           
                                                                                cy.get('#appt-filter-date').clear().type(randomday+ '-' +randomday, {
                                                                                    force: true
                                                                                })
                                                                                cy.contains('Apply').click({force:true})
                                                                                cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                        
                        
                                                                                  const  dayArraye  = randomday.split('/')
                        
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(8)').should('contain', dayArraye[0]+'/'+dayArraye[1])
                        
                                                                            })
                        
                                                                        }else{

                                                                            cy.wait(100)
                                                                        }
                                                                    })
                                                                })
                                                            })
                                                                   
                                                           
                                                        })
                                                  
                                                  
    
    
    
    
                                                })
    
    
    
                                            })
                                            return
                                        } else {
                                            cy.wait(100)
                                            cy.reload()
                                            valid()
                                        }
    
    
    
    
                                    })
                                } else {
                                    cy.wait(100)
                                    cy.reload()
                                    valid()
                                }
    
                            })
                        
                        })
                       
                    } else {
                        cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide) => {
                            const currentHref = currentAide.attr('href')
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            }).then(() => {
                                cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                    force: true
                                })
                                cy.wait(3000)
                                if (cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)')) {
                                    cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {
    
                                        if ($recomanded.children().length > 0) {
                                            cy.reload()
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
                                                cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click()
                                                cy.wait(3000)
                                                cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                    var aidId = $aid.attr("href");
    
                                                    cy.log(aidId)
                                                    cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > .radio > :nth-child(1) > :nth-child(2)').click({
                                                        force: true
                                                    })
                                                 
                                                   
                                                
                                                        cy.get('#visit_duration').then((currentDuration) => {
                                                            const time = currentDuration.attr('value')
                                                            var randomDuration = Math.floor(Math.random() * 7);
                                                            cy.log(time)
                
                                                            function randome(randomDuration) {
                
                                                                if (randomDuration == 0) {
                                                                    randomDuration = 1
                                                                    return randomDuration
                                                                }
                                                                return randomDuration
                                                            }
                
                
                                                            cy.get('#visit_duration').clear().type(randome(randomDuration) + .00)

                                                            cy.get('.calendar_select > .form-group > :nth-child(2)>:nth-child(1)').then(($date) => {
                                                                var currentDate = $date.attr("value");
                                                                cy.get('.calendar_select > .form-group>:nth-child(2)').click()
                                                                cy.wait(3000)
                                                                var activeDays = [];
                                                                cy.get('.day',{force:true}).not('.old, .disabled',{force:true}).each(function($item, $activeDays) {
                                                                    const title = $item.attr('data-day')
                                                                    activeDays.push(title.toString());
                                                                }).then(($item) => {
                                                                            cy.log(activeDays)
                                                                         
                                                                       
                                                                    var randomday = activeDays[Math.floor(Math.random() * activeDays.length)];
                                                                    if (randomday < 10) {
                                                                        var randomday = '0' + randomday
                                                                    }
                                                                    cy.get('[data-day="' + randomday + '"]').click({force:true})
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
                        
                                                                            cy.get('#appt-filter-date').then(($dates) => {
                                                                                var datestext = $dates.attr('value')
                                                                                var dateArray = datestext.split(' - ')
                                                                                cy.log(dateArray)
                                                                                const first = dateArray[0]
                                                                                const last = dateArray[1]
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) +' - '+last, {
                                                                                    force: true
                                                                                })
                        
                                                                                function startDate(first) {
                                                                                    var start1 = first.split("/");
                                                                                    cy.log(start1)
                                                                                    var startmounth1 = parseInt(start1[0]) - 1
                                                                                    if (startmounth1 < 10) {
                                                                                        var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                        
                                                                                    } else if (startmounth1 <= 0) {
                                                                                        var year = start1[2] - 1
                                                                                        var startdate1 = '01/' + start1[1] + '/' + year
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    } else {
                                                                                        var startdate1 = startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    }
                        
                                                                                    return startdateString1
                        
                                                                                }
                                                                                cy.log(startDate(first))
                        
                                                                                function endDate(last) {
                                                                                    var end = last.split("/");
                                                                                    var endMounth = parseInt(end[0]) + 1
                                                                                    if (endMounth < 10) {
                                                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    } else {
                                                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    }
                        
                                                                                    return enddateString
                        
                                                                                }
                                                                                var splitedDate = currentDate.split("-");
                                                                                cy.log(endDate(last))
                        
                                                                            cy.get('#appt-search').clear({force:true}).type(appointmentNumber, {
                                                                                force: true
                                                                            })
                                                                            cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.wait(3000)
                                                                            cy.get('tbody > :nth-child(1) > :nth-child(6) > a').then(($el) => {
                                                                                const href = $el.attr('href')
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(6) > a').should('have.attr', 'href').and('contain',currentHref)
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(9)').contains(time)
                                                                                cy.end()
                                                                            })
                                                                   
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(8)').should('contain', splitedDate[1] + '/' + splitedDate[2])
                        
                                                                            })
                                                                        }else if(toastFirst[0] == "Invalid"){
                                                                            cy.get(':nth-child(4) > #cancel-conflicts').click({
                                                                                force: true
                                                                            })
                                                                            cy.reload()
                        
                                                                            cy.get('#appt-filter-date').then(($dates) => {
                                                                                var datestext = $dates.attr('value')
                                                                                var dateArray = datestext.split(' - ')
                                                                                cy.log(dateArray)
                                                                                const first = dateArray[0]
                                                                                const last = dateArray[1]
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) +' - '+last, {
                                                                                    force: true
                                                                                })
                        
                                                                                function startDate(first) {
                                                                                    var start1 = first.split("/");
                                                                                    cy.log(start1)
                                                                                    var startmounth1 = parseInt(start1[0]) - 1
                                                                                    if (startmounth1 < 10) {
                                                                                        var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                        
                                                                                    } else if (startmounth1 <= 0) {
                                                                                        var year = start1[2] - 1
                                                                                        var startdate1 = '01/' + start1[1] + '/' + year
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    } else {
                                                                                        var startdate1 = startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    }
                        
                                                                                    return startdateString1
                        
                                                                                }
                                                                                cy.log(startDate(first))
                        
                                                                                function endDate(last) {
                                                                                    var end = last.split("/");
                                                                                    var endMounth = parseInt(end[0]) + 1
                                                                                    if (endMounth < 10) {
                                                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    } else {
                                                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    }
                        
                                                                                    return enddateString
                        
                                                                                }
                                                                                var splitedDate = currentDate.split("-");
                                                                                cy.log(endDate(last))
                        
                                                                            cy.get('#appt-search').clear({force:true}).type(appointmentNumber, {
                                                                                force: true
                                                                            })
                                                                            cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.wait(5000)
                                                                            cy.get('tbody > :nth-child(1) > :nth-child(6) > a').then(($el) => {
                                                                                const href = $el.attr('href')
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(6) > a').should('have.attr', 'href').and('contain',currentHref)
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(9)').contains(time)
                                                                                cy.end()
                                                                            })
                                                                           
                                                                         
                                                              
                        
                        
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(8)').should('contain', splitedDate[1] + '/' + splitedDate[2])
                        
                                                                            })
                        
                                                                        } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                            cy.get(':nth-child(4) > #cancel-conflicts').click({
                                                                                force: true
                                                                            })
                                                                            cy.reload()
                        
                                                                            cy.get('#appt-filter-date').then(($dates) => {
                                                                                var datestext = $dates.attr('value')
                                                                                var dateArray = datestext.split(' - ')
                                                                                cy.log(dateArray)
                                                                                const first = dateArray[0]
                                                                                const last = dateArray[1]
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) +' - '+last, {
                                                                                    force: true
                                                                                })
                        
                                                                                function startDate(first) {
                                                                                    var start1 = first.split("/");
                                                                                    cy.log(start1)
                                                                                    var startmounth1 = parseInt(start1[0]) - 1
                                                                                    if (startmounth1 < 10) {
                                                                                        var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                        
                                                                                    } else if (startmounth1 <= 0) {
                                                                                        var year = start1[2] - 1
                                                                                        var startdate1 = '01/' + start1[1] + '/' + year
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    } else {
                                                                                        var startdate1 = startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    }
                        
                                                                                    return startdateString1
                        
                                                                                }
                                                                                cy.log(startDate(first))
                        
                                                                                function endDate(last) {
                                                                                    var end = last.split("/");
                                                                                    var endMounth = parseInt(end[0]) + 1
                                                                                    if (endMounth < 10) {
                                                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    } else {
                                                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    }
                        
                                                                                    return enddateString
                        
                                                                                }
                                                                                var splitedDate = currentDate.split("-");
                                                                                cy.log(endDate(last))
                        
                                                                            cy.get('#appt-search').clear({force:true}).type(appointmentNumber, {
                                                                                force: true
                                                                            })
                                                                            cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.wait(5000)
                                                                            cy.get('tbody > :nth-child(1) > :nth-child(6) > a').then(($el) => {
                                                                                const href = $el.attr('href')
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(6) > a').should('have.attr', 'href').and('contain',currentHref)
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(9)').contains(time)
                                                                                cy.end()
                                                                            })
                                                                          
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(8)').should('contain', splitedDate[1] + '/' + splitedDate[2])
                        
                                                                            })
                                                                        } else if(toastFirst[0] == "Successfully") {
                                                                            cy.get(':nth-child(4) > #cancel-conflicts').click({
                                                                                force: true
                                                                            })
                                                                            cy.reload()
                        
                                                                            cy.get('#appt-filter-date').then(($dates) => {
                                                                                var datestext = $dates.attr('value')
                                                                                var dateArray = datestext.split(' - ')
                                                                                cy.log(dateArray)
                                                                                const first = dateArray[0]
                                                                                const last = dateArray[1]
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) +' - '+last, {
                                                                                    force: true
                                                                                })
                        
                                                                                function startDate(first) {
                                                                                    var start1 = first.split("/");
                                                                                    cy.log(start1)
                                                                                    var startmounth1 = parseInt(start1[0]) - 1
                                                                                    if (startmounth1 < 10) {
                                                                                        var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                        
                                                                                    } else if (startmounth1 <= 0) {
                                                                                        var year = start1[2] - 1
                                                                                        var startdate1 = '01/' + start1[1] + '/' + year
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    } else {
                                                                                        var startdate1 = startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                                        var startdateString1 = startdate1.toString()
                                                                                    }
                        
                                                                                    return startdateString1
                        
                                                                                }
                                                                                cy.log(startDate(first))
                        
                                                                                function endDate(last) {
                                                                                    var end = last.split("/");
                                                                                    var endMounth = parseInt(end[0]) + 1
                                                                                    if (endMounth < 10) {
                                                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    } else {
                                                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                                        var enddateString = endDAte
                                                                                    }
                        
                                                                                    return enddateString
                        
                                                                                }
                                                                                var splitedDate = currentDate.split("-");
                                                                                cy.log(endDate(last))
                        
                                                                            cy.get('#appt-search').clear({force:true}).type(appointmentNumber, {
                                                                                force: true
                                                                            })
                                                                            cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.wait(5000)
                                                                            cy.get('tbody > :nth-child(1) > :nth-child(6) > a').then(($el) => {
                                                                                const href = $el.attr('href')
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(6) > a').should('have.attr', 'href').and('contain',aidId)
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(9)').contains(randome(randomDuration) + .00)
                                                                                cy.end()
                                                                            })
                                                                            cy.reload()
                                                                            cy.get('#appt-search').clear().type(appointmentNumber, {
                                                                                force: true
                                                                            })
                                                                         
                                                                           
                                                                                cy.get('#appt-filter-date').clear().type(randomday+ '-' +randomday, {
                                                                                    force: true
                                                                                })
                                                                                cy.contains('Apply').click({force:true})
                                                                                cy.get(':nth-child(27) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                        
                        
                                                                                  const  dayArraye  = randomday.split('/')
                        
                                                                                cy.get('tbody > :nth-child(1) > :nth-child(8)').should('contain', dayArraye[0]+'/'+dayArraye[1])
                        
                                                                            })
                        
                                                                        }else{

                                                                            cy.wait(100)
                                                                        }
                                                                    })
                                                                })
                                                            })
                                                                   
                                                           
                                                        })
                                                  
                                                  
    
    
    
    
                                                })
    
    
    
                                            })
                                            return
                                        } else {
                                            cy.wait(100)
                                            cy.reload()
                                            valid()
                                        }
    
    
    
    
                                    })
                                } else {
                                    cy.wait(100)
                                    cy.reload()
                                    valid()
                                }
    
                            })
                        
                        })
                       
                    }
                })
    
    
    
            }
            valid()
    
    
        })
    
    
    
    
    })

})