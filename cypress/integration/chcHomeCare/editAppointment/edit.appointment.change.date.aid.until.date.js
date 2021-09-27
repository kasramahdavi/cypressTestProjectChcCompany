const {
    forEach,
    head
} = require("lodash")

///<reference types = "Cypress" />

describe('log in and edit appointment  ', function() {
    beforeEach("viewport", function() {
        cy.viewport(1280, 720)
        cy.exec('npm cache clear --force')
        cy.visit(Cypress.env('baseUrl'))


        cy.get('#email').type(Cypress.env('username'))
        cy.get('#password').type(Cypress.env('password'), { log: false })
        cy.get('.btn').click()
        Cypress.on('uncaught:exception', (err, runnable) => {

            return false
        });
    })
  //done
    it('change aide to Open shift  -until certain date - connected-testing.com:90', function() {

        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        }).then(() => {


            const validRow = () => {


                const numbers = [1]

                function addNumber(numbers) {
                    let arr1 = [];
                    for (let i = 1; i <= 70; i++) {
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
                cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                cy.wait(2000)
                cy.get('tbody > :nth-child( ' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                    cy.log(aidcurrentname)
                    var newwcurrentname = aidcurrentname.split(' ')
                    cy.log(newwcurrentname[0])
                    if (newwcurrentname[0] != "Open") {
                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                            force: true
                        })

                        cy.get('#select2-sid-container').click()
                        cy.wait(200)
                        cy.get('.select2-dropdown > .select2-search > .select2-search__field').type('Open')
                        cy.wait(5000)
                        cy.get('#select2-sid-results > :nth-child(1)').invoke('text').then((open) => {

                            let splitedOpen = open.split(' ')
                            cy.log(splitedOpen)

                            if (splitedOpen[0] != 'Open') {
                                cy.wait(100)
                                cy.reload()
                                validRow()
                            } else {
                                cy.reload()
                                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide) => {
                                    const currentHref = currentAide.attr('href')
                                
                               



                                    cy.wait(3000)
                                    cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .btn').invoke('text').then((text) => {
                                        var fullText = text;
                                        var pattern = /[0-9]+/g;
                                        var appointmentNumber = fullText.match(pattern).toString();
                                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > strong > small').invoke('text').then((smalltext) => {
                                            var fullTextSmll = smalltext;
                                            var pattern = /[0-9]+/g;
                                            var asignmentNumber = fullTextSmll.match(pattern).toString();
                                            cy.log(asignmentNumber)
                                            cy.get('#appt-assignment_id').type(asignmentNumber, {
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
                                                    var year = parseInt(start1[2]) - 1
                                                    cy.log(start1)
                                                    var startmounth1 = parseInt(start1[0]) - 1
                                                    if (startmounth1 < 10) {
                                                        var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                        var startdateString1 = startdate1.toString()

                                                    } else if (startmounth1 <= 0) {

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
                                                    var endMounth = parseInt(end[0]) + 3
                                                    var year = parseInt(end[2]) + 1
                                                    if (endMounth < 10) {
                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                        var enddateString = endDAte
                                                    } else if (endMounth > 12) {

                                                        var endDAte = '01/' + end[1] + '/' + year
                                                        var enddateString = endDAte
                                                    } else {
                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                        var enddateString = endDAte

                                                    }

                                                    return enddateString

                                                }
                                                cy.log(endDate(last))
                                                cy.get('#appt-filter-date').clear({force:true}).type(startDate(first) + ' - ' + endDate(last), {
                                                    force: true
                                                })
                                                cy.contains('Apply').click({
                                                    force: true
                                                })
                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()


                                                cy.get('tbody > tr > :nth-child(2) > .btn').each(($appointment) => {

                                                    var text = $appointment.text()
                                                    var pattern = /[0-9]+/g;
                                                    var asignmentNumber = text.match(pattern);

                                                    var appointments = []
                                                    appointments.push(asignmentNumber)
                                                    cy.log(appointments)


                                                }).then((appointments) => {
                                                    cy.wait(2000)
                                                    cy.get('input[value="Reset"]').first().click({
                                                        force: true
                                                    })
                                                    cy.get('#appt-search').type(appointmentNumber)

                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                    cy.get('.editable-click').click()
                                                    cy.wait(3000)
                                                    cy.get('#selecteduntil').click()

                                                    function untilDate(last) {
                                                        var endMounthFormarray = last.split('/')
                                                        var year = parseInt(endMounthFormarray[2]) + 1
                                                        var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 2
                                                        if (endMounthFormMounth < 10) {
                                                            var endDAte1 = endMounthFormarray[2] + '-0' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                            var enddateString1 = endDAte1
                                                        } else if (endMounthFormMounth > 12) {


                                                            var endDAte1 = year + '-01-' + endMounthFormarray[1]
                                                            var enddateString1 = endDAte1
                                                        } else {
                                                            var endDAte1 = endMounthFormarray[2] + '-' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                            var enddateString1 = endDAte1
                                                        }

                                                        return enddateString1

                                                    }


                                                    cy.get('#change_until').type(untilDate(last))
                                                    var randomAid = Math.floor(Math.random() * 11);


                                                    function randomeaid(randomAid) {

                                                        if (randomAid == 0) {
                                                            randomAid = 1
                                                            return randomAid
                                                        }
                                                        return randomAid
                                                    }
                                                    cy.wait(5000)
                                                    cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                        var aidId = $aid.attr("href");

                                                        var aidName = $aid.text()

                                                        cy.get('#select2-sid-container').click()
                                                        cy.wait(3000)
                                                        cy.get('.select2-dropdown > .select2-search > .select2-search__field').type('open')
                                                        cy.wait(4000)

                                                        cy.get('#select2-sid-results > :nth-child(1)').invoke('text').then((open) => {

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

                                                                const toastText = $toast.text()
                                                                const toastFirst = toastText.split(' ')
                                                                if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
                                                                    cy.reload()

                                                                    const arrayeAppo = appointments.text().split('#')
                                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                                    cy.log(arrayeAppoLast)


                                                                    cy.log(arrayeAppo)
                                                                    cy.get('#appt-assignment_id').clear({
                                                                        force: true
                                                                    })
                                                                    cy.get('#appt-search').clear().type(appointmentNumber)




                                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                        force: true
                                                                    })


                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                        force: true
                                                                    })
                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                        var fullText = text1;
                                                                        var pattern = /[0-9]+/g;
                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                        cy.get('#appt-search').clear()
                                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                        cy.log(assignmentNumber)
                                                                    })

                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                    }).should('have.attr', 'href').and('contain', currentHref)
                                                                } else if (toastFirst[0] == "Invalid") {
                                                                    cy.reload()

                                                                    const arrayeAppo = appointments.text().split('#')
                                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                                    cy.log(arrayeAppoLast)


                                                                    cy.log(arrayeAppo)
                                                                    cy.get('#appt-assignment_id').clear({
                                                                        force: true
                                                                    })
                                                                    cy.get('#appt-search').clear().type(appointmentNumber)




                                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                        force: true
                                                                    })


                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                        force: true
                                                                    })
                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                        var fullText = text1;
                                                                        var pattern = /[0-9]+/g;
                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                        cy.get('#appt-search').clear()
                                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                        cy.log(assignmentNumber)
                                                                    })

                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                    }).should('have.attr', 'href').and('contain', currentHref)

                                                                } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                    cy.reload()

                                                                    const arrayeAppo = appointments.text().split('#')
                                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                                    cy.log(arrayeAppoLast)


                                                                    cy.log(arrayeAppo)
                                                                    cy.get('#appt-assignment_id').clear({
                                                                        force: true
                                                                    })
                                                                    cy.get('#appt-search').clear().type(appointmentNumber)




                                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                        force: true
                                                                    })


                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                        force: true
                                                                    })
                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                        var fullText = text1;
                                                                        var pattern = /[0-9]+/g;
                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                        cy.get('#appt-search').clear()
                                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                        cy.log(assignmentNumber)
                                                                    })

                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                    }).should('have.attr', 'href').and('contain', currentHref)
                                                                } else if (toastFirst[0] == "Successfully") {
                                                                    cy.reload()

                                                                    const arrayeAppo = appointments.text().split('#')
                                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                                    cy.log(arrayeAppoLast)


                                                                    cy.log(arrayeAppo)
                                                                    cy.get('#appt-assignment_id').clear({
                                                                        force: true
                                                                    })
                                                                    cy.get('#appt-search').clear().type(appointmentNumber)




                                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                        force: true
                                                                    })


                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                        force: true
                                                                    })
                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                        var fullText = text1;
                                                                        var pattern = /[0-9]+/g;
                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                        cy.get('#appt-search').clear()
                                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                        cy.log(assignmentNumber)
                                                                    })

                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                    }).should('contain', 'Open')
                                                                }

                                                            })
                                                        })




                                                    })
                                                })




                                            })


                                        })


                                    })




                                })

                            }
                        })




                    } else {
                        cy.wait(100)
                        cy.reload()
                        validRow()
                    }
                })



            }


            validRow()



        })


    })
     //done
     it('change Open shift to aide -until certain date - connected-testing.com:90', function() {

        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        }).then(() => {
    
    
            const validRow = () => {
    
    
                const numbers = [1]
    
                function addNumber(numbers) {
                    let arr1 = [];
                    for (let i = 1; i <= 70; i++) {
                        if (i == 1) {
                            i = 1
                        } else {
                            i = i + 2
                        }
    
                        arr1.push((i))
                    }
                    return arr1
    
                }
                cy.get('input[role="textbox"]').first().click({force:true}).type('Open').then(()=>{
                    cy.wait(500)
                    cy.get('#select2-appt-staffs-results > :nth-child(1)').click({force:true})
              
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
                cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                cy.get('input[role="textbox"]').first().click({force:true}).type('Open').then(()=>{
                    cy.wait(500)
                    cy.get('#select2-appt-staffs-results > :nth-child(1)').click({force:true})
              
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
                cy.wait(2000)
                cy.get('tbody > :nth-child( ' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
             
    
                        cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide)=>{
                            const currentHref = currentAide.attr('href')
                            cy.wait(2000)
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                        
                            cy.wait(3000)
                            if (cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)')) {
                                cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {
        
                                    if ($recomanded.children().length > 0) {
        
                                                cy.reload()
                                          
                                              
                                                cy.wait(3000)
                                                cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .btn').invoke('text').then((text) => {
                                                    var fullText = text;
                                                    var pattern = /[0-9]+/g;
                                                    var appointmentNumber = fullText.match(pattern).toString();
                                                    cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > strong > small').invoke('text').then((smalltext) => {
                                                        var fullTextSmll = smalltext;
                                                        var pattern = /[0-9]+/g;
                                                        var asignmentNumber = fullTextSmll.match(pattern).toString();
                                                        cy.log(asignmentNumber)
                                                        cy.get('#appt-assignment_id').type(asignmentNumber, {
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
                                                                var year = parseInt(start1[2]) - 1
                                                                cy.log(start1)
                                                                var startmounth1 = parseInt(start1[0]) - 1
                                                                if (startmounth1 < 10) {
                                                                    var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                    var startdateString1 = startdate1.toString()
        
                                                                } else if (startmounth1 <= 0) {
        
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
                                                                var endMounth = parseInt(end[0]) + 3
                                                                var year = parseInt(end[2]) + 1
                                                                if (endMounth < 10) {
                                                                    var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                    var enddateString = endDAte
                                                                } else if (endMounth > 12) {
        
                                                                    var endDAte = '01/' + end[1] + '/' + year
                                                                    var enddateString = endDAte
                                                                } else {
                                                                    var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                    var enddateString = endDAte
        
                                                                }
        
                                                                return enddateString
        
                                                            }
                                                            cy.log(endDate(last))
                                                            cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                force: true
                                                            })
                                                            cy.contains('Apply').click({force:true})
                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
        
        
                                                            cy.get('tbody > tr > :nth-child(2) > .btn').each(($appointment) => {
        
                                                                var text = $appointment.text()
                                                                var pattern = /[0-9]+/g;
                                                                var asignmentNumber = text.match(pattern);
        
                                                                var appointments = []
                                                                appointments.push(asignmentNumber)
                                                                cy.log(appointments)
        
        
                                                            }).then((appointments) => {
                                                                cy.log(appointments.text())
                                                                cy.wait(2000)
                                                                cy.get('input[value="Reset"]').first().click({
                                                                    force: true
                                                                })
                                                                cy.get('#appt-search').type(appointmentNumber)
        
                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                cy.get('.editable-click').click()
                                                                cy.wait(3000)
                                                                cy.get('#selecteduntil').click()
        
                                                                function untilDate(last) {
                                                                    var endMounthFormarray = last.split('/')
                                                                    var year = parseInt(endMounthFormarray[2]) + 1
                                                                    var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 2
                                                                    if (endMounthFormMounth < 10) {
                                                                        var endDAte1 = endMounthFormarray[2] + '-0' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    } else if (endMounthFormMounth > 12) {
        
        
                                                                        var endDAte1 = year + '-01-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    } else {
                                                                        var endDAte1 = endMounthFormarray[2] + '-' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    }
        
                                                                    return enddateString1
        
                                                                }
        
        
                                                                cy.get('#change_until').type(untilDate(last))
                                                                var randomAid = Math.floor(Math.random() * 11);
        
        
                                                                function randomeaid(randomAid) {
        
                                                                    if (randomAid == 0) {
                                                                        randomAid = 1
                                                                        return randomAid
                                                                    }
                                                                    return randomAid
                                                                }
                                                                cy.wait(5000)
                                                                cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                                    var aidId = $aid.attr("href");
        
                                                                    var aidName = $aid.text()
        
                                                                    cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > .radio > .cb-wrapper > .checked').click({
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
                                                                            if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
                                                                                cy.reload()
                                                                             
                                                                                
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain', currentHref)
                                                                            }else if(toastFirst[0] == "Invalid") {
                                                                                cy.reload()
                                                                            
                                                                                
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain', currentHref)
                                                                                
                                                                            }else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                                cy.reload()
                                                                              
                                                                                
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain', currentHref)
                                                                            } else if(toastFirst[0] == "Successfully") {
                                                                                cy.reload()
                                                                               
                                                                                
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain',aidId)
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
                                        validRow()
                                    }
        
        
                                })
                            } else {
                                cy.wait(100)
                                cy.reload()
                                validRow()
                            }
                        })
                       
    
    
    
                    
    
                })
    
    
    
            }
    
    
            validRow()
    
    
    
        })
    
    
    })
    //done
    it('change aide to aide by input -until certain date - connected-testing.com:90', function() {

        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        }).then(() => {
    
    
            const validRow = () => {
    
    
                const numbers = [1]
    
                function addNumber(numbers) {
                    let arr1 = [];
                    for (let i = 1; i <= 70; i++) {
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
                cy.wait(2000)
                cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                cy.wait(2000)
                cy.get('tbody > :nth-child( ' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                    cy.log(aidcurrentname)
                    var newwcurrentname = aidcurrentname.split(' ')
                    cy.log(newwcurrentname[0])
                    if (newwcurrentname[0] != "Open") {
    
                        cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide)=>{
                            const currentHref = currentAide.attr('href')
                            cy.wait(2000)
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                        
                            cy.wait(3000)
                            if (cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)')) {
                                cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {
        
                                    if ($recomanded.children().length > 0) {
        
                                                cy.reload()
                                                cy.wait(3000)
                                                cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .btn').invoke('text').then((text) => {
                                                    var fullText = text;
                                                    var pattern = /[0-9]+/g;
                                                    var appointmentNumber = fullText.match(pattern).toString();
                                                    cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > strong > small').invoke('text').then((smalltext) => {
                                                        var fullTextSmll = smalltext;
                                                        var pattern = /[0-9]+/g;
                                                        var asignmentNumber = fullTextSmll.match(pattern).toString();
                                                        cy.log(asignmentNumber)
                                                        cy.get('#appt-assignment_id').type(asignmentNumber, {
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
                                                                var year = parseInt(start1[2]) - 1
                                                                cy.log(start1)
                                                                var startmounth1 = parseInt(start1[0]) - 1
                                                                if (startmounth1 < 10) {
                                                                    var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                    var startdateString1 = startdate1.toString()
        
                                                                } else if (startmounth1 <= 0) {
        
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
                                                                var endMounth = parseInt(end[0]) + 3
                                                                var year = parseInt(end[2]) + 1
                                                                if (endMounth < 10) {
                                                                    var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                    var enddateString = endDAte
                                                                } else if (endMounth > 12) {
        
                                                                    var endDAte = '01/' + end[1] + '/' + year
                                                                    var enddateString = endDAte
                                                                } else {
                                                                    var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                    var enddateString = endDAte
        
                                                                }
        
                                                                return enddateString
        
                                                            }
                                                            cy.log(endDate(last))
                                                            cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                force: true
                                                            })
                                                            cy.contains('Apply').click({force:true})
                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
        
        
                                                            cy.get('tbody > tr > :nth-child(2) > .btn').each(($appointment) => {
        
                                                                var text = $appointment.text()
                                                                var pattern = /[0-9]+/g;
                                                                var asignmentNumber = text.match(pattern);
        
                                                                var appointments = []
                                                                appointments.push(asignmentNumber)
                                                                cy.log(appointments)
        
        
                                                            }).then((appointments) => {
                                                                cy.log(appointments.text())
                                                                cy.wait(2000)
                                                                cy.get('input[value="Reset"]').first().click({
                                                                    force: true
                                                                })
                                                                cy.get('#appt-search').type(appointmentNumber)
        
                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                cy.get('.editable-click').click()
                                                                cy.wait(3000)
                                                                cy.get('#selecteduntil').click()
        
                                                                function untilDate(last) {
                                                                    var endMounthFormarray = last.split('/')
                                                                    var year = parseInt(endMounthFormarray[2]) + 1
                                                                    var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 2
                                                                    if (endMounthFormMounth < 10) {
                                                                        var endDAte1 = endMounthFormarray[2] + '-0' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    } else if (endMounthFormMounth > 12) {
        
        
                                                                        var endDAte1 = year + '-01-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    } else {
                                                                        var endDAte1 = endMounthFormarray[2] + '-' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    }
        
                                                                    return enddateString1
        
                                                                }
        
        
                                                                cy.get('#change_until').type(untilDate(last))
                                                                var randomAid = Math.floor(Math.random() * 11);
        
        
                                                                function randomeaid(randomAid) {
        
                                                                    if (randomAid == 0) {
                                                                        randomAid = 1
                                                                        return randomAid
                                                                    }
                                                                    return randomAid
                                                                }
                                                                cy.wait(5000)
                                                                cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                                    var aidId = $aid.attr("href");
        
                                                                    var aidName = $aid.text()
        
                                                                    cy.get('#select2-sid-container').click()
                                                                    cy.wait(3000)
                                                                    cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(aidName)
                                                                    cy.wait(3000)
        
                                                                    cy.get('#select2-sid-results > :nth-child(1)').invoke('text').then((open) => {
        
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
                                                                            if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain', currentHref)
                                                                            }else if(toastFirst[0] == "Invalid") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain', currentHref)
                                                                                
                                                                            }else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain', currentHref)
                                                                            } else if(toastFirst[0] == "Successfully") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain',aidId)
                                                                            }
        
                                                                        })
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
                                        validRow()
                                    }
        
        
                                })
                            } else {
                                cy.wait(100)
                                cy.reload()
                                validRow()
                            }
                        })
                       
    
    
    
                    } else{
    
                        cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide)=>{
                            const currentHref = currentAide.attr('href')
                            cy.wait(2000)
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                        
                            cy.wait(3000)
                            if (cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)')) {
                                cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {
        
                                    if ($recomanded.children().length > 0) {
        
                                                cy.reload()
                                                cy.wait(3000)
                                                cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .btn').invoke('text').then((text) => {
                                                    var fullText = text;
                                                    var pattern = /[0-9]+/g;
                                                    var appointmentNumber = fullText.match(pattern).toString();
                                                    cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > strong > small').invoke('text').then((smalltext) => {
                                                        var fullTextSmll = smalltext;
                                                        var pattern = /[0-9]+/g;
                                                        var asignmentNumber = fullTextSmll.match(pattern).toString();
                                                        cy.log(asignmentNumber)
                                                        cy.get('#appt-assignment_id').type(asignmentNumber, {
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
                                                                var year = parseInt(start1[2]) - 1
                                                                cy.log(start1)
                                                                var startmounth1 = parseInt(start1[0]) - 1
                                                                if (startmounth1 < 10) {
                                                                    var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                    var startdateString1 = startdate1.toString()
        
                                                                } else if (startmounth1 <= 0) {
        
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
                                                                var endMounth = parseInt(end[0]) + 3
                                                                var year = parseInt(end[2]) + 1
                                                                if (endMounth < 10) {
                                                                    var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                    var enddateString = endDAte
                                                                } else if (endMounth > 12) {
        
                                                                    var endDAte = '01/' + end[1] + '/' + year
                                                                    var enddateString = endDAte
                                                                } else {
                                                                    var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                    var enddateString = endDAte
        
                                                                }
        
                                                                return enddateString
        
                                                            }
                                                            cy.log(endDate(last))
                                                            cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                force: true
                                                            })
                                                            cy.contains('Apply').click({force:true})
                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
        
        
                                                            cy.get('tbody > tr > :nth-child(2) > .btn').each(($appointment) => {
        
                                                                var text = $appointment.text()
                                                                var pattern = /[0-9]+/g;
                                                                var asignmentNumber = text.match(pattern);
        
                                                                var appointments = []
                                                                appointments.push(asignmentNumber)
                                                                cy.log(appointments)
        
        
                                                            }).then((appointments) => {
                                                                cy.log(appointments.text())
                                                                cy.wait(2000)
                                                                cy.get('input[value="Reset"]').first().click({
                                                                    force: true
                                                                })
                                                                cy.get('#appt-search').type(appointmentNumber)
        
                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                cy.get('.editable-click').click()
                                                                cy.wait(3000)
                                                                cy.get('#selecteduntil').click()
        
                                                                function untilDate(last) {
                                                                    var endMounthFormarray = last.split('/')
                                                                    var year = parseInt(endMounthFormarray[2]) + 1
                                                                    var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 2
                                                                    if (endMounthFormMounth < 10) {
                                                                        var endDAte1 = endMounthFormarray[2] + '-0' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    } else if (endMounthFormMounth > 12) {
        
        
                                                                        var endDAte1 = year + '-01-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    } else {
                                                                        var endDAte1 = endMounthFormarray[2] + '-' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    }
        
                                                                    return enddateString1
        
                                                                }
        
        
                                                                cy.get('#change_until').type(untilDate(last))
                                                                var randomAid = Math.floor(Math.random() * 11);
        
        
                                                                function randomeaid(randomAid) {
        
                                                                    if (randomAid == 0) {
                                                                        randomAid = 1
                                                                        return randomAid
                                                                    }
                                                                    return randomAid
                                                                }
                                                                cy.wait(5000)
                                                                cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                                    var aidId = $aid.attr("href");
        
                                                                    var aidName = $aid.text()
        
                                                                    cy.get('#select2-sid-container').click()
                                                                    cy.wait(3000)
                                                                    cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(aidName)
                                                                    cy.wait(3000)
        
                                                                    cy.get('#select2-sid-results > :nth-child(1)').invoke('text').then((open) => {
        
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
                                                                            if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain', currentHref)
                                                                            }else if(toastFirst[0] == "Invalid") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain', currentHref)
                                                                                
                                                                            }else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain', currentHref)
                                                                            } else if(toastFirst[0] == "Successfully") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain',aidId)
                                                                            }
        
                                                                        })
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
                                        validRow()
                                    }
        
        
                                })
                            } else {
                                cy.wait(100)
                                cy.reload()
                                validRow()
                            }
                        })
                       
    
    
    
                    }
    
                })
    
    
    
            }
    
    
            validRow()
    
    
    
        })
    
    
    })
    //done
    it('change aide to aide by Recommended aide -until certain date - connected-testing.com:90', function() {

        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        }).then(() => {
    
    
            const validRow = () => {
    
    
                const numbers = [1]
    
                function addNumber(numbers) {
                    let arr1 = [];
                    for (let i = 1; i <= 70; i++) {
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
                cy.wait(2000)
                cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                cy.wait(2000)
                cy.get('tbody > :nth-child( ' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                    cy.log(aidcurrentname)
                    var newwcurrentname = aidcurrentname.split(' ')
                    cy.log(newwcurrentname[0])
                    if (newwcurrentname[0] != "Open") {
    
                        cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide)=>{
                            const currentHref = currentAide.attr('href')
                            cy.wait(2000)
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                        
                            cy.wait(3000)
                            if (cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)')) {
                                cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {
        
                                    if ($recomanded.children().length > 0) {
        
                                                cy.reload()
                                                cy.wait(3000)
                                                cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .btn').invoke('text').then((text) => {
                                                    var fullText = text;
                                                    var pattern = /[0-9]+/g;
                                                    var appointmentNumber = fullText.match(pattern).toString();
                                                    cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > strong > small').invoke('text').then((smalltext) => {
                                                        var fullTextSmll = smalltext;
                                                        var pattern = /[0-9]+/g;
                                                        var asignmentNumber = fullTextSmll.match(pattern).toString();
                                                        cy.log(asignmentNumber)
                                                        cy.get('#appt-assignment_id').type(asignmentNumber, {
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
                                                                var year = parseInt(start1[2]) - 1
                                                                cy.log(start1)
                                                                var startmounth1 = parseInt(start1[0]) - 1
                                                                if (startmounth1 < 10) {
                                                                    var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                    var startdateString1 = startdate1.toString()
        
                                                                } else if (startmounth1 <= 0) {
        
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
                                                                var endMounth = parseInt(end[0]) + 3
                                                                var year = parseInt(end[2]) + 1
                                                                if (endMounth < 10) {
                                                                    var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                    var enddateString = endDAte
                                                                } else if (endMounth > 12) {
        
                                                                    var endDAte = '01/' + end[1] + '/' + year
                                                                    var enddateString = endDAte
                                                                } else {
                                                                    var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                    var enddateString = endDAte
        
                                                                }
        
                                                                return enddateString
        
                                                            }
                                                            cy.log(endDate(last))
                                                            cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                force: true
                                                            })
                                                            cy.contains('Apply').click({force:true})
                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
        
        
                                                            cy.get('tbody > tr > :nth-child(2) > .btn').each(($appointment) => {
        
                                                                var text = $appointment.text()
                                                                var pattern = /[0-9]+/g;
                                                                var asignmentNumber = text.match(pattern);
        
                                                                var appointments = []
                                                                appointments.push(asignmentNumber)
                                                                cy.log(appointments)
        
        
                                                            }).then((appointments) => {
                                                                cy.log(appointments.text())
                                                                cy.wait(2000)
                cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                                                                cy.get('#appt-search').type(appointmentNumber)
        
                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                cy.get('.editable-click').click()
                                                                cy.wait(3000)
                                                                cy.get('#selecteduntil').click()
        
                                                                function untilDate(last) {
                                                                    var endMounthFormarray = last.split('/')
                                                                    var year = parseInt(endMounthFormarray[2]) + 1
                                                                    var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 2
                                                                    if (endMounthFormMounth < 10) {
                                                                        var endDAte1 = endMounthFormarray[2] + '-0' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    } else if (endMounthFormMounth > 12) {
        
        
                                                                        var endDAte1 = year + '-01-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    } else {
                                                                        var endDAte1 = endMounthFormarray[2] + '-' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    }
        
                                                                    return enddateString1
        
                                                                }
        
        
                                                                cy.get('#change_until').type(untilDate(last))
                                                                var randomAid = Math.floor(Math.random() * 11);
        
        
                                                                function randomeaid(randomAid) {
        
                                                                    if (randomAid == 0) {
                                                                        randomAid = 1
                                                                        return randomAid
                                                                    }
                                                                    return randomAid
                                                                }
                                                                cy.wait(5000)
                                                                cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                                    var aidId = $aid.attr("href");
        
                                                                    var aidName = $aid.text()
        
                                                                    cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > .radio > .cb-wrapper > .checked').click({
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
                                                                            if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain', currentHref)
                                                                            }else if(toastFirst[0] == "Invalid") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain', currentHref)
                                                                                
                                                                            }else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain', currentHref)
                                                                            } else if(toastFirst[0] == "Successfully") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain',aidId)
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
                                        validRow()
                                    }
        
        
                                })
                            } else {
                                cy.wait(100)
                                cy.reload()
                                validRow()
                            }
                        })
                       
    
    
    
                    } else{
    
                        cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide)=>{
                            const currentHref = currentAide.attr('href')
                            cy.wait(2000)
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                        
                            cy.wait(3000)
                            if (cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)')) {
                                cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {
        
                                    if ($recomanded.children().length > 0) {
        
                                                cy.reload()
                                                cy.wait(3000)
                                                cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .btn').invoke('text').then((text) => {
                                                    var fullText = text;
                                                    var pattern = /[0-9]+/g;
                                                    var appointmentNumber = fullText.match(pattern).toString();
                                                    cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > strong > small').invoke('text').then((smalltext) => {
                                                        var fullTextSmll = smalltext;
                                                        var pattern = /[0-9]+/g;
                                                        var asignmentNumber = fullTextSmll.match(pattern).toString();
                                                        cy.log(asignmentNumber)
                                                        cy.get('#appt-assignment_id').type(asignmentNumber, {
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
                                                                var year = parseInt(start1[2]) - 1
                                                                cy.log(start1)
                                                                var startmounth1 = parseInt(start1[0]) - 1
                                                                if (startmounth1 < 10) {
                                                                    var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                    var startdateString1 = startdate1.toString()
        
                                                                } else if (startmounth1 <= 0) {
        
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
                                                                var endMounth = parseInt(end[0]) + 3
                                                                var year = parseInt(end[2]) + 1
                                                                if (endMounth < 10) {
                                                                    var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                    var enddateString = endDAte
                                                                } else if (endMounth > 12) {
        
                                                                    var endDAte = '01/' + end[1] + '/' + year
                                                                    var enddateString = endDAte
                                                                } else {
                                                                    var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                    var enddateString = endDAte
        
                                                                }
        
                                                                return enddateString
        
                                                            }
                                                            cy.log(endDate(last))
                                                            cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                force: true
                                                            })
                                                            cy.contains('Apply').click({force:true})
                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
        
        
                                                            cy.get('tbody > tr > :nth-child(2) > .btn').each(($appointment) => {
        
                                                                var text = $appointment.text()
                                                                var pattern = /[0-9]+/g;
                                                                var asignmentNumber = text.match(pattern);
        
                                                                var appointments = []
                                                                appointments.push(asignmentNumber)
                                                                cy.log(appointments)
        
        
                                                            }).then((appointments) => {
                                                                cy.log(appointments.text())
                                                                cy.wait(2000)
                cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                                                                cy.get('#appt-search').type(appointmentNumber)
        
                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                cy.get('.editable-click').click()
                                                                cy.wait(3000)
                                                                cy.get('#selecteduntil').click()
        
                                                                function untilDate(last) {
                                                                    var endMounthFormarray = last.split('/')
                                                                    var year = parseInt(endMounthFormarray[2]) + 1
                                                                    var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 2
                                                                    if (endMounthFormMounth < 10) {
                                                                        var endDAte1 = endMounthFormarray[2] + '-0' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    } else if (endMounthFormMounth > 12) {
        
        
                                                                        var endDAte1 = year + '-01-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    } else {
                                                                        var endDAte1 = endMounthFormarray[2] + '-' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    }
        
                                                                    return enddateString1
        
                                                                }
        
        
                                                                cy.get('#change_until').type(untilDate(last))
                                                                var randomAid = Math.floor(Math.random() * 11);
        
        
                                                                function randomeaid(randomAid) {
        
                                                                    if (randomAid == 0) {
                                                                        randomAid = 1
                                                                        return randomAid
                                                                    }
                                                                    return randomAid
                                                                }
                                                                cy.wait(5000)
                                                                cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                                    var aidId = $aid.attr("href");
        
                                                                    var aidName = $aid.text()
        
                                                                    cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > .radio > .cb-wrapper > .checked').click({
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
                                                                            if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain', currentHref)
                                                                            }else if(toastFirst[0] == "Invalid") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain', currentHref)
                                                                                
                                                                            }else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain', currentHref)
                                                                            } else if(toastFirst[0] == "Successfully") {
                                                                                cy.reload()
        
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
        
        
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear().type(appointmentNumber)
        
        
        
        
                                                                                cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                    force: true
                                                                                })
        
        
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear()
                                                                                    cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                })
        
                                                                                cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                }).should('have.attr', 'href').and('contain',aidId)
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
                                        validRow()
                                    }
        
        
                                })
                            } else {
                                cy.wait(100)
                                cy.reload()
                                validRow()
                            }
                        })
                       
    
    
    
                    }
    
                })
    
    
    
            }
    
    
            validRow()
    
    
    
        })
    
    
    })
 //done
    it('change Duration  -until certain date - connected-testing.com:90', function() {

        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        }).then(() => {


            const validRow = () => {


                const numbers = [1]

                function addNumber(numbers) {
                    let arr1 = [];
                    for (let i = 1; i <= 70; i++) {
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
                cy.wait(2000)
                cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                cy.wait(2000)
                cy.get('tbody > :nth-child( ' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                    cy.log(aidcurrentname)
                    var newwcurrentname = aidcurrentname.split(' ')
                    cy.log(newwcurrentname[0])
                    if (newwcurrentname[0] != "Open") {


                        cy.reload()




                        cy.wait(3000)
                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .btn').invoke('text').then((text) => {
                            var fullText = text;
                            var pattern = /[0-9]+/g;
                            var appointmentNumber = fullText.match(pattern).toString();
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > strong > small').invoke('text').then((smalltext) => {
                                var fullTextSmll = smalltext;
                                var pattern = /[0-9]+/g;
                                var asignmentNumber = fullTextSmll.match(pattern).toString();
                                cy.log(asignmentNumber)
                                cy.get('#appt-assignment_id').type(asignmentNumber, {
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
                                        var year = parseInt(start1[2]) - 1
                                        cy.log(start1)
                                        var startmounth1 = parseInt(start1[0]) - 1
                                        if (startmounth1 < 10) {
                                            var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                            var startdateString1 = startdate1.toString()

                                        } else if (startmounth1 <= 0) {

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
                                        var endMounth = parseInt(end[0]) + 3
                                        var year = parseInt(end[2]) + 1
                                        if (endMounth < 10) {
                                            var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                            var enddateString = endDAte
                                        } else if (endMounth > 12) {

                                            var endDAte = '01/' + end[1] + '/' + year
                                            var enddateString = endDAte
                                        } else {
                                            var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                            var enddateString = endDAte

                                        }

                                        return enddateString

                                    }
                                    cy.log(endDate(last))
                                    cy.get('#appt-filter-date').clear({
                                        force: true
                                    }).type(startDate(first) + ' - ' + endDate(last), {
                                        force: true
                                    })
                                    cy.contains('Apply').click({
                                        force: true
                                    })
                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()


                                    cy.get('tbody > tr > :nth-child(2) > .btn').each(($appointment) => {

                                        var text = $appointment.text()
                                        var pattern = /[0-9]+/g;
                                        var asignmentNumber = text.match(pattern);

                                        var appointments = []
                                        appointments.push(asignmentNumber)
                                        cy.log(appointments)


                                    }).then((appointments) => {
                                        cy.log(appointments.text())
                                        cy.wait(2000)
                                        cy.get('input[value="Reset"]').first().click({
                                            force: true
                                        })
                                        cy.get('#appt-search').type(appointmentNumber)

                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                        cy.get('.editable-click').click()
                                        cy.wait(3000)
                                        cy.get('#selecteduntil').click()

                                        function untilDate(last) {
                                            var endMounthFormarray = last.split('/')
                                            var year = parseInt(endMounthFormarray[2]) + 1
                                            var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 2
                                            if (endMounthFormMounth < 10) {
                                                var endDAte1 = endMounthFormarray[2] + '-0' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                var enddateString1 = endDAte1
                                            } else if (endMounthFormMounth > 12) {


                                                var endDAte1 = year + '-01-' + endMounthFormarray[1]
                                                var enddateString1 = endDAte1
                                            } else {
                                                var endDAte1 = endMounthFormarray[2] + '-' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                var enddateString1 = endDAte1
                                            }

                                            return enddateString1

                                        }


                                        cy.get('#change_until').type(untilDate(last))
                                        cy.get('#visit_duration').then((value) => {
                                            const currenDuration = value.attr('value')
                                            var randomAid = Math.floor(Math.random() * 11);

                                            var randomDuration = Math.floor(Math.random() * 7);

                                            function randome(randomDuration) {

                                                if (randomDuration == 0) {
                                                    randomDuration = 1
                                                    return randomDuration
                                                }
                                                return randomDuration
                                            }


                                            cy.get('#visit_duration').clear({
                                                force: true
                                            }).type(randome(randomDuration) + .00)
                                            cy.wait(5000)




                                            cy.get('#save-visit').click({
                                                force: true
                                            })
                                            cy.get('#proceed-anyway-conflicts').click({
                                                force: true
                                            })




                                            cy.get('.toast-message').each(($toast) => {

                                                const toastText = $toast.text()
                                                const toastFirst = toastText.split(' ')
                                                if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
                                                    cy.reload()

                                                    const arrayeAppo = appointments.text().split('#')
                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                    cy.log(arrayeAppoLast)


                                                    cy.log(arrayeAppo)
                                                    cy.get('#appt-assignment_id').clear({
                                                        force: true
                                                    })
                                                    cy.get('#appt-search').clear().type(appointmentNumber)




                                                    function untilDateFilter(last) {
                                                        var endMounthFormarray = last.split('/')
                                                        const year = endMounthFormarray[2] + 1
                                                        var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                        if (endMounthFormMounth < 10) {
                                                            var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                            var enddateString1 = endDAte1
                                                        } else if (endMounthFormMounth > 12) {


                                                            var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                            var enddateString1 = endDAte1
                                                        } else {
                                                            var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                            var enddateString1 = endDAte1
                                                        }

                                                        return enddateString1

                                                    }

                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                        force: true
                                                    })


                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                        force: true
                                                    })
                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                        var fullText = text1;
                                                        var pattern = /[0-9]+/g;
                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                        cy.get('#appt-search').clear()
                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                        cy.log(assignmentNumber)
                                                    })

                                                    cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                    }).should('contain', currenDuration)
                                                } else if (toastFirst[0] == "Invalid") {
                                                    cy.reload()

                                                    const arrayeAppo = appointments.text().split('#')
                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                    cy.log(arrayeAppoLast)


                                                    cy.log(arrayeAppo)
                                                    cy.get('#appt-assignment_id').clear({
                                                        force: true
                                                    })
                                                    cy.get('#appt-search').clear().type(appointmentNumber)




                                                    function untilDateFilter(last) {
                                                        var endMounthFormarray = last.split('/')
                                                        const year = endMounthFormarray[2] + 1
                                                        var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                        if (endMounthFormMounth < 10) {
                                                            var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                            var enddateString1 = endDAte1
                                                        } else if (endMounthFormMounth > 12) {


                                                            var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                            var enddateString1 = endDAte1
                                                        } else {
                                                            var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                            var enddateString1 = endDAte1
                                                        }

                                                        return enddateString1

                                                    }

                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                        force: true
                                                    })


                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                        force: true
                                                    })
                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                        var fullText = text1;
                                                        var pattern = /[0-9]+/g;
                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                        cy.get('#appt-search').clear()
                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                        cy.log(assignmentNumber)
                                                    })

                                                    cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                    }).should('contain', currenDuration)

                                                } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                    cy.reload()

                                                    const arrayeAppo = appointments.text().split('#')
                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                    cy.log(arrayeAppoLast)


                                                    cy.log(arrayeAppo)
                                                    cy.get('#appt-assignment_id').clear({
                                                        force: true
                                                    })
                                                    cy.get('#appt-search').clear().type(appointmentNumber)




                                                    function untilDateFilter(last) {
                                                        var endMounthFormarray = last.split('/')
                                                        const year = endMounthFormarray[2] + 1
                                                        var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                        if (endMounthFormMounth < 10) {
                                                            var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                            var enddateString1 = endDAte1
                                                        } else if (endMounthFormMounth > 12) {


                                                            var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                            var enddateString1 = endDAte1
                                                        } else {
                                                            var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                            var enddateString1 = endDAte1
                                                        }

                                                        return enddateString1

                                                    }

                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                        force: true
                                                    })


                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                        force: true
                                                    })
                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                        var fullText = text1;
                                                        var pattern = /[0-9]+/g;
                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                        cy.get('#appt-search').clear()
                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                        cy.log(assignmentNumber)
                                                    })

                                                    cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                    }).should('contain', currenDuration)
                                                } else if (toastFirst[0] == "Successfully") {
                                                    cy.reload()

                                                    const arrayeAppo = appointments.text().split('#')
                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                    cy.log(arrayeAppoLast)


                                                    cy.log(arrayeAppo)
                                                    cy.get('#appt-assignment_id').clear({
                                                        force: true
                                                    })
                                                    cy.get('#appt-search').clear().type(appointmentNumber)




                                                    function untilDateFilter(last) {
                                                        var endMounthFormarray = last.split('/')
                                                        const year = endMounthFormarray[2] + 1
                                                        var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                        if (endMounthFormMounth < 10) {
                                                            var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                            var enddateString1 = endDAte1
                                                        } else if (endMounthFormMounth > 12) {


                                                            var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                            var enddateString1 = endDAte1
                                                        } else {
                                                            var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                            var enddateString1 = endDAte1
                                                        }

                                                        return enddateString1

                                                    }

                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                        force: true
                                                    })


                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                        force: true
                                                    })
                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                        var fullText = text1;
                                                        var pattern = /[0-9]+/g;
                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                        cy.get('#appt-search').clear()
                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                        cy.log(assignmentNumber)
                                                    })

                                                    cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                    }).should('contain', randome(randomDuration) + .00)
                                                }

                                            })

                                        })




                                    })




                                })


                            })


                        })




                    } else {


                        cy.reload()




                        cy.wait(3000)
                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .btn').invoke('text').then((text) => {
                            var fullText = text;
                            var pattern = /[0-9]+/g;
                            var appointmentNumber = fullText.match(pattern).toString();
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > strong > small').invoke('text').then((smalltext) => {
                                var fullTextSmll = smalltext;
                                var pattern = /[0-9]+/g;
                                var asignmentNumber = fullTextSmll.match(pattern).toString();
                                cy.log(asignmentNumber)
                                cy.get('#appt-assignment_id').type(asignmentNumber, {
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
                                        var year = parseInt(start1[2]) - 1
                                        cy.log(start1)
                                        var startmounth1 = parseInt(start1[0]) - 1
                                        if (startmounth1 < 10) {
                                            var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                            var startdateString1 = startdate1.toString()

                                        } else if (startmounth1 <= 0) {

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
                                        var endMounth = parseInt(end[0]) + 3
                                        var year = parseInt(end[2]) + 1
                                        if (endMounth < 10) {
                                            var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                            var enddateString = endDAte
                                        } else if (endMounth > 12) {

                                            var endDAte = '01/' + end[1] + '/' + year
                                            var enddateString = endDAte
                                        } else {
                                            var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                            var enddateString = endDAte

                                        }

                                        return enddateString

                                    }
                                    cy.log(endDate(last))
                                    cy.get('#appt-filter-date').clear({
                                        force: true
                                    }).type(startDate(first) + ' - ' + endDate(last), {
                                        force: true
                                    })
                                    cy.contains('Apply').click({
                                        force: true
                                    })
                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()


                                    cy.get('tbody > tr > :nth-child(2) > .btn').each(($appointment) => {

                                        var text = $appointment.text()
                                        var pattern = /[0-9]+/g;
                                        var asignmentNumber = text.match(pattern);

                                        var appointments = []
                                        appointments.push(asignmentNumber)
                                        cy.log(appointments)


                                    }).then((appointments) => {
                                        cy.log(appointments.text())
                                        cy.wait(2000)
                cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                                        cy.get('#appt-search').type(appointmentNumber)

                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                        cy.get('.editable-click').click()
                                        cy.wait(3000)
                                        cy.get('#selecteduntil').click()

                                        function untilDate(last) {
                                            var endMounthFormarray = last.split('/')
                                            var year = parseInt(endMounthFormarray[2]) + 1
                                            var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 2
                                            if (endMounthFormMounth < 10) {
                                                var endDAte1 = endMounthFormarray[2] + '-0' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                var enddateString1 = endDAte1
                                            } else if (endMounthFormMounth > 12) {


                                                var endDAte1 = year + '-01-' + endMounthFormarray[1]
                                                var enddateString1 = endDAte1
                                            } else {
                                                var endDAte1 = endMounthFormarray[2] + '-' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                var enddateString1 = endDAte1
                                            }

                                            return enddateString1

                                        }


                                        cy.get('#change_until').type(untilDate(last))
                                        cy.get('#visit_duration').then((value) => {
                                            const currenDuration = value.attr('value')
                                            var randomAid = Math.floor(Math.random() * 11);

                                            var randomDuration = Math.floor(Math.random() * 7);

                                            function randome(randomDuration) {

                                                if (randomDuration == 0) {
                                                    randomDuration = 1
                                                    return randomDuration
                                                }
                                                return randomDuration
                                            }


                                            cy.get('#visit_duration').clear({
                                                force: true
                                            }).type(randome(randomDuration) + .00)
                                            cy.wait(5000)




                                            cy.get('#save-visit').click({
                                                force: true
                                            })
                                            cy.get('#select-aides-from-circle').click({
                                                force: true
                                            })





                                            cy.get('.toast-message').each(($toast) => {

                                                const toastText = $toast.text()
                                                const toastFirst = toastText.split(' ')
                                                if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
                                                    cy.reload()

                                                    const arrayeAppo = appointments.text().split('#')
                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                    cy.log(arrayeAppoLast)


                                                    cy.log(arrayeAppo)
                                                    cy.get('#appt-assignment_id').clear({
                                                        force: true
                                                    })
                                                    cy.get('#appt-search').clear().type(appointmentNumber)




                                                    function untilDateFilter(last) {
                                                        var endMounthFormarray = last.split('/')
                                                        const year = endMounthFormarray[2] + 1
                                                        var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                        if (endMounthFormMounth < 10) {
                                                            var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                            var enddateString1 = endDAte1
                                                        } else if (endMounthFormMounth > 12) {


                                                            var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                            var enddateString1 = endDAte1
                                                        } else {
                                                            var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                            var enddateString1 = endDAte1
                                                        }

                                                        return enddateString1

                                                    }

                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                        force: true
                                                    })


                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                        force: true
                                                    })
                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                        var fullText = text1;
                                                        var pattern = /[0-9]+/g;
                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                        cy.get('#appt-search').clear()
                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                        cy.log(assignmentNumber)
                                                    })

                                                    cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                    }).should('contain', currenDuration)
                                                } else if (toastFirst[0] == "Invalid") {
                                                    cy.reload()

                                                    const arrayeAppo = appointments.text().split('#')
                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                    cy.log(arrayeAppoLast)


                                                    cy.log(arrayeAppo)
                                                    cy.get('#appt-assignment_id').clear({
                                                        force: true
                                                    })
                                                    cy.get('#appt-search').clear().type(appointmentNumber)




                                                    function untilDateFilter(last) {
                                                        var endMounthFormarray = last.split('/')
                                                        const year = endMounthFormarray[2] + 1
                                                        var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                        if (endMounthFormMounth < 10) {
                                                            var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                            var enddateString1 = endDAte1
                                                        } else if (endMounthFormMounth > 12) {


                                                            var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                            var enddateString1 = endDAte1
                                                        } else {
                                                            var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                            var enddateString1 = endDAte1
                                                        }

                                                        return enddateString1

                                                    }

                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                        force: true
                                                    })


                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                        force: true
                                                    })
                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                        var fullText = text1;
                                                        var pattern = /[0-9]+/g;
                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                        cy.get('#appt-search').clear()
                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                        cy.log(assignmentNumber)
                                                    })

                                                    cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                    }).should('contain', currenDuration)

                                                } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                    cy.reload()

                                                    const arrayeAppo = appointments.text().split('#')
                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                    cy.log(arrayeAppoLast)


                                                    cy.log(arrayeAppo)
                                                    cy.get('#appt-assignment_id').clear({
                                                        force: true
                                                    })
                                                    cy.get('#appt-search').clear().type(appointmentNumber)




                                                    function untilDateFilter(last) {
                                                        var endMounthFormarray = last.split('/')
                                                        const year = endMounthFormarray[2] + 1
                                                        var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                        if (endMounthFormMounth < 10) {
                                                            var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                            var enddateString1 = endDAte1
                                                        } else if (endMounthFormMounth > 12) {


                                                            var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                            var enddateString1 = endDAte1
                                                        } else {
                                                            var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                            var enddateString1 = endDAte1
                                                        }

                                                        return enddateString1

                                                    }

                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                        force: true
                                                    })


                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                        force: true
                                                    })
                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                        var fullText = text1;
                                                        var pattern = /[0-9]+/g;
                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                        cy.get('#appt-search').clear()
                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                        cy.log(assignmentNumber)
                                                    })

                                                    cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                    }).should('contain', currenDuration)
                                                } else if (toastFirst[0] == "Successfully") {
                                                    cy.reload()

                                                    const arrayeAppo = appointments.text().split('#')
                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                    cy.log(arrayeAppoLast)


                                                    cy.log(arrayeAppo)
                                                    cy.get('#appt-assignment_id').clear({
                                                        force: true
                                                    })
                                                    cy.get('#appt-search').clear().type(appointmentNumber)




                                                    function untilDateFilter(last) {
                                                        var endMounthFormarray = last.split('/')
                                                        const year = endMounthFormarray[2] + 1
                                                        var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                        if (endMounthFormMounth < 10) {
                                                            var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                            var enddateString1 = endDAte1
                                                        } else if (endMounthFormMounth > 12) {


                                                            var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                            var enddateString1 = endDAte1
                                                        } else {
                                                            var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                            var enddateString1 = endDAte1
                                                        }

                                                        return enddateString1

                                                    }

                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                        force: true
                                                    })


                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                        force: true
                                                    })
                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                        var fullText = text1;
                                                        var pattern = /[0-9]+/g;
                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                        cy.get('#appt-search').clear()
                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                        cy.log(assignmentNumber)
                                                    })

                                                    cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                    }).should('contain', randome(randomDuration) + .00)
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


            validRow()



        })


    })
    //done
    it('change date  -until certain date - connected-testing.com:90', function() {

        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        }).then(() => {


            const validRow = () => {


                const numbers = [1]

                function addNumber(numbers) {
                    let arr1 = [];
                    for (let i = 1; i <= 70; i++) {
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
                cy.wait(2000)
                cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                cy.wait(2000)
                cy.get('tbody > :nth-child( ' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                    cy.log(aidcurrentname)
                    var newwcurrentname = aidcurrentname.split(' ')
                    cy.log(newwcurrentname[0])
                    if (newwcurrentname[0] != "Open") {


                        cy.reload()




                        cy.wait(3000)
                       
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .btn').invoke('text').then((text) => {
                                var fullText = text;
                                var pattern = /[0-9]+/g;
                                var appointmentNumber = fullText.match(pattern).toString();
                                cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > strong > small').invoke('text').then((smalltext) => {
                                    var fullTextSmll = smalltext;
                                    var pattern = /[0-9]+/g;
                                    var asignmentNumber = fullTextSmll.match(pattern).toString();
                                    cy.log(asignmentNumber)
                                    cy.get('#appt-assignment_id').type(asignmentNumber, {
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
                                            var year = parseInt(start1[2]) - 1
                                            cy.log(start1)
                                            var startmounth1 = parseInt(start1[0]) - 1
                                            if (startmounth1 < 10) {
                                                var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                var startdateString1 = startdate1.toString()
    
                                            } else if (startmounth1 <= 0) {
    
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
                                            var endMounth = parseInt(end[0]) + 3
                                            var year = parseInt(end[2]) + 1
                                            if (endMounth < 10) {
                                                var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                var enddateString = endDAte
                                            } else if (endMounth > 12) {
    
                                                var endDAte = '01/' + end[1] + '/' + year
                                                var enddateString = endDAte
                                            } else {
                                                var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                var enddateString = endDAte
    
                                            }
    
                                            return enddateString
    
                                        }
                                        cy.log(endDate(last))
                                        cy.get('#appt-filter-date').clear({
                                            force: true
                                        }).type(startDate(first) + ' - ' + endDate(last), {
                                            force: true
                                        })
                                        cy.contains('Apply').click({
                                            force: true
                                        })
                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
    
    
                                        cy.get('tbody > tr > :nth-child(2) > .btn').each(($appointment) => {
    
                                            var text = $appointment.text()
                                            var pattern = /[0-9]+/g;
                                            var asignmentNumber = text.match(pattern);
    
                                            var appointments = []
                                            appointments.push(asignmentNumber)
                                            cy.log(appointments)
    
    
                                        }).then((appointments) => {
                                            cy.log(appointments.text())
                                            cy.wait(2000)
                                            cy.get('input[value="Reset"]').first().click({
                                                force: true
                                            })
                                            cy.get('#appt-search').type(appointmentNumber)
    
                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                            cy.get('tbody > :nth-child(1) > :nth-child(7)').invoke('text').then((currentDayOfWeek)=>{

                                            cy.get('.editable-click').click()
                                            cy.wait(3000)
                                            cy.get('#selecteduntil').click()
    
                                            function untilDate(last) {
                                                var endMounthFormarray = last.split('/')
                                                var year = parseInt(endMounthFormarray[2]) + 1
                                                var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 2
                                                if (endMounthFormMounth < 10) {
                                                    var endDAte1 = endMounthFormarray[2] + '-0' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                    var enddateString1 = endDAte1
                                                } else if (endMounthFormMounth > 12) {
    
    
                                                    var endDAte1 = year + '-01-' + endMounthFormarray[1]
                                                    var enddateString1 = endDAte1
                                                } else {
                                                    var endDAte1 = endMounthFormarray[2] + '-' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                    var enddateString1 = endDAte1
                                                }
    
                                                return enddateString1
    
                                            }
                                            cy.get('#change_until').type(untilDate(last))
    
                                            cy.get('#select2-dayofweek_val-container').then((value) => {
                                          
    
                                                cy.get('#select2-dayofweek_val-container').click({
                                                    force: true
                                                })
    
                                                const week = ['Wed', 'Mon', 'Tue', 'Fri', 'Sun', 'Thu', 'Sat']
                                                var theDay = week[Math.floor(Math.random() * week.length)];
                                                cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(theDay)
                                                cy.get('#select2-dayofweek_val-results > :nth-child(1)').click({
                                                    force: true
                                                })
    
                                                cy.wait(1000)
    
    
    
    
                                                cy.get('#save-visit').click({
                                                    force: true
                                                })
                                                cy.get('#proceed-anyway-conflicts').click({
                                                    force: true
                                                })
    
    
    
    
                                                cy.get('.toast-message').each(($toast) => {
    
                                                    const toastText = $toast.text()
                                                    const toastFirst = toastText.split(' ')
                                                    if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
                                                        cy.reload()
    
                                                        const arrayeAppo = appointments.text().split('#')
                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                        cy.log(arrayeAppoLast)
    
    
                                                        cy.log(arrayeAppo)
                                                        cy.get('#appt-search').clear().type(appointmentNumber)
    
                                                        function untilDateFilter(last) {
                                                            var endMounthFormarray = last.split('/')
                                                            const year = endMounthFormarray[2] + 1
                                                            var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                            if (endMounthFormMounth < 10) {
                                                                var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                                var enddateString1 = endDAte1
                                                            } else if (endMounthFormMounth > 12) {
    
    
                                                                var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                                var enddateString1 = endDAte1
                                                            } else {
                                                                var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                                var enddateString1 = endDAte1
                                                            }
    
                                                            return enddateString1
    
                                                        }
    
                                                        cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                            force: true
                                                        })
    
    
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })
                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                            var fullText = text1;
                                                            var pattern = /[0-9]+/g;
                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                            cy.get('#appt-search').clear()
                                                            cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                            cy.log(assignmentNumber)
                                                        })
                                                        cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('have.attr','href').and('contain', currentDayOfWeek)
                                                    } else if (toastFirst[0] == "Invalid") {
                                                        cy.reload()
    
                                                        const arrayeAppo = appointments.text().split('#')
                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                        cy.log(arrayeAppoLast)
    
    
                                                        cy.log(arrayeAppo)
                                                        cy.get('#appt-search').clear().type(appointmentNumber)
    
                                                        function untilDateFilter(last) {
                                                            var endMounthFormarray = last.split('/')
                                                            const year = endMounthFormarray[2] + 1
                                                            var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                            if (endMounthFormMounth < 10) {
                                                                var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                                var enddateString1 = endDAte1
                                                            } else if (endMounthFormMounth > 12) {
    
    
                                                                var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                                var enddateString1 = endDAte1
                                                            } else {
                                                                var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                                var enddateString1 = endDAte1
                                                            }
    
                                                            return enddateString1
    
                                                        }
    
                                                        cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                            force: true
                                                        })
    
    
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })
                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                            var fullText = text1;
                                                            var pattern = /[0-9]+/g;
                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                            cy.get('#appt-search').clear()
                                                            cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                            cy.log(assignmentNumber)
                                                        })
                                                        cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('have.attr','href').and('contain', currentDayOfWeek)
    
                                                    } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                        cy.reload()
    
                                                        const arrayeAppo = appointments.text().split('#')
                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                        cy.log(arrayeAppoLast)
    
    
                                                        cy.log(arrayeAppo)
                                                        cy.get('#appt-search').clear().type(appointmentNumber)
    
                                                        function untilDateFilter(last) {
                                                            var endMounthFormarray = last.split('/')
                                                            const year = endMounthFormarray[2] + 1
                                                            var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                            if (endMounthFormMounth < 10) {
                                                                var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                                var enddateString1 = endDAte1
                                                            } else if (endMounthFormMounth > 12) {
    
    
                                                                var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                                var enddateString1 = endDAte1
                                                            } else {
                                                                var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                                var enddateString1 = endDAte1
                                                            }
    
                                                            return enddateString1
    
                                                        }
    
                                                        cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                            force: true
                                                        })
    
    
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })
                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                            var fullText = text1;
                                                            var pattern = /[0-9]+/g;
                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                            cy.get('#appt-search').clear()
                                                            cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                            cy.log(assignmentNumber)
                                                        })
                                                        cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('have.attr','href').and('contain', currentDayOfWeek)
                                                    } else if (toastFirst[0] == "Successfully") {
                                                        cy.reload()
    
                                                        const arrayeAppo = appointments.text().split('#')
                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                        cy.log(arrayeAppoLast)
    
    
                                                        cy.log(arrayeAppo)
                                                        cy.get('#appt-search').clear().type(appointmentNumber)
    
                                                        function untilDateFilter(last) {
                                                            var endMounthFormarray = last.split('/')
                                                            const year = endMounthFormarray[2] + 1
                                                            var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                            if (endMounthFormMounth < 10) {
                                                                var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                                var enddateString1 = endDAte1
                                                            } else if (endMounthFormMounth > 12) {
    
    
                                                                var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                                var enddateString1 = endDAte1
                                                            } else {
                                                                var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                                var enddateString1 = endDAte1
                                                            }
    
                                                            return enddateString1
    
                                                        }
    
                                                        cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                            force: true
                                                        })
    
    
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })
                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                            var fullText = text1;
                                                            var pattern = /[0-9]+/g;
                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                            cy.get('#appt-search').clear()
                                                            cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                            cy.log(assignmentNumber)
                                                        })
                                                        cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', theDay)
                                                    }
    
                                                })
    
                                            })
    
    
    
    
                                        })
    
    
    
    
                                    })
    
    
                                })
    
    
                            })
                        })
                       




                    } else {


                        cy.reload()

                        
                            cy.wait(3000)
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .btn').invoke('text').then((text) => {
                                var fullText = text;
                                var pattern = /[0-9]+/g;
                                var appointmentNumber = fullText.match(pattern).toString();
                                cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > strong > small').invoke('text').then((smalltext) => {
                                    var fullTextSmll = smalltext;
                                    var pattern = /[0-9]+/g;
                                    var asignmentNumber = fullTextSmll.match(pattern).toString();
                                    cy.log(asignmentNumber)
                                    cy.get('#appt-assignment_id').type(asignmentNumber, {
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
                                            var year = parseInt(start1[2]) - 1
                                            cy.log(start1)
                                            var startmounth1 = parseInt(start1[0]) - 1
                                            if (startmounth1 < 10) {
                                                var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                var startdateString1 = startdate1.toString()
    
                                            } else if (startmounth1 <= 0) {
    
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
                                            var endMounth = parseInt(end[0]) + 3
                                            var year = parseInt(end[2]) + 1
                                            if (endMounth < 10) {
                                                var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                var enddateString = endDAte
                                            } else if (endMounth > 12) {
    
                                                var endDAte = '01/' + end[1] + '/' + year
                                                var enddateString = endDAte
                                            } else {
                                                var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                var enddateString = endDAte
    
                                            }
    
                                            return enddateString
    
                                        }
                                        cy.log(endDate(last))
                                        cy.get('#appt-filter-date').clear({
                                            force: true
                                        }).type(startDate(first) + ' - ' + endDate(last), {
                                            force: true
                                        })
                                        cy.contains('Apply').click({
                                            force: true
                                        })
                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
    
    
                                        cy.get('tbody > tr > :nth-child(2) > .btn').each(($appointment) => {
    
                                            var text = $appointment.text()
                                            var pattern = /[0-9]+/g;
                                            var asignmentNumber = text.match(pattern);
    
                                            var appointments = []
                                            appointments.push(asignmentNumber)
                                            cy.log(appointments)
    
    
                                        }).then((appointments) => {
                                            cy.log(appointments.text())
                                            cy.wait(2000)
                                            cy.get('input[value="Reset"]').first().click({
                                                force: true
                                            })
                                            cy.get('#appt-search').type(appointmentNumber)
    
                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                            
                        cy.get('tbody > :nth-child(1) > :nth-child(7)').invoke('text').then((currentDayOfWeek)=>{
                                            cy.get('.editable-click').click()
                                            cy.wait(3000)
                                            cy.get('#selecteduntil').click()
    
                                            function untilDate(last) {
                                                var endMounthFormarray = last.split('/')
                                                var year = parseInt(endMounthFormarray[2]) + 1
                                                var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 2
                                                if (endMounthFormMounth < 10) {
                                                    var endDAte1 = endMounthFormarray[2] + '-0' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                    var enddateString1 = endDAte1
                                                } else if (endMounthFormMounth > 12) {
    
    
                                                    var endDAte1 = year + '-01-' + endMounthFormarray[1]
                                                    var enddateString1 = endDAte1
                                                } else {
                                                    var endDAte1 = endMounthFormarray[2] + '-' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                    var enddateString1 = endDAte1
                                                }
    
                                                return enddateString1
    
                                            }
                                            cy.get('#change_until').type(untilDate(last))
    
                                            cy.get('#select2-dayofweek_val-container').then((value) => {
                                                const currenDuration = value.text()
    
                                                cy.get('#select2-dayofweek_val-container').click({
                                                    force: true
                                                })
    
                                                const week = ['Wed', 'Mon', 'Tue', 'Fri', 'Sun', 'Thu', 'Sat']
                                                var theDay = week[Math.floor(Math.random() * week.length)];
                                                cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(theDay)
                                                cy.get('#select2-dayofweek_val-results > :nth-child(1)').click({
                                                    force: true
                                                })
    
                                                cy.wait(1000)
    
    
    
    
                                                cy.get('#save-visit').click({
                                                    force: true
                                                })
                                                cy.get('#select-aides-from-circle').click({
                                                    force: true
                                                })
    
    
    
                                                cy.get('.toast-message').each(($toast) => {
    
                                                    const toastText = $toast.text()
                                                    const toastFirst = toastText.split(' ')
                                                    if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
                                                        cy.reload()
    
                                                        const arrayeAppo = appointments.text().split('#')
                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                        cy.log(arrayeAppoLast)
    
    
                                                        cy.log(arrayeAppo)
                                                        cy.get('#appt-search').clear().type(appointmentNumber)
    
                                                        function untilDateFilter(last) {
                                                            var endMounthFormarray = last.split('/')
                                                            const year = endMounthFormarray[2] + 1
                                                            var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                            if (endMounthFormMounth < 10) {
                                                                var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                                var enddateString1 = endDAte1
                                                            } else if (endMounthFormMounth > 12) {
    
    
                                                                var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                                var enddateString1 = endDAte1
                                                            } else {
                                                                var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                                var enddateString1 = endDAte1
                                                            }
    
                                                            return enddateString1
    
                                                        }
    
                                                        cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                            force: true
                                                        })
    
    
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })
                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                            var fullText = text1;
                                                            var pattern = /[0-9]+/g;
                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                            cy.get('#appt-search').clear()
                                                            cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                            cy.log(assignmentNumber)
                                                        })
                                                        cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currenDuration)
                                                    } else if (toastFirst[0] == "Invalid") {
                                                        cy.reload()
    
                                                        const arrayeAppo = appointments.text().split('#')
                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                        cy.log(arrayeAppoLast)
    
    
                                                        cy.log(arrayeAppo)
                                                        cy.get('#appt-search').clear().type(appointmentNumber)
    
                                                        function untilDateFilter(last) {
                                                            var endMounthFormarray = last.split('/')
                                                            const year = endMounthFormarray[2] + 1
                                                            var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                            if (endMounthFormMounth < 10) {
                                                                var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                                var enddateString1 = endDAte1
                                                            } else if (endMounthFormMounth > 12) {
    
    
                                                                var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                                var enddateString1 = endDAte1
                                                            } else {
                                                                var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                                var enddateString1 = endDAte1
                                                            }
    
                                                            return enddateString1
    
                                                        }
    
                                                        cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                            force: true
                                                        })
    
    
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })
                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                            var fullText = text1;
                                                            var pattern = /[0-9]+/g;
                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                            cy.get('#appt-search').clear()
                                                            cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                            cy.log(assignmentNumber)
                                                        })
                                                        cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDayOfWeek)
    
                                                    } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                        cy.reload()
    
                                                        const arrayeAppo = appointments.text().split('#')
                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                        cy.log(arrayeAppoLast)
    
    
                                                        cy.log(arrayeAppo)
                                                        cy.get('#appt-search').clear().type(appointmentNumber)
    
                                                        function untilDateFilter(last) {
                                                            var endMounthFormarray = last.split('/')
                                                            const year = endMounthFormarray[2] + 1
                                                            var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                            if (endMounthFormMounth < 10) {
                                                                var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                                var enddateString1 = endDAte1
                                                            } else if (endMounthFormMounth > 12) {
    
    
                                                                var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                                var enddateString1 = endDAte1
                                                            } else {
                                                                var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                                var enddateString1 = endDAte1
                                                            }
    
                                                            return enddateString1
    
                                                        }
    
                                                        cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                            force: true
                                                        })
    
    
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })
                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                            var fullText = text1;
                                                            var pattern = /[0-9]+/g;
                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                            cy.get('#appt-search').clear()
                                                            cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                            cy.log(assignmentNumber)
                                                        })
                                                        cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDayOfWeek)
                                                    } else if (toastFirst[0] == "Successfully") {
                                                        cy.reload()
    
                                                        const arrayeAppo = appointments.text().split('#')
                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                        cy.log(arrayeAppoLast)
    
    
                                                        cy.log(arrayeAppo)
                                                        cy.get('#appt-search').clear().type(appointmentNumber)
    
                                                        function untilDateFilter(last) {
                                                            var endMounthFormarray = last.split('/')
                                                            const year = endMounthFormarray[2] + 1
                                                            var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 3
                                                            if (endMounthFormMounth < 10) {
                                                                var endDAte1 = '0' + endMounthFormMounth + '/' + endMounthFormarray[1] + '/' + endMounthFormarray[2]
                                                                var enddateString1 = endDAte1
                                                            } else if (endMounthFormMounth > 12) {
    
    
                                                                var endDAte1 = '01/' + endMounthFormarray[1] + '/' + year
                                                                var enddateString1 = endDAte1
                                                            } else {
                                                                var endDAte1 = endMounthFormarray[2] + '/' + endMounthFormMounth + '/' + endMounthFormarray[1]
                                                                var enddateString1 = endDAte1
                                                            }
    
                                                            return enddateString1
    
                                                        }
    
                                                        cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + untilDateFilter(last), {
                                                            force: true
                                                        })
    
    
                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                            force: true
                                                        })
                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                            var fullText = text1;
                                                            var pattern = /[0-9]+/g;
                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                            cy.get('#appt-search').clear()
                                                            cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                            cy.log(assignmentNumber)
                                                        })
                                                        cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', theDay)
                                                    }
    
                                                })
    
                                            })
    
    
    
    
                                        })
    
    
    
    
                                    })
    
    
                                })
    
    
                            })
                        })


                      




                    } 
                })



            }


            validRow()



        })


    })

    //done
    it('change All -until certain date - connected-testing.com:90', function() {

        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        }).then(() => {
    
    
            const validRow = () => {
    
    
                const numbers = [1]
    
                function addNumber(numbers) {
                    let arr1 = [];
                    for (let i = 1; i <= 70; i++) {
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
                cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                cy.wait(2000)
                cy.get('tbody > :nth-child( ' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                    cy.log(aidcurrentname)
                    var newwcurrentname = aidcurrentname.split(' ')
                    cy.log(newwcurrentname[0])
                    if (newwcurrentname[0] != "Open") {
    
                        cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide)=>{
                            const currentHref = currentAide.attr('href')
                            cy.wait(2000)
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                        
                            cy.wait(3000)
                            if (cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)')) {
                                cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {
        
                                    if ($recomanded.children().length > 0) {
        
                                                cy.reload()
                                                cy.wait(3000)
                                                cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .btn').invoke('text').then((text) => {
                                                    var fullText = text;
                                                    var pattern = /[0-9]+/g;
                                                    var appointmentNumber = fullText.match(pattern).toString();
                                                    cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > strong > small').invoke('text').then((smalltext) => {
                                                        var fullTextSmll = smalltext;
                                                        var pattern = /[0-9]+/g;
                                                        var asignmentNumber = fullTextSmll.match(pattern).toString();
                                                        cy.log(asignmentNumber)
                                                        cy.get('#appt-assignment_id').type(asignmentNumber, {
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
                                                                var year = parseInt(start1[2]) - 1
                                                                cy.log(start1)
                                                                var startmounth1 = parseInt(start1[0]) - 1
                                                                if (startmounth1 < 10) {
                                                                    var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                    var startdateString1 = startdate1.toString()
        
                                                                } else if (startmounth1 <= 0) {
        
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
                                                                var endMounth = parseInt(end[0]) + 3
                                                                var year = parseInt(end[2]) + 1
                                                                if (endMounth < 10) {
                                                                    var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                    var enddateString = endDAte
                                                                } else if (endMounth > 12) {
        
                                                                    var endDAte = '01/' + end[1] + '/' + year
                                                                    var enddateString = endDAte
                                                                } else {
                                                                    var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                    var enddateString = endDAte
        
                                                                }
        
                                                                return enddateString
        
                                                            }
                                                            cy.log(endDate(last))
                                                            cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                force: true
                                                            })
                                                            cy.contains('Apply').click({force:true})
                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
        
        
                                                            cy.get('tbody > tr > :nth-child(2) > .btn').each(($appointment) => {
        
                                                                var text = $appointment.text()
                                                                var pattern = /[0-9]+/g;
                                                                var asignmentNumber = text.match(pattern);
        
                                                                var appointments = []
                                                                appointments.push(asignmentNumber)
                                                                cy.log(appointments)
        
        
                                                            }).then((appointments) => {
                                                                cy.log(appointments.text())
                                                                cy.wait(2000)
                                                                cy.get('input[value="Reset"]').first().click({
                                                                    force: true
                                                                })
                                                                cy.get('#appt-search').type(appointmentNumber)
        
                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                cy.get('.editable-click').click()
                                                                cy.wait(3000)
                                                                cy.get('#selecteduntil').click()
        
                                                                function untilDate(last) {
                                                                    var endMounthFormarray = last.split('/')
                                                                    var year = parseInt(endMounthFormarray[2]) + 1
                                                                    var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 2
                                                                    if (endMounthFormMounth < 10) {
                                                                        var endDAte1 = endMounthFormarray[2] + '-0' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    } else if (endMounthFormMounth > 12) {
        
        
                                                                        var endDAte1 = year + '-01-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    } else {
                                                                        var endDAte1 = endMounthFormarray[2] + '-' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    }
        
                                                                    return enddateString1
        
                                                                }
        
        
                                                                cy.get('#change_until').type(untilDate(last))
                                                                var randomAid = Math.floor(Math.random() * 11);
        
        
                                                                function randomeaid(randomAid) {
        
                                                                    if (randomAid == 0) {
                                                                        randomAid = 1
                                                                        return randomAid
                                                                    }
                                                                    return randomAid
                                                                }
                                                                cy.wait(5000)
                                                                cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                                    var aidId = $aid.attr("href");
        
                                                                    var aidName = $aid.text()
        
                                                                    cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > .radio > .cb-wrapper > .checked').click({
                                                                        force: true
                                                                    })
                                                                    cy.get('#select2-dayofweek_val-container').then((value) => {
                                                                        const currenDuration = value.attr('value')
                            
                                                                        cy.get('#select2-dayofweek_val-container').click({
                                                                            force: true
                                                                        })
                            
                                                                        const week = ['Wed', 'Mon', 'Tue', 'Fri', 'Sun', 'Thu', 'Sat']
                                                                        var theDay = week[Math.floor(Math.random() * week.length)];
                                                                        cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(theDay)
                                                                        cy.get('#select2-dayofweek_val-results > :nth-child(1)').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('#visit_duration').then((value) => {
                                                                            const currenDuration = value.attr('value')
                                                                            var randomAid = Math.floor(Math.random() * 11);
                                
                                                                            var randomDuration = Math.floor(Math.random() * 7);
                                
                                                                            function randome(randomDuration) {
                                
                                                                                if (randomDuration == 0) {
                                                                                    randomDuration = 1
                                                                                    return randomDuration
                                                                                }
                                                                                return randomDuration
                                                                            }
                                
                                
                                                                            cy.get('#visit_duration').clear({
                                                                                force: true
                                                                            }).type(randome(randomDuration) + .00)
                                                                            cy.get('#save-visit').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('#proceed-anyway-conflicts').click({
                                                                                force: true
                                                                            })
            
            
            
            
                                                                            cy.get('.toast-message').each(($toast) => {
                                                                                
                                                                                const toastText =$toast.text()
                                                                               const toastFirst = toastText.split(' ')
                                                                                if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
                                                                                    cy.reload()
            
                                                                                    const arrayeAppo = appointments.text().split('#')
                                                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                                                    cy.log(arrayeAppoLast)
            
            
                                                                                    cy.log(arrayeAppo)
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-search').clear().type(appointmentNumber)
            
            
            
            
                                                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                        force: true
                                                                                    })
            
            
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                                        var fullText = text1;
                                                                                        var pattern = /[0-9]+/g;
                                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                                        cy.get('#appt-search').clear()
                                                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                        cy.log(assignmentNumber)
                                                                                    })
            
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
            
            
                                                                                    }).should('have.attr', 'href').and('contain', currentHref)
                                                                                }else if(toastFirst[0] == "Invalid") {
                                                                                    cy.reload()
            
                                                                                    const arrayeAppo = appointments.text().split('#')
                                                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                                                    cy.log(arrayeAppoLast)
            
            
                                                                                    cy.log(arrayeAppo)
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-search').clear().type(appointmentNumber)
            
            
            
            
                                                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                        force: true
                                                                                    })
            
            
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                                        var fullText = text1;
                                                                                        var pattern = /[0-9]+/g;
                                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                                        cy.get('#appt-search').clear()
                                                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                        cy.log(assignmentNumber)
                                                                                    })
            
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
            
            
                                                                                    }).should('have.attr', 'href').and('contain', currentHref)
                                                                                    
                                                                                }else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                                    cy.reload()
            
                                                                                    const arrayeAppo = appointments.text().split('#')
                                                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                                                    cy.log(arrayeAppoLast)
            
            
                                                                                    cy.log(arrayeAppo)
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-search').clear().type(appointmentNumber)
            
            
            
            
                                                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                        force: true
                                                                                    })
            
            
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                                        var fullText = text1;
                                                                                        var pattern = /[0-9]+/g;
                                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                                        cy.get('#appt-search').clear()
                                                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                        cy.log(assignmentNumber)
                                                                                    })
            
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
            
            
                                                                                    }).should('have.attr', 'href').and('contain', currentHref)
                                                                                } else if(toastFirst[0] == "Successfully") {
                                                                                    cy.reload()
            
                                                                                    const arrayeAppo = appointments.text().split('#')
                                                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                                                    cy.log(arrayeAppoLast)
            
            
                                                                                    cy.log(arrayeAppo)
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-search').clear().type(appointmentNumber)
            
            
            
            
                                                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                        force: true
                                                                                    })
            
            
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                                        var fullText = text1;
                                                                                        var pattern = /[0-9]+/g;
                                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                                        cy.get('#appt-search').clear()
                                                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                        cy.log(assignmentNumber)
                                                                                    })
            
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
            
            
                                                                                    }).should('have.attr', 'href').and('contain',aidId)
                                                                                    cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', theDay)
                                                                                    cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                                                    }).should('contain', randome(randomDuration) + .00)
                                                                                }
            
                                                                            })


                                                                        })
                                                                      
                                                                    

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
                                        validRow()
                                    }
        
        
                                })
                            } else {
                                cy.wait(100)
                                cy.reload()
                                validRow()
                            }
                        })
                       
    
    
    
                    } else {
    
                        cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentAide)=>{
                            const currentHref = currentAide.attr('href')
                            cy.wait(2000)
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                force: true
                            })
                        
                            cy.wait(3000)
                            if (cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)')) {
                                cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {
        
                                    if ($recomanded.children().length > 0) {
        
                                                cy.reload()
                                                cy.wait(3000)
                                                cy.get('tbody > :nth-child('+ randomeEl(randomElement)+') > :nth-child(7)').then((currentDate)=>{
                                                   const currentDayOfWeek = currentDate.text()
                                                   cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .btn').invoke('text').then((text) => {
                                                    var fullText = text;
                                                    var pattern = /[0-9]+/g;
                                                    var appointmentNumber = fullText.match(pattern).toString();
                                                    cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > strong > small').invoke('text').then((smalltext) => {
                                                        var fullTextSmll = smalltext;
                                                        var pattern = /[0-9]+/g;
                                                        var asignmentNumber = fullTextSmll.match(pattern).toString();
                                                        cy.log(asignmentNumber)
                                                        cy.get('#appt-assignment_id').type(asignmentNumber, {
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
                                                                var year = parseInt(start1[2]) - 1
                                                                cy.log(start1)
                                                                var startmounth1 = parseInt(start1[0]) - 1
                                                                if (startmounth1 < 10) {
                                                                    var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
                                                                    var startdateString1 = startdate1.toString()
        
                                                                } else if (startmounth1 <= 0) {
        
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
                                                                var endMounth = parseInt(end[0]) + 3
                                                                var year = parseInt(end[2]) + 1
                                                                if (endMounth < 10) {
                                                                    var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                    var enddateString = endDAte
                                                                } else if (endMounth > 12) {
        
                                                                    var endDAte = '01/' + end[1] + '/' + year
                                                                    var enddateString = endDAte
                                                                } else {
                                                                    var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                    var enddateString = endDAte
        
                                                                }
        
                                                                return enddateString
        
                                                            }
                                                            cy.log(endDate(last))
                                                            cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                force: true
                                                            })
                                                            cy.contains('Apply').click({force:true})
                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
        
        
                                                            cy.get('tbody > tr > :nth-child(2) > .btn').each(($appointment) => {
        
                                                                var text = $appointment.text()
                                                                var pattern = /[0-9]+/g;
                                                                var asignmentNumber = text.match(pattern);
        
                                                                var appointments = []
                                                                appointments.push(asignmentNumber)
                                                                cy.log(appointments)
        
        
                                                            }).then((appointments) => {
                                                                cy.wait(2000)
                cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                                                                cy.get('#appt-search').type(appointmentNumber)
        
                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                cy.get('.editable-click').click()
                                                                cy.wait(3000)
                                                                cy.get('#selecteduntil').click()
        
                                                                function untilDate(last) {
                                                                    var endMounthFormarray = last.split('/')
                                                                    var year = parseInt(endMounthFormarray[2]) + 1
                                                                    var endMounthFormMounth = parseInt(endMounthFormarray[0]) + 2
                                                                    if (endMounthFormMounth < 10) {
                                                                        var endDAte1 = endMounthFormarray[2] + '-0' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    } else if (endMounthFormMounth > 12) {
        
        
                                                                        var endDAte1 = year + '-01-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    } else {
                                                                        var endDAte1 = endMounthFormarray[2] + '-' + endMounthFormMounth + '-' + endMounthFormarray[1]
                                                                        var enddateString1 = endDAte1
                                                                    }
        
                                                                    return enddateString1
        
                                                                }
        
        
                                                                cy.get('#change_until').type(untilDate(last))
                                                                var randomAid = Math.floor(Math.random() * 11);
        
        
                                                                function randomeaid(randomAid) {
        
                                                                    if (randomAid == 0) {
                                                                        randomAid = 1
                                                                        return randomAid
                                                                    }
                                                                    return randomAid
                                                                }
                                                                cy.wait(5000)
                                                                cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                                    var aidId = $aid.attr("href");
        
                                                                    var aidName = $aid.text()
        
                                                                    cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > .radio > .cb-wrapper > .checked').click({
                                                                        force: true
                                                                    })
                                                                    cy.get('#select2-dayofweek_val-container').then(() => {
                                                                   
                            
                                                                        cy.get('#select2-dayofweek_val-container').click({
                                                                            force: true
                                                                        })
                            
                                                                        const week = ['Wed', 'Mon', 'Tue', 'Fri', 'Sun', 'Thu', 'Sat']
                                                                        var theDay = week[Math.floor(Math.random() * week.length)];
                                                                        cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(theDay)
                                                                        cy.get('#select2-dayofweek_val-results > :nth-child(1)').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('#visit_duration').then((value) => {
                                                                            const currenDuration = value.attr('value')
                                                                            var randomAid = Math.floor(Math.random() * 11);
                                
                                                                            var randomDuration = Math.floor(Math.random() * 7);
                                
                                                                            function randome(randomDuration) {
                                
                                                                                if (randomDuration == 0) {
                                                                                    randomDuration = 1
                                                                                    return randomDuration
                                                                                }
                                                                                return randomDuration
                                                                            }
                                
                                
                                                                            cy.get('#visit_duration').clear({
                                                                                force: true
                                                                            }).type(randome(randomDuration) + .00)
                                                                            cy.get('#save-visit').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('#select-aides-from-circle').click({
                                                                                force: true
                                                                            })
                                
            
            
            
            
                                                                            cy.get('.toast-message').each(($toast) => {
                                                                                
                                                                                const toastText =$toast.text()
                                                                               const toastFirst = toastText.split(' ')
                                                                                if ($toast.text() == "The Selected Appointments are not Editable since they have business activity ") {
                                                                                    cy.reload()
            
                                                                                    const arrayeAppo = appointments.text().split('#')
                                                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                                                    cy.log(arrayeAppoLast)
            
            
                                                                                    cy.log(arrayeAppo)
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-search').clear().type(appointmentNumber)
            
            
            
            
                                                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                        force: true
                                                                                    })
            
            
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                                        var fullText = text1;
                                                                                        var pattern = /[0-9]+/g;
                                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                                        cy.get('#appt-search').clear()
                                                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                        cy.log(assignmentNumber)
                                                                                    })
            
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
            
            
                                                                                    }).should('have.attr', 'href').and('contain', currentHref)
                                                                                    cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDayOfWeek)
                                                                                    cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                                                    }).should('contain', currenDuration)
                                                                                }else if(toastFirst[0] == "Invalid") {
                                                                                    cy.reload()
            
                                                                                    const arrayeAppo = appointments.text().split('#')
                                                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                                                    cy.log(arrayeAppoLast)
            
            
                                                                                    cy.log(arrayeAppo)
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-search').clear().type(appointmentNumber)
            
            
            
            
                                                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                        force: true
                                                                                    })
            
            
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                                        var fullText = text1;
                                                                                        var pattern = /[0-9]+/g;
                                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                                        cy.get('#appt-search').clear()
                                                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                        cy.log(assignmentNumber)
                                                                                    })
            
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
            
            
                                                                                    }).should('have.attr', 'href').and('contain', currentHref)
                                                                                    cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDayOfWeek)
                                                                                    cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                                                    }).should('contain', currenDuration)
                                                                                    
                                                                                }else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                                    cy.reload()
            
                                                                                    const arrayeAppo = appointments.text().split('#')
                                                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                                                    cy.log(arrayeAppoLast)
            
            
                                                                                    cy.log(arrayeAppo)
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-search').clear().type(appointmentNumber)
            
            
            
            
                                                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                        force: true
                                                                                    })
            
            
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                                        var fullText = text1;
                                                                                        var pattern = /[0-9]+/g;
                                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                                        cy.get('#appt-search').clear()
                                                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                        cy.log(assignmentNumber)
                                                                                    })
            
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
            
            
                                                                                    }).should('have.attr', 'href').and('contain', currentHref)
                                                                                    cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDayOfWeek)
                                                                                    cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                                                    }).should('contain', currenDuration)
                                                                                } else if(toastFirst[0] == "Successfully") {
                                                                                    cy.reload()
            
                                                                                    const arrayeAppo = appointments.text().split('#')
                                                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                                                    cy.log(arrayeAppoLast)
            
            
                                                                                    cy.log(arrayeAppo)
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-search').clear().type(appointmentNumber)
            
            
            
            
                                                                                    cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                                                                                        force: true
                                                                                    })
            
            
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                                        var fullText = text1;
                                                                                        var pattern = /[0-9]+/g;
                                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                                        cy.get('#appt-search').clear()
                                                                                        cy.get('#appt-assignment_id').clear().type(assignmentNumber)
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                        cy.log(assignmentNumber)
                                                                                    })
            
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
            
            
                                                                                    }).should('have.attr', 'href').and('contain',aidId)
                                                                                    cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', theDay)
                                                                                    cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                                                    }).should('contain', randome(randomDuration) + .00)
                                                                                }
            
                                                                            })


                                                                        })
                                                                      
                                                                    

                                                                    })
                                                                  
        
        
        
        
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
                                        validRow()
                                    }
        
        
                                })
                            } else {
                                cy.wait(100)
                                cy.reload()
                                validRow()
                            }
                        })
                       
    
    
    
                    } 
                })
    
    
    
            }
    
    
            validRow()
    
    
    
        })
    
    
    })
})