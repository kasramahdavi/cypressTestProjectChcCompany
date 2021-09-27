const {
    forEach,
    head
} = require("lodash")

///<reference types = "Cypress" />

describe('log in and edit appointment From Selected Week Forward  ', function() {
    beforeEach("viewport", function() {
        cy.viewport(1280, 720)
        cy.visit(Cypress.env('baseUrl'), { log: false })



        cy.get('#email').type(Cypress.env('username'))
        cy.get('#password').type(Cypress.env('password') ,{ log: false })
        cy.get('.btn').click()
        Cypress.on('uncaught:exception', (err, runnable) => {

            return false
        });
    })
  
     
   //done
   it('change Date - From Selected Week Forward - connected-testing.com:90', function() {

    cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
    cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
        force: true
    }).then(() => {


        const validRow = () => {


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
            cy.wait(5000)
             cy.get('input[value="Reset"]').first().click({
                force: true
            })
            cy.get('#appt-filter-date').click({
                force: true
            }).then(($dates) => {
                var datestext = $dates.attr('value')
                var dateArray = datestext.split(' - ')
                cy.log(dateArray)
                const first = dateArray[0]
                const last = dateArray[1]
                cy.wait(3000)
                cy.contains('Custom Range').click({
                    force: true
                })
                cy.get('.left > .calendar-table > .table-condensed > tbody > :nth-child(4) > .available').then(() => {

                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.in-range').last().then((data) => {

                        const title = data.attr('data-title')
                        const splitedTitle = Array.from(title)
                        cy.log(splitedTitle)
                        cy.log()
                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                            force: true
                        })
                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                            force: true
                        })

                        cy.contains('Apply').click({
                            force: true
                        })
                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                            force: true
                        })

                        //***may be usefull in future***

                        // function StartPoint(splitedTitle) {
                        //     var startDayRow = splitedTitle[1]
                        //     var startday = parseInt(splitedTitle[3]) + 1
                        //     if (startday >= 6) {
                        //         var startday = 1
                        //         var startRow = parseInt(startDayRow) + 1
                        //         var startDate = splitedTitle[0] + startRow + splitedTitle[2] + startday
                        //         return startDate
                        //     } else if (startDayRow >= 5) {

                        //         cy.get('.left > .calendar-table > .table-condensed > thead > :nth-child(1) > .next > .fa').click()

                        //         var startDate = splitedTitle[0] + 0 + splitedTitle[2] + startday

                        //         return startDate

                        //     } else {

                        //         var startDate = splitedTitle[0] + startRow + splitedTitle[2] + startday
                        //         return startDate
                        //     }



                        // }


                        cy.get('#appt-filter-date').then((filterdate) => {

                            const dateValue = filterdate.attr('value')
                            cy.log(dateValue)
                            cy.wait(3000)
                            cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then(() => {


                                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                                    cy.log(aidcurrentname)
                                    var newwcurrentname = aidcurrentname.split(' ')
                                    cy.log(newwcurrentname[0])
                                    if (newwcurrentname[0] == "Open"){

                                        cy.reload()
                                        //here
                                        cy.wait(3000)


                                        cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentId) => {
                                            const currentAide = currentId.attr('href')
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
                                                            cy.log(start1)
                                                            var year = parseInt(start1[2]) - 1
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
                                                            var year = parseInt(end[2]) + 1
                                                            var endMounth = parseInt(end[0]) + 4
                                                            if (endMounth < 10) {
                                                                var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            } else if (endMounth > 12) {

                                                                var endDAte = '04/' + end[1] + '/' + year
                                                                var enddateString = endDAte
                                                            } else {
                                                                var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            }

                                                            return enddateString

                                                        }
                                                        cy.log(endDate(last))
                                                        cy.get('#appt-filter-date').click({
                                                            force: true
                                                        })
                                                        cy.contains('Custom Range').click({
                                                            force: true
                                                        })
                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {



                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                force: true
                                                            })
                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                                                force: true
                                                            })




                                                            cy.contains('Apply').click({
                                                                force: true
                                                            })


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
                                                             cy.get('input[value="Reset"]').first().click({
                                                                force: true
                                                            })
                                                            cy.get('#appt-search').type(appointmentNumber)

                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()

                                                            cy.get('tbody > :nth-child(1) > :nth-child(7)').invoke('text').then((currentDate) => {

                                                                cy.get(':nth-child(1) > :nth-child(2) > .editable-click').click({
                                                                    force: true
                                                                })
                                                                cy.wait(500)
                                                                cy.get(':nth-child(3) > .radio-inline > input').click()



                                                                cy.get('#select2-dayofweek_val-container').click({
                                                                    force: true
                                                                })

                                                                const week = ['Wed', 'Mon', 'Tue', 'Fri', 'Sun', 'Thu', 'Sat']
                                                                var day = week[Math.floor(Math.random() * week.length)];
                                                                cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(day)
                                                                cy.get('#select2-dayofweek_val-results > :nth-child(1)').click({
                                                                    force: true
                                                                })




                                                                cy.get('#save-visit').click({
                                                                    force: true
                                                                })
                                                                cy.get('#select-aides-from-circle').click({
                                                                    force: true
                                                                })
                                                                cy.get(':nth-child(4) > #cancel-conflicts').click({
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
                                                                        cy.get('#appt-search').clear({
                                                                            force: true
                                                                        }).type(appointmentNumber)
                                                                        cy.log()
                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                            var fullText = text1;
                                                                            var pattern = /[0-9]+/g;
                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-assignment_id').clear({
                                                                                force: true
                                                                            }).type(assignmentNumber)

                                                                            cy.get('#appt-search').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-filter-date').click({
                                                                                force: true
                                                                            })

                                                                            cy.contains('Custom Range').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').then((value) => {
                                                                                    const FirstDayTilte = value.attr('data-title')
                                                                                    const FirstDayTitleArray = FirstDayTilte.split('')
                                                                                    FirstDayTitleArray[3] = 0('.left > .calendar-table > .table-condensed > tbody > tr >[data-title="' + FirstDayTitleArray[0] + FirstDayTitleArray[1] + FirstDayTitleArray[2] + FirstDayTitleArray[3] + '"]').click({
                                                                                        force: true
                                                                                    })

                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                    force: true
                                                                                })
                                                                                cy.contains('Apply').click({
                                                                                    force: true
                                                                                })



                                                                            })
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                            cy.log(assignmentNumber)
                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDate)



                                                                        })
                                                                    } else if (toastFirst[0] == "Invalid") {
                                                                        cy.reload()

                                                                        const arrayeAppo = appointments.text().split('#')
                                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                                        cy.log(arrayeAppoLast)




                                                                        cy.log(arrayeAppo)
                                                                        cy.get('#appt-assignment_id').clear({
                                                                            force: true
                                                                        })
                                                                        cy.get('#appt-search').clear({
                                                                            force: true
                                                                        }).type(appointmentNumber)
                                                                        cy.log()
                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                            var fullText = text1;
                                                                            var pattern = /[0-9]+/g;
                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-assignment_id').clear({
                                                                                force: true
                                                                            }).type(assignmentNumber)

                                                                            cy.get('#appt-search').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-filter-date').click({
                                                                                force: true
                                                                            })

                                                                            cy.contains('Custom Range').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                    force: true
                                                                                })
                                                                                cy.contains('Apply').click({
                                                                                    force: true
                                                                                })



                                                                            })
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                            cy.log(assignmentNumber)
                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDate)



                                                                        })

                                                                    } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                        cy.reload()

                                                                        const arrayeAppo = appointments.text().split('#')
                                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                                        cy.log(arrayeAppoLast)




                                                                        cy.log(arrayeAppo)
                                                                        cy.get('#appt-assignment_id').clear({
                                                                            force: true
                                                                        })
                                                                        cy.get('#appt-search').clear({
                                                                            force: true
                                                                        }).type(appointmentNumber)
                                                                        cy.log()
                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                            var fullText = text1;
                                                                            var pattern = /[0-9]+/g;
                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-assignment_id').clear({
                                                                                force: true
                                                                            }).type(assignmentNumber)

                                                                            cy.get('#appt-search').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-filter-date').click({
                                                                                force: true
                                                                            })

                                                                            cy.contains('Custom Range').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                    force: true
                                                                                })
                                                                                cy.contains('Apply').click({
                                                                                    force: true
                                                                                })



                                                                            })
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                            cy.log(assignmentNumber)
                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDate)



                                                                        })
                                                                    } else if (toastFirst[0] == "Successfully") {
                                                                        cy.reload()
                                                                        
                                                                        cy.get('#appt-search').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('#appt-filter-date').click({
                                                                            force: true
                                                                        })

                                                                        cy.contains('Custom Range').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').then((value) => {
                                                                                const FirstDayTilte = value.attr('data-title')
                                                                                const FirstDayTitleArray = FirstDayTilte.split('')
                                                                                FirstDayTitleArray[3] = 0
                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >[data-title="' + FirstDayTitleArray[0]+'' + FirstDayTitleArray[1] +''+ FirstDayTitleArray[2] +''+ FirstDayTitleArray[3] + '"]').click({
                                                                                    force: true
                                                                                })

                                                                            })
                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                force: true
                                                                            })
                                                                            cy.contains('Apply').click({
                                                                                force: true
                                                                            })



                                                                        })
                                                                        const arrayeAppo = appointments.text().split('#')
                                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                                        cy.log(arrayeAppoLast)



                                                        

                                                                        cy.log(arrayeAppo)
                                                                        cy.get('#appt-assignment_id').clear({
                                                                            force: true
                                                                        })
                                                                        cy.get('#appt-search').clear({
                                                                            force: true
                                                                        }).type(appointmentNumber)
                                                                        cy.log()
                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                            var fullText = text1;
                                                                            var pattern = /[0-9]+/g;
                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-assignment_id').clear({
                                                                                force: true
                                                                            }).type(assignmentNumber)

                                                                            cy.get('#appt-search').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-filter-date').click({
                                                                                force: true
                                                                            })

                                                                            cy.contains('Custom Range').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').then((value) => {
                                                                                    const FirstDayTilte = value.attr('data-title')
                                                                                    const FirstDayTitleArray = FirstDayTilte.split('')
                                                                                    FirstDayTitleArray[3] = 0
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >[data-title="' + FirstDayTitleArray[0]+'' + FirstDayTitleArray[1] +''+ FirstDayTitleArray[2] +''+ FirstDayTitleArray[3] + '"]').click({
                                                                                        force: true
                                                                                    })

                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                    force: true
                                                                                })
                                                                                cy.contains('Apply').click({
                                                                                    force: true
                                                                                })



                                                                            })
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                            cy.log(assignmentNumber)
                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', day)



                                                                        })



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
                                        //here
                                        cy.wait(3000)


                                        cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentId) => {
                                            const currentAide = currentId.attr('href')
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
                                                            cy.log(start1)
                                                            var year = parseInt(start1[2]) - 1
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
                                                            var year = parseInt(end[2]) + 1
                                                            var endMounth = parseInt(end[0]) + 4
                                                            if (endMounth < 10) {
                                                                var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            } else if (endMounth > 12) {

                                                                var endDAte = '04/' + end[1] + '/' + year
                                                                var enddateString = endDAte
                                                            } else {
                                                                var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            }

                                                            return enddateString

                                                        }
                                                        cy.log(endDate(last))
                                                        cy.get('#appt-filter-date').click({
                                                            force: true
                                                        })
                                                        cy.contains('Custom Range').click({
                                                            force: true
                                                        })
                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {



                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                force: true
                                                            })
                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                                                force: true
                                                            })




                                                            cy.contains('Apply').click({
                                                                force: true
                                                            })


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
                                                             cy.get('input[value="Reset"]').first().click({
                                                                force: true
                                                            })
                                                            cy.get('#appt-search').type(appointmentNumber)

                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()

                                                            cy.get('tbody > :nth-child(1) > :nth-child(7)').invoke('text').then((currentDate) => {

                                                                cy.get(':nth-child(1) > :nth-child(2) > .editable-click').click({
                                                                    force: true
                                                                })
                                                                cy.wait(500)
                                                                cy.get(':nth-child(3) > .radio-inline > input').click()



                                                                cy.get('#select2-dayofweek_val-container').click({
                                                                    force: true
                                                                })

                                                                const week = ['Wed', 'Mon', 'Tue', 'Fri', 'Sun', 'Thu', 'Sat']
                                                                var day = week[Math.floor(Math.random() * week.length)];
                                                                cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(day)
                                                                cy.get('#select2-dayofweek_val-results > :nth-child(1)').click({
                                                                    force: true
                                                                })




                                                                cy.get('#save-visit').click({
                                                                    force: true
                                                                })
                                                                cy.get('#proceed-anyway-conflicts').click({
                                                                    force: true
                                                                })
                                                                cy.get(':nth-child(4) > #cancel-conflicts').click({
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
                                                                        cy.get('#appt-search').clear({
                                                                            force: true
                                                                        }).type(appointmentNumber)
                                                                        cy.log()
                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                            var fullText = text1;
                                                                            var pattern = /[0-9]+/g;
                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-assignment_id').clear({
                                                                                force: true
                                                                            }).type(assignmentNumber)

                                                                            cy.get('#appt-search').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-filter-date').click({
                                                                                force: true
                                                                            })

                                                                            cy.contains('Custom Range').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').then((value) => {
                                                                                    const FirstDayTilte = value.attr('data-title')
                                                                                    const FirstDayTitleArray = FirstDayTilte.split('')
                                                                                    FirstDayTitleArray[3] = 0('.left > .calendar-table > .table-condensed > tbody > tr >[data-title="' + FirstDayTitleArray[0] + FirstDayTitleArray[1] + FirstDayTitleArray[2] + FirstDayTitleArray[3] + '"]').click({
                                                                                        force: true
                                                                                    })

                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                    force: true
                                                                                })
                                                                                cy.contains('Apply').click({
                                                                                    force: true
                                                                                })



                                                                            })
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                            cy.log(assignmentNumber)
                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDate)



                                                                        })
                                                                    } else if (toastFirst[0] == "Invalid") {
                                                                        cy.reload()

                                                                        const arrayeAppo = appointments.text().split('#')
                                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                                        cy.log(arrayeAppoLast)




                                                                        cy.log(arrayeAppo)
                                                                        cy.get('#appt-assignment_id').clear({
                                                                            force: true
                                                                        })
                                                                        cy.get('#appt-search').clear({
                                                                            force: true
                                                                        }).type(appointmentNumber)
                                                                        cy.log()
                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                            var fullText = text1;
                                                                            var pattern = /[0-9]+/g;
                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-assignment_id').clear({
                                                                                force: true
                                                                            }).type(assignmentNumber)

                                                                            cy.get('#appt-search').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-filter-date').click({
                                                                                force: true
                                                                            })

                                                                            cy.contains('Custom Range').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                    force: true
                                                                                })
                                                                                cy.contains('Apply').click({
                                                                                    force: true
                                                                                })



                                                                            })
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                            cy.log(assignmentNumber)
                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDate)



                                                                        })

                                                                    } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                        cy.reload()

                                                                        const arrayeAppo = appointments.text().split('#')
                                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                                        cy.log(arrayeAppoLast)




                                                                        cy.log(arrayeAppo)
                                                                        cy.get('#appt-assignment_id').clear({
                                                                            force: true
                                                                        })
                                                                        cy.get('#appt-search').clear({
                                                                            force: true
                                                                        }).type(appointmentNumber)
                                                                        cy.log()
                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                            var fullText = text1;
                                                                            var pattern = /[0-9]+/g;
                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-assignment_id').clear({
                                                                                force: true
                                                                            }).type(assignmentNumber)

                                                                            cy.get('#appt-search').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-filter-date').click({
                                                                                force: true
                                                                            })

                                                                            cy.contains('Custom Range').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                    force: true
                                                                                })
                                                                                cy.contains('Apply').click({
                                                                                    force: true
                                                                                })



                                                                            })
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                            cy.log(assignmentNumber)
                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDate)



                                                                        })
                                                                    } else if (toastFirst[0] == "Successfully") {
                                                                        cy.reload()
                                                                        
                                                                        cy.get('#appt-search').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('#appt-filter-date').click({
                                                                            force: true
                                                                        })

                                                                        cy.contains('Custom Range').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').then((value) => {
                                                                                const FirstDayTilte = value.attr('data-title')
                                                                                const FirstDayTitleArray = FirstDayTilte.split('')
                                                                                FirstDayTitleArray[3] = 0
                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >[data-title="' + FirstDayTitleArray[0]+'' + FirstDayTitleArray[1] +''+ FirstDayTitleArray[2] +''+ FirstDayTitleArray[3] + '"]').click({
                                                                                    force: true
                                                                                })

                                                                            })
                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                force: true
                                                                            })
                                                                            cy.contains('Apply').click({
                                                                                force: true
                                                                            })



                                                                        })
                                                                        const arrayeAppo = appointments.text().split('#')
                                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                                        cy.log(arrayeAppoLast)



                                                        

                                                                        cy.log(arrayeAppo)
                                                                        cy.get('#appt-assignment_id').clear({
                                                                            force: true
                                                                        })
                                                                        cy.get('#appt-search').clear({
                                                                            force: true
                                                                        }).type(appointmentNumber)
                                                                        cy.log()
                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                            var fullText = text1;
                                                                            var pattern = /[0-9]+/g;
                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-assignment_id').clear({
                                                                                force: true
                                                                            }).type(assignmentNumber)

                                                                            cy.get('#appt-search').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-filter-date').click({
                                                                                force: true
                                                                            })

                                                                            cy.contains('Custom Range').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').then((value) => {
                                                                                    const FirstDayTilte = value.attr('data-title')
                                                                                    const FirstDayTitleArray = FirstDayTilte.split('')
                                                                                    FirstDayTitleArray[3] = 0
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >[data-title="' + FirstDayTitleArray[0]+'' + FirstDayTitleArray[1] +''+ FirstDayTitleArray[2] +''+ FirstDayTitleArray[3] + '"]').click({
                                                                                        force: true
                                                                                    })

                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                    force: true
                                                                                })
                                                                                cy.contains('Apply').click({
                                                                                    force: true
                                                                                })



                                                                            })
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                            cy.log(assignmentNumber)
                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', day)



                                                                        })



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
                            })

                        })



                    })




                })
            })




        }


        validRow()



    })


})
//done
it('change Duration - From Selected Week Forward - connected-testing.com:90', function() {

    cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
    cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
        force: true
    }).then(() => {


        const validRow = () => {


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
            cy.wait(5000)
             cy.get('input[value="Reset"]').first().click({
                force: true
            })
            cy.get('#appt-filter-date').click({
                force: true
            }).then(($dates) => {
                var datestext = $dates.attr('value')
                var dateArray = datestext.split(' - ')
                cy.log(dateArray)
                const first = dateArray[0]
                const last = dateArray[1]
                cy.wait(3000)
                cy.contains('Custom Range').click({
                    force: true
                })
                cy.get('.left > .calendar-table > .table-condensed > tbody > :nth-child(4) > .available').then(() => {

                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.in-range').last().then((data) => {

                        const title = data.attr('data-title')
                        const splitedTitle = Array.from(title)
                        cy.log(splitedTitle)
                        cy.log()
                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                            force: true
                        })
                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                            force: true
                        })

                        cy.contains('Apply').click({
                            force: true
                        })
                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                            force: true
                        })

                        //***may be usefull in future***

                        // function StartPoint(splitedTitle) {
                        //     var startDayRow = splitedTitle[1]
                        //     var startday = parseInt(splitedTitle[3]) + 1
                        //     if (startday >= 6) {
                        //         var startday = 1
                        //         var startRow = parseInt(startDayRow) + 1
                        //         var startDate = splitedTitle[0] + startRow + splitedTitle[2] + startday
                        //         return startDate
                        //     } else if (startDayRow >= 5) {

                        //         cy.get('.left > .calendar-table > .table-condensed > thead > :nth-child(1) > .next > .fa').click()

                        //         var startDate = splitedTitle[0] + 0 + splitedTitle[2] + startday

                        //         return startDate

                        //     } else {

                        //         var startDate = splitedTitle[0] + startRow + splitedTitle[2] + startday
                        //         return startDate
                        //     }



                        // }


                        cy.get('#appt-filter-date').then((filterdate) => {

                            const dateValue = filterdate.attr('value')
                            cy.log(dateValue)
                            cy.wait(3000)
                            cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then(() => {


                                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                                    cy.log(aidcurrentname)
                                    var newwcurrentname = aidcurrentname.split(' ')
                                    cy.log(newwcurrentname[0])
                                    if (newwcurrentname[0] == "Open"){

                                        cy.reload()
                                        //here
                                        cy.wait(3000)


                                        cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentId) => {
                                            const currentAide = currentId.attr('href')
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
                                                            cy.log(start1)
                                                            var year = parseInt(start1[2]) - 1
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
                                                            var year = parseInt(end[2]) + 1
                                                            var endMounth = parseInt(end[0]) + 4
                                                            if (endMounth < 10) {
                                                                var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            } else if (endMounth > 12) {

                                                                var endDAte = '04/' + end[1] + '/' + year
                                                                var enddateString = endDAte
                                                            } else {
                                                                var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            }

                                                            return enddateString

                                                        }
                                                        cy.log(endDate(last))
                                                        cy.get('#appt-filter-date').click({
                                                            force: true
                                                        })
                                                        cy.contains('Custom Range').click({
                                                            force: true
                                                        })
                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {



                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                force: true
                                                            })
                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                                                force: true
                                                            })




                                                            cy.contains('Apply').click({
                                                                force: true
                                                            })


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
                                                             cy.get('input[value="Reset"]').first().click({
                                                                force: true
                                                            })
                                                            cy.get('#appt-search').type(appointmentNumber)

                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()

                                                            cy.get('tbody > :nth-child(1) > :nth-child(7)').invoke('text').then((currentDate) => {

                                                                cy.get(':nth-child(1) > :nth-child(2) > .editable-click').click({
                                                                    force: true
                                                                })
                                                                cy.wait(500)
                                                                cy.get(':nth-child(3) > .radio-inline > input').click()


                                                                cy.get('#visit_duration').then((currentTime)=>{
                                                                    const currentDuration = currentTime.attr('value')
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
                                                                    cy.get(':nth-child(4) > #cancel-conflicts').click({
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
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            }).type(appointmentNumber)
                                                                            cy.log()
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('strong > small').invoke('text').then((text1) => {
                                                                                var fullText = text1;
                                                                                var pattern = /[0-9]+/g;
                                                                                var assignmentNumber = fullText.match(pattern).toString();
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                }).type(assignmentNumber)

                                                                                cy.get('#appt-search').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-filter-date').click({
                                                                                    force: true
                                                                                })

                                                                                cy.contains('Custom Range').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').then((value) => {
                                                                                        const FirstDayTilte = value.attr('data-title')
                                                                                        const FirstDayTitleArray = FirstDayTilte.split('')
                                                                                        FirstDayTitleArray[3] = 0('.left > .calendar-table > .table-condensed > tbody > tr >[data-title="' + FirstDayTitleArray[0] + FirstDayTitleArray[1] + FirstDayTitleArray[2] + FirstDayTitleArray[3] + '"]').click({
                                                                                            force: true
                                                                                        })

                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.contains('Apply').click({
                                                                                        force: true
                                                                                    })



                                                                                })
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                cy.log(assignmentNumber)
                                                                                cy.get('tbody > tr > :nth-child(9)').each(($data) => {}).should('contain', currentDuration)



                                                                            })
                                                                        } else if (toastFirst[0] == "Invalid") {
                                                                            cy.reload()

                                                                            const arrayeAppo = appointments.text().split('#')
                                                                            const arrayeAppoLast = arrayeAppo.shift()
                                                                            cy.log(arrayeAppoLast)




                                                                            cy.log(arrayeAppo)
                                                                            cy.get('#appt-assignment_id').clear({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            }).type(appointmentNumber)
                                                                            cy.log()
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('strong > small').invoke('text').then((text1) => {
                                                                                var fullText = text1;
                                                                                var pattern = /[0-9]+/g;
                                                                                var assignmentNumber = fullText.match(pattern).toString();
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                }).type(assignmentNumber)

                                                                                cy.get('#appt-search').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-filter-date').click({
                                                                                    force: true
                                                                                })

                                                                                cy.contains('Custom Range').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.contains('Apply').click({
                                                                                        force: true
                                                                                    })



                                                                                })
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                cy.log(assignmentNumber)
                                                                                cy.get('tbody > tr > :nth-child(9)').each(($data) => {}).should('contain', currentDuration)



                                                                            })

                                                                        } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                            cy.reload()

                                                                            const arrayeAppo = appointments.text().split('#')
                                                                            const arrayeAppoLast = arrayeAppo.shift()
                                                                            cy.log(arrayeAppoLast)




                                                                            cy.log(arrayeAppo)
                                                                            cy.get('#appt-assignment_id').clear({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            }).type(appointmentNumber)
                                                                            cy.log()
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('strong > small').invoke('text').then((text1) => {
                                                                                var fullText = text1;
                                                                                var pattern = /[0-9]+/g;
                                                                                var assignmentNumber = fullText.match(pattern).toString();
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                }).type(assignmentNumber)

                                                                                cy.get('#appt-search').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-filter-date').click({
                                                                                    force: true
                                                                                })

                                                                                cy.contains('Custom Range').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.contains('Apply').click({
                                                                                        force: true
                                                                                    })



                                                                                })
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                cy.log(assignmentNumber)
                                                                                cy.get('tbody > tr > :nth-child(9)').each(($data) => {}).should('contain', currentDuration)



                                                                            })
                                                                        } else if (toastFirst[0] == "Successfully") {
                                                                            cy.reload()
                                                                            
                                                                            cy.get('#appt-search').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-filter-date').click({
                                                                                force: true
                                                                            })

                                                                            cy.contains('Custom Range').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').then((value) => {
                                                                                    const FirstDayTilte = value.attr('data-title')
                                                                                    const FirstDayTitleArray = FirstDayTilte.split('')
                                                                                    FirstDayTitleArray[3] = 0
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >[data-title="' + FirstDayTitleArray[0]+'' + FirstDayTitleArray[1] +''+ FirstDayTitleArray[2] +''+ FirstDayTitleArray[3] + '"]').click({
                                                                                        force: true
                                                                                    })

                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                    force: true
                                                                                })
                                                                                cy.contains('Apply').click({
                                                                                    force: true
                                                                                })



                                                                            })
                                                                            const arrayeAppo = appointments.text().split('#')
                                                                            const arrayeAppoLast = arrayeAppo.shift()
                                                                            cy.log(arrayeAppoLast)



                                                            

                                                                            cy.log(arrayeAppo)
                                                                            cy.get('#appt-assignment_id').clear({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            }).type(appointmentNumber)
                                                                            cy.log()
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('strong > small').invoke('text').then((text1) => {
                                                                                var fullText = text1;
                                                                                var pattern = /[0-9]+/g;
                                                                                var assignmentNumber = fullText.match(pattern).toString();
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                }).type(assignmentNumber)

                                                                                cy.get('#appt-search').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-filter-date').click({
                                                                                    force: true
                                                                                })

                                                                                cy.contains('Custom Range').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').then((value) => {
                                                                                        const FirstDayTilte = value.attr('data-title')
                                                                                        const FirstDayTitleArray = FirstDayTilte.split('')
                                                                                        FirstDayTitleArray[3] = 0
                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >[data-title="' + FirstDayTitleArray[0]+'' + FirstDayTitleArray[1] +''+ FirstDayTitleArray[2] +''+ FirstDayTitleArray[3] + '"]').click({
                                                                                            force: true
                                                                                        })

                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.contains('Apply').click({
                                                                                        force: true
                                                                                    })



                                                                                })
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                cy.log(assignmentNumber)
                                                                                cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                                                }).should('contain', randome(randomDuration) + .00)



                                                                            })



                                                                        }

                                                                    })
                                                                    
                                                                })







                                                            })




                                                        })


                                                    })


                                                })
                                            })

                                        })




                                    } else{

                                        cy.reload()
                                        //here
                                        cy.wait(3000)


                                        cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentId) => {
                                            const currentAide = currentId.attr('href')
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
                                                            cy.log(start1)
                                                            var year = parseInt(start1[2]) - 1
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
                                                            var year = parseInt(end[2]) + 1
                                                            var endMounth = parseInt(end[0]) + 4
                                                            if (endMounth < 10) {
                                                                var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            } else if (endMounth > 12) {

                                                                var endDAte = '04/' + end[1] + '/' + year
                                                                var enddateString = endDAte
                                                            } else {
                                                                var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                var enddateString = endDAte
                                                            }

                                                            return enddateString

                                                        }
                                                        cy.log(endDate(last))
                                                        cy.get('#appt-filter-date').click({
                                                            force: true
                                                        })
                                                        cy.contains('Custom Range').click({
                                                            force: true
                                                        })
                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {



                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                force: true
                                                            })
                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                                                force: true
                                                            })




                                                            cy.contains('Apply').click({
                                                                force: true
                                                            })


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
                                                             cy.get('input[value="Reset"]').first().click({
                                                                force: true
                                                            })
                                                            cy.get('#appt-search').type(appointmentNumber)

                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()

                                                            cy.get('tbody > :nth-child(1) > :nth-child(7)').invoke('text').then((currentDate) => {

                                                                cy.get(':nth-child(1) > :nth-child(2) > .editable-click').click({
                                                                    force: true
                                                                })
                                                                cy.wait(500)
                                                                cy.get(':nth-child(3) > .radio-inline > input').click()


                                                                cy.get('#visit_duration').then((currentTime)=>{
                                                                    const currentDuration = currentTime.attr('value')
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
                                                                    cy.get(':nth-child(4) > #cancel-conflicts').click({
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
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            }).type(appointmentNumber)
                                                                            cy.log()
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('strong > small').invoke('text').then((text1) => {
                                                                                var fullText = text1;
                                                                                var pattern = /[0-9]+/g;
                                                                                var assignmentNumber = fullText.match(pattern).toString();
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                }).type(assignmentNumber)

                                                                                cy.get('#appt-search').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-filter-date').click({
                                                                                    force: true
                                                                                })

                                                                                cy.contains('Custom Range').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').then((value) => {
                                                                                        const FirstDayTilte = value.attr('data-title')
                                                                                        const FirstDayTitleArray = FirstDayTilte.split('')
                                                                                        FirstDayTitleArray[3] = 0('.left > .calendar-table > .table-condensed > tbody > tr >[data-title="' + FirstDayTitleArray[0] + FirstDayTitleArray[1] + FirstDayTitleArray[2] + FirstDayTitleArray[3] + '"]').click({
                                                                                            force: true
                                                                                        })

                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.contains('Apply').click({
                                                                                        force: true
                                                                                    })



                                                                                })
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                cy.log(assignmentNumber)
                                                                                cy.get('tbody > tr > :nth-child(9)').each(($data) => {}).should('contain', currentDuration)



                                                                            })
                                                                        } else if (toastFirst[0] == "Invalid") {
                                                                            cy.reload()

                                                                            const arrayeAppo = appointments.text().split('#')
                                                                            const arrayeAppoLast = arrayeAppo.shift()
                                                                            cy.log(arrayeAppoLast)




                                                                            cy.log(arrayeAppo)
                                                                            cy.get('#appt-assignment_id').clear({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            }).type(appointmentNumber)
                                                                            cy.log()
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('strong > small').invoke('text').then((text1) => {
                                                                                var fullText = text1;
                                                                                var pattern = /[0-9]+/g;
                                                                                var assignmentNumber = fullText.match(pattern).toString();
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                }).type(assignmentNumber)

                                                                                cy.get('#appt-search').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-filter-date').click({
                                                                                    force: true
                                                                                })

                                                                                cy.contains('Custom Range').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.contains('Apply').click({
                                                                                        force: true
                                                                                    })



                                                                                })
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                cy.log(assignmentNumber)
                                                                                cy.get('tbody > tr > :nth-child(9)').each(($data) => {}).should('contain', currentDuration)



                                                                            })

                                                                        } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                            cy.reload()

                                                                            const arrayeAppo = appointments.text().split('#')
                                                                            const arrayeAppoLast = arrayeAppo.shift()
                                                                            cy.log(arrayeAppoLast)




                                                                            cy.log(arrayeAppo)
                                                                            cy.get('#appt-assignment_id').clear({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            }).type(appointmentNumber)
                                                                            cy.log()
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('strong > small').invoke('text').then((text1) => {
                                                                                var fullText = text1;
                                                                                var pattern = /[0-9]+/g;
                                                                                var assignmentNumber = fullText.match(pattern).toString();
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                }).type(assignmentNumber)

                                                                                cy.get('#appt-search').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-filter-date').click({
                                                                                    force: true
                                                                                })

                                                                                cy.contains('Custom Range').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.contains('Apply').click({
                                                                                        force: true
                                                                                    })



                                                                                })
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                cy.log(assignmentNumber)
                                                                                cy.get('tbody > tr > :nth-child(9)').each(($data) => {}).should('contain', currentDuration)



                                                                            })
                                                                        } else if (toastFirst[0] == "Successfully") {
                                                                            cy.reload()
                                                                            
                                                                            cy.get('#appt-search').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-filter-date').click({
                                                                                force: true
                                                                            })

                                                                            cy.contains('Custom Range').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').then((value) => {
                                                                                    const FirstDayTilte = value.attr('data-title')
                                                                                    const FirstDayTitleArray = FirstDayTilte.split('')
                                                                                    FirstDayTitleArray[3] = 0
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >[data-title="' + FirstDayTitleArray[0]+'' + FirstDayTitleArray[1] +''+ FirstDayTitleArray[2] +''+ FirstDayTitleArray[3] + '"]').click({
                                                                                        force: true
                                                                                    })

                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                    force: true
                                                                                })
                                                                                cy.contains('Apply').click({
                                                                                    force: true
                                                                                })



                                                                            })
                                                                            const arrayeAppo = appointments.text().split('#')
                                                                            const arrayeAppoLast = arrayeAppo.shift()
                                                                            cy.log(arrayeAppoLast)



                                                            

                                                                            cy.log(arrayeAppo)
                                                                            cy.get('#appt-assignment_id').clear({
                                                                                force: true
                                                                            })
                                                                            cy.get('#appt-search').clear({
                                                                                force: true
                                                                            }).type(appointmentNumber)
                                                                            cy.log()
                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('strong > small').invoke('text').then((text1) => {
                                                                                var fullText = text1;
                                                                                var pattern = /[0-9]+/g;
                                                                                var assignmentNumber = fullText.match(pattern).toString();
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                }).type(assignmentNumber)

                                                                                cy.get('#appt-search').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-filter-date').click({
                                                                                    force: true
                                                                                })

                                                                                cy.contains('Custom Range').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').then((value) => {
                                                                                        const FirstDayTilte = value.attr('data-title')
                                                                                        const FirstDayTitleArray = FirstDayTilte.split('')
                                                                                        FirstDayTitleArray[3] = 0
                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >[data-title="' + FirstDayTitleArray[0]+'' + FirstDayTitleArray[1] +''+ FirstDayTitleArray[2] +''+ FirstDayTitleArray[3] + '"]').click({
                                                                                            force: true
                                                                                        })

                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.contains('Apply').click({
                                                                                        force: true
                                                                                    })



                                                                                })
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                cy.log(assignmentNumber)
                                                                                cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                                                }).should('contain', randome(randomDuration) + .00)



                                                                            })



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
                            })

                        })



                    })




                })
            })




        }


        validRow()



    })


})
   //done
    it('change aide to open shift  - From Selected Week Forward - connected-testing.com:90', function() {

        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        }).then(() => {


            const validRow = () => {


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
                cy.wait(5000)
                 cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                cy.get('#appt-filter-date').click({
                    force: true
                }).then(($dates) => {
                    var datestext = $dates.attr('value')
                    var dateArray = datestext.split(' - ')
                    cy.log(dateArray)
                    const first = dateArray[0]
                    const last = dateArray[1]
                    cy.wait(3000)
                    cy.contains('Custom Range').click({
                        force: true
                    })
                    cy.get('.left > .calendar-table > .table-condensed > tbody > :nth-child(4) > .available').then(() => {

                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.in-range').last().then((data) => {

                            const title = data.attr('data-title')
                            const splitedTitle = Array.from(title)
                            cy.log(splitedTitle)
                            cy.log()
                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                force: true
                            })
                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                force: true
                            })

                            cy.contains('Apply').click({
                                force: true
                            })
                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                force: true
                            })

                            //***may be usefull in future***

                            // function StartPoint(splitedTitle) {
                            //     var startDayRow = splitedTitle[1]
                            //     var startday = parseInt(splitedTitle[3]) + 1
                            //     if (startday >= 6) {
                            //         var startday = 1
                            //         var startRow = parseInt(startDayRow) + 1
                            //         var startDate = splitedTitle[0] + startRow + splitedTitle[2] + startday
                            //         return startDate
                            //     } else if (startDayRow >= 5) {

                            //         cy.get('.left > .calendar-table > .table-condensed > thead > :nth-child(1) > .next > .fa').click()

                            //         var startDate = splitedTitle[0] + 0 + splitedTitle[2] + startday

                            //         return startDate

                            //     } else {

                            //         var startDate = splitedTitle[0] + startRow + splitedTitle[2] + startday
                            //         return startDate
                            //     }



                            // }


                            cy.get('#appt-filter-date').then((filterdate) => {

                                const dateValue = filterdate.attr('value')
                                cy.log(dateValue)
                                cy.wait(3000)
                                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then(()=>{

                            
                                    cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                                        cy.log(aidcurrentname)
                                        var newwcurrentname = aidcurrentname.split(' ')
                                        cy.log(newwcurrentname[0])
                                        if (newwcurrentname[0] == "Open") {
                                            cy.wait(100)
                                            cy.reload()
                                            validRow()
                                        } else {
    
                                            cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                                force: true
                                            })
                                            cy.get('#select2-sid-container').click()
                                            cy.wait(200)
                                            cy.get('.select2-dropdown > .select2-search > .select2-search__field').type('Open')
                                            cy.wait(2000)
                                            cy.get('#select2-sid-results > :nth-child(1)').invoke('text').then((open) => {
                    
                                                let splitedOpen = open.split(' ')
                                                cy.log(splitedOpen)
                    
                                                if (splitedOpen[0] != 'Open') {
                                                    cy.wait(100)
                                                    cy.reload()
                                                    validRow()
                                                } else {
                                                    cy.wait(3000)
                                                   cy.reload()
                                                    //here
                                                    cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentId) => {
                                                        const currentAide =currentId.attr('href')
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
                                                                        cy.log(start1)
                                                                        var year = parseInt(start1[2]) - 1
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
                                                                        var year = parseInt(end[2]) + 1
                                                                        var endMounth = parseInt(end[0]) + 4
                                                                        if (endMounth < 10) {
                                                                            var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                            var enddateString = endDAte
                                                                        } else if (endMounth > 12) {
        
                                                                            var endDAte = '04/' + end[1] + '/' + year
                                                                            var enddateString = endDAte
                                                                        } else {
                                                                            var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                            var enddateString = endDAte
                                                                        }
        
                                                                        return enddateString
        
                                                                    }
                                                                    cy.log(endDate(last))
                                                                    cy.get('#appt-filter-date').click({
                                                                        force: true
                                                                    })
                                                                    cy.contains('Custom Range').click({
                                                                        force: true
                                                                    })
                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
        
        
        
                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                                                            force: true
                                                                        })
        
        
        
        
                                                                        cy.contains('Apply').click({
                                                                            force: true
                                                                        })
        
        
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
                                                                         cy.get('input[value="Reset"]').first().click({
                                                                            force: true
                                                                        })
                                                                        cy.get('#appt-search').type(appointmentNumber)
        
                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
        
        
        
                                                                        cy.get(':nth-child(1) > :nth-child(2) > .editable-click').click({
                                                                            force: true
                                                                        })
                                                                        cy.wait(500)
                                                                        cy.get(':nth-child(3) > .radio-inline > input').click()
        
        
                                                                        var randomAid = Math.floor(Math.random() * 11);
        
        
                                                                        function randomeaid(randomAid) {
        
                                                                            if (randomAid == 0) {
                                                                                randomAid = 1
                                                                                return randomAid
                                                                            }
                                                                            return randomAid
                                                                        }
                                                                        cy.wait(3000)
                                                                        cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                                            var aidId = $aid.attr("href");
        
                                                                            var aidName = $aid.text()
                                                                            cy.get('#select2-sid-container').click()
                                                                            cy.wait(500)
                                                                            cy.get('.select2-dropdown > .select2-search > .select2-search__field').type('Open')
                                                                            cy.wait(3000)
                                                                            cy.get('#select2-sid-results > :nth-child(1)').invoke('text').then((open) => {
        
                                                                                cy.get('.select2-results__option--highlighted').click({
                                                                                    force: true
                                                                                })
                                                                            })
        
        
                                                                            cy.get('#save-visit').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('#select-aides-from-circle').click({
                                                                                force: true
                                                                            })
                                                                            cy.get(':nth-child(4) > #cancel-conflicts').click({
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
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    }).type(appointmentNumber)
                                                                                    cy.log()
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                                        var fullText = text1;
                                                                                        var pattern = /[0-9]+/g;
                                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                                        cy.get('#appt-search').clear({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('#appt-assignment_id').clear({
                                                                                            force: true
                                                                                        }).type(assignmentNumber)
        
                                                                                        cy.get('#appt-search').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('#appt-filter-date').click({
                                                                                            force: true
                                                                                        })
        
                                                                                        cy.contains('Custom Range').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
        
                                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.contains('Apply').click({
                                                                                                force: true
                                                                                            })
        
        
        
                                                                                        })
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                        cy.log(assignmentNumber)
                                                                                        cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                        }).should('have.attr', 'href').and('contain',currentAide)
        
        
        
                                                                                    })
                                                                                } else if (toastFirst[0] == "Invalid") {
                                                                                    cy.reload()
        
                                                                                    const arrayeAppo = appointments.text().split('#')
                                                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                                                    cy.log(arrayeAppoLast)
        
        
        
        
                                                                                    cy.log(arrayeAppo)
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    }).type(appointmentNumber)
                                                                                    cy.log()
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                                        var fullText = text1;
                                                                                        var pattern = /[0-9]+/g;
                                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                                        cy.get('#appt-search').clear({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('#appt-assignment_id').clear({
                                                                                            force: true
                                                                                        }).type(assignmentNumber)
        
                                                                                        cy.get('#appt-search').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('#appt-filter-date').click({
                                                                                            force: true
                                                                                        })
        
                                                                                        cy.contains('Custom Range').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
        
                                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.contains('Apply').click({
                                                                                                force: true
                                                                                            })
        
        
        
                                                                                        })
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                        cy.log(assignmentNumber)
                                                                                        cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                        }).should('have.attr', 'href').and('contain',currentAide)
        
        
        
                                                                                    })
        
                                                                                } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                                    cy.reload()
        
                                                                                    const arrayeAppo = appointments.text().split('#')
                                                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                                                    cy.log(arrayeAppoLast)
        
        
        
        
                                                                                    cy.log(arrayeAppo)
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    }).type(appointmentNumber)
                                                                                    cy.log()
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                                        var fullText = text1;
                                                                                        var pattern = /[0-9]+/g;
                                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                                        cy.get('#appt-search').clear({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('#appt-assignment_id').clear({
                                                                                            force: true
                                                                                        }).type(assignmentNumber)
        
                                                                                        cy.get('#appt-search').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('#appt-filter-date').click({
                                                                                            force: true
                                                                                        })
        
                                                                                        cy.contains('Custom Range').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
        
                                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.contains('Apply').click({
                                                                                                force: true
                                                                                            })
        
        
        
                                                                                        })
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                        cy.log(assignmentNumber)
                                                                                        cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                        }).should('have.attr', 'href').and('contain',currentAide)
        
        
        
                                                                                    })
                                                                                } else if (toastFirst[0] == "Successfully") {
                                                                                    cy.reload()
        
                                                                                    const arrayeAppo = appointments.text().split('#')
                                                                                    const arrayeAppoLast = arrayeAppo.shift()
                                                                                    cy.log(arrayeAppoLast)
        
        
        
        
                                                                                    cy.log(arrayeAppo)
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    }).type(appointmentNumber)
                                                                                    cy.log()
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('strong > small').invoke('text').then((text1) => {
                                                                                        var fullText = text1;
                                                                                        var pattern = /[0-9]+/g;
                                                                                        var assignmentNumber = fullText.match(pattern).toString();
                                                                                        cy.get('#appt-search').clear({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('#appt-assignment_id').clear({
                                                                                            force: true
                                                                                        }).type(assignmentNumber)
        
                                                                                        cy.get('#appt-search').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('#appt-filter-date').click({
                                                                                            force: true
                                                                                        })
        
                                                                                        cy.contains('Custom Range').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
        
                                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.contains('Apply').click({
                                                                                                force: true
                                                                                            })
        
        
        
                                                                                        })
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                        cy.log(assignmentNumber)
                                                                                        cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                        }).should('contain', 'Open')
        
        
        
                                                                                    })
        
        
        
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
    
    
                                    })
                                })
                               
                            })



                        })




                    })
                })




            }


            validRow()



        })


    })
    //done
    it('change open shift to aide  - From Selected Week Forward - connected-testing.com:90', function() {

        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        }).then(() => {


            const validRow = () => {


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
                 cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                cy.get('#appt-filter-date').click({
                    force: true
                }).then(($dates) => {
                    var datestext = $dates.attr('value')
                    var dateArray = datestext.split(' - ')
                    cy.log(dateArray)
                    const first = dateArray[0]
                    const last = dateArray[1]
                    cy.wait(3000)
                    cy.contains('Custom Range').click({
                        force: true
                    })
                    cy.get('.left > .calendar-table > .table-condensed > tbody > :nth-child(4) > .available').then(() => {

                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.in-range').last().then((data) => {

                            const title = data.attr('data-title')
                            const splitedTitle = Array.from(title)
                            cy.log(splitedTitle)
                            cy.log()
                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                force: true
                            })
                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                force: true
                            })

                            cy.contains('Apply').click({
                                force: true
                            })
                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                force: true
                            })

                            //***may be usefull in future***

                            // function StartPoint(splitedTitle) {
                            //     var startDayRow = splitedTitle[1]
                            //     var startday = parseInt(splitedTitle[3]) + 1
                            //     if (startday >= 6) {
                            //         var startday = 1
                            //         var startRow = parseInt(startDayRow) + 1
                            //         var startDate = splitedTitle[0] + startRow + splitedTitle[2] + startday
                            //         return startDate
                            //     } else if (startDayRow >= 5) {

                            //         cy.get('.left > .calendar-table > .table-condensed > thead > :nth-child(1) > .next > .fa').click()

                            //         var startDate = splitedTitle[0] + 0 + splitedTitle[2] + startday

                            //         return startDate

                            //     } else {

                            //         var startDate = splitedTitle[0] + startRow + splitedTitle[2] + startday
                            //         return startDate
                            //     }



                            // }


                            cy.get('#appt-filter-date').then((filterdate) => {

                                const dateValue = filterdate.attr('value')
                                cy.log(dateValue)
                                cy.wait(3000)

                               
                                

                                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                            force: true
                                        })
                                         cy.wait(2000)
                                    cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {

                                            if ($recomanded.children().length > 0) {


                                                cy.wait(3000)
                                                cy.reload()
                                                //here
                                                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then(() => {
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
                                                                    cy.log(start1)
                                                                    var year = parseInt(start1[2]) - 1
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
                                                                    var year = parseInt(end[2]) + 1
                                                                    var endMounth = parseInt(end[0]) + 4
                                                                    if (endMounth < 10) {
                                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                        var enddateString = endDAte
                                                                    } else if (endMounth > 12) {
    
                                                                        var endDAte = '04/' + end[1] + '/' + year
                                                                        var enddateString = endDAte
                                                                    } else {
                                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                        var enddateString = endDAte
                                                                    }
    
                                                                    return enddateString
    
                                                                }
                                                                cy.log(endDate(last))
                                                                cy.get('#appt-filter-date').click({
                                                                    force: true
                                                                })
                                                                cy.contains('Custom Range').click({
                                                                    force: true
                                                                })
                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
    
    
    
                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                        force: true
                                                                    })
                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                                                        force: true
                                                                    })
    
    
    
    
                                                                    cy.contains('Apply').click({
                                                                        force: true
                                                                    })
    
    
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
                                                                     cy.get('input[value="Reset"]').first().click({
                                                                        force: true
                                                                    })
                                                                    cy.get('#appt-search').type(appointmentNumber)
    
                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
    
    
    
                                                                    cy.get(':nth-child(1) > :nth-child(2) > .editable-click').click({
                                                                        force: true
                                                                    })
                                                                    cy.wait(500)
                                                                    cy.get(':nth-child(3) > .radio-inline > input').click()
    
    
                                                                    var randomAid = Math.floor(Math.random() * 11);
    
    
                                                                    function randomeaid(randomAid) {
    
                                                                        if (randomAid == 0) {
                                                                            randomAid = 1
                                                                            return randomAid
                                                                        }
                                                                        return randomAid
                                                                    }
                                                                    cy.wait(3000)
                                                                    cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                                        var aidId = $aid.attr("href");
    
                                                                        var aidName = $aid.text()
                                                                        cy.get('#select2-sid-container').click()
                                                                        cy.wait(500)
                                                                        cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(aidName)
                                                                        cy.wait(3000)
                                                                        cy.get('#select2-sid-results > :nth-child(1)').invoke('text').then((open) => {
    
                                                                            cy.get('.select2-results__option--highlighted').click({
                                                                                force: true
                                                                            })
                                                                        })
    
    
                                                                        cy.get('#save-visit').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('#select-aides-from-circle').click({
                                                                            force: true
                                                                        })
                                                                        cy.get(':nth-child(4) > #cancel-conflicts').click({
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
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)
    
                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })
    
                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
    
                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })
    
    
    
                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
    
    
                                                                                    }).should('contain', 'Open')
    
    
    
                                                                                })
                                                                            } else if (toastFirst[0] == "Invalid") {
                                                                                cy.reload()
    
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
    
    
    
    
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)
    
                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })
    
                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
    
                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })
    
    
    
                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
    
    
                                                                                    }).should('contain', 'Open')
    
    
    
                                                                                })
    
                                                                            } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                                cy.reload()
    
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
    
    
    
    
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)
    
                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })
    
                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
    
                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })
    
    
    
                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
    
    
                                                                                    }).should('contain', 'Open')
    
    
    
                                                                                })
                                                                            } else if (toastFirst[0] == "Successfully") {
                                                                                cy.reload()
    
                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)
    
    
    
    
                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)
    
                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })
    
                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
    
                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })
    
    
    
                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
    
    
                                                                                    }).should('have.attr', 'href').and('contain', aidId)
    
    
    
                                                                                })
    
    
    
                                                                            }
    
                                                                        })
    
    
    
    
                                                                    })
                                                                })
    
    
    
    
                                                            })
    
    
                                                        })
    
    
                                                    })
                                                })
                                               
                                            } else {
                                                cy.wait(100)
                                                cy.reload()
                                                validRow()
                                            }
                                        })




                                   


                               
                            })



                        })




                    })
                })




            }


            validRow()



        })


    })
   //done
    it('change aid to aide by input  - From Selected Week Forward - connected-testing.com:90', function() {

        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        }).then(() => {


            const validRow = () => {


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
                cy.wait(5000)
                 cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                cy.get('#appt-filter-date').click({
                    force: true
                }).then(($dates) => {
                    var datestext = $dates.attr('value')
                    var dateArray = datestext.split(' - ')
                    cy.log(dateArray)
                    const first = dateArray[0]
                    const last = dateArray[1]
                    cy.wait(3000)
                    cy.contains('Custom Range').click({
                        force: true
                    })
                    cy.get('.left > .calendar-table > .table-condensed > tbody > :nth-child(4) > .available').then(() => {

                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.in-range').last().then((data) => {

                            const title = data.attr('data-title')
                            const splitedTitle = Array.from(title)
                            cy.log(splitedTitle)
                            cy.log()
                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                force: true
                            })
                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                force: true
                            })

                            cy.contains('Apply').click({
                                force: true
                            })
                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                force: true
                            })

                            //***may be usefull in future***

                            // function StartPoint(splitedTitle) {
                            //     var startDayRow = splitedTitle[1]
                            //     var startday = parseInt(splitedTitle[3]) + 1
                            //     if (startday >= 6) {
                            //         var startday = 1
                            //         var startRow = parseInt(startDayRow) + 1
                            //         var startDate = splitedTitle[0] + startRow + splitedTitle[2] + startday
                            //         return startDate
                            //     } else if (startDayRow >= 5) {

                            //         cy.get('.left > .calendar-table > .table-condensed > thead > :nth-child(1) > .next > .fa').click()

                            //         var startDate = splitedTitle[0] + 0 + splitedTitle[2] + startday

                            //         return startDate

                            //     } else {

                            //         var startDate = splitedTitle[0] + startRow + splitedTitle[2] + startday
                            //         return startDate
                            //     }



                            // }


                            cy.get('#appt-filter-date').then((filterdate) => {

                                const dateValue = filterdate.attr('value')
                                cy.log(dateValue)
                                cy.wait(3000)

                                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                                    cy.log(aidcurrentname)
                                    var newwcurrentname = aidcurrentname.split(' ')
                                    cy.log(newwcurrentname[0])
                                    if (newwcurrentname[0] != "Open") {

                                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                            force: true
                                        })
                                        cy.wait(2000)
                                        cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {

                                            if ($recomanded.children().length > 0) {


                                                cy.wait(3000)
                                                cy.reload()
                                                //here
                                                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentId) => {
                                                    const currentAide = currentId.attr('href')
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
                                                                    cy.log(start1)
                                                                    var year = parseInt(start1[2]) - 1
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
                                                                    var year = parseInt(end[2]) + 1
                                                                    var endMounth = parseInt(end[0]) + 4
                                                                    if (endMounth < 10) {
                                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                        var enddateString = endDAte
                                                                    } else if (endMounth > 12) {

                                                                        var endDAte = '04/' + end[1] + '/' + year
                                                                        var enddateString = endDAte
                                                                    } else {
                                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                        var enddateString = endDAte
                                                                    }

                                                                    return enddateString

                                                                }
                                                                cy.log(endDate(last))
                                                                cy.get('#appt-filter-date').click({
                                                                    force: true
                                                                })
                                                                cy.contains('Custom Range').click({
                                                                    force: true
                                                                })
                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {



                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                        force: true
                                                                    })
                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                                                        force: true
                                                                    })




                                                                    cy.contains('Apply').click({
                                                                        force: true
                                                                    })


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
                                                                     cy.get('input[value="Reset"]').first().click({
                                                                        force: true
                                                                    })
                                                                    cy.get('#appt-search').type(appointmentNumber)

                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()



                                                                    cy.get(':nth-child(1) > :nth-child(2) > .editable-click').click({
                                                                        force: true
                                                                    })
                                                                    cy.wait(500)
                                                                    cy.get(':nth-child(3) > .radio-inline > input').click()


                                                                    var randomAid = Math.floor(Math.random() * 11);


                                                                    function randomeaid(randomAid) {

                                                                        if (randomAid == 0) {
                                                                            randomAid = 1
                                                                            return randomAid
                                                                        }
                                                                        return randomAid
                                                                    }
                                                                    cy.wait(3000)
                                                                    cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                                        var aidId = $aid.attr("href");

                                                                        var aidName = $aid.text()
                                                                        cy.get('#select2-sid-container').click()
                                                                        cy.wait(500)
                                                                        cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(aidName)
                                                                        cy.wait(3000)
                                                                        cy.get('#select2-sid-results > :nth-child(1)').invoke('text').then((open) => {

                                                                            cy.get('.select2-results__option--highlighted').click({
                                                                                force: true
                                                                            })
                                                                        })


                                                                        cy.get('#save-visit').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('#proceed-anyway-conflicts').click({
                                                                            force: true
                                                                        })
                                                                        cy.get(':nth-child(4) > #cancel-conflicts').click({
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
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', currentAide)



                                                                                })
                                                                            } else if (toastFirst[0] == "Invalid") {
                                                                                cy.reload()

                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)




                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', currentAide)



                                                                                })

                                                                            } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                                cy.reload()

                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)




                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', currentAide)


                                                                                })
                                                                            } else if (toastFirst[0] == "Successfully") {
                                                                                cy.reload()

                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)




                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', aidId)



                                                                                })



                                                                            }

                                                                        })




                                                                    })
                                                                })




                                                            })


                                                        })


                                                    })
                                                })

                                            } else {
                                                cy.wait(100)
                                                cy.reload()
                                                validRow()
                                            }
                                        })




                                    } else {

                                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                            force: true
                                        })
                                        cy.wait(2000)
                                        cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {

                                            if ($recomanded.children().length > 0) {


                                                cy.wait(3000)
                                                cy.reload()
                                                //here
                                                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentId) => {
                                                    const currentAide = currentId.attr('href')
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
                                                                    cy.log(start1)
                                                                    var year = parseInt(start1[2]) - 1
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
                                                                    var year = parseInt(end[2]) + 1
                                                                    var endMounth = parseInt(end[0]) + 4
                                                                    if (endMounth < 10) {
                                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                        var enddateString = endDAte
                                                                    } else if (endMounth > 12) {

                                                                        var endDAte = '04/' + end[1] + '/' + year
                                                                        var enddateString = endDAte
                                                                    } else {
                                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                        var enddateString = endDAte
                                                                    }

                                                                    return enddateString

                                                                }
                                                                cy.log(endDate(last))
                                                                cy.get('#appt-filter-date').click({
                                                                    force: true
                                                                })
                                                                cy.contains('Custom Range').click({
                                                                    force: true
                                                                })
                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {



                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                        force: true
                                                                    })
                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                                                        force: true
                                                                    })




                                                                    cy.contains('Apply').click({
                                                                        force: true
                                                                    })


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
                                                                     cy.get('input[value="Reset"]').first().click({
                                                                        force: true
                                                                    })
                                                                    cy.get('#appt-search').type(appointmentNumber)

                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()



                                                                    cy.get(':nth-child(1) > :nth-child(2) > .editable-click').click({
                                                                        force: true
                                                                    })
                                                                    cy.wait(500)
                                                                    cy.get(':nth-child(3) > .radio-inline > input').click()


                                                                    var randomAid = Math.floor(Math.random() * 11);


                                                                    function randomeaid(randomAid) {

                                                                        if (randomAid == 0) {
                                                                            randomAid = 1
                                                                            return randomAid
                                                                        }
                                                                        return randomAid
                                                                    }
                                                                    cy.wait(3000)
                                                                    cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                                        var aidId = $aid.attr("href");

                                                                        var aidName = $aid.text()
                                                                        cy.get('#select2-sid-container').click()
                                                                        cy.wait(500)
                                                                        cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(aidName)
                                                                        cy.wait(3000)
                                                                        cy.get('#select2-sid-results > :nth-child(1)').invoke('text').then((open) => {

                                                                            cy.get('.select2-results__option--highlighted').click({
                                                                                force: true
                                                                            })
                                                                        })


                                                                        cy.get('#save-visit').click({
                                                                            force: true
                                                                        })
                                                                        cy.get('#select-aides-from-circle').click({
                                                                            force: true
                                                                        })
                                                                        cy.get(':nth-child(4) > #cancel-conflicts').click({
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
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', currentAide)



                                                                                })
                                                                            } else if (toastFirst[0] == "Invalid") {
                                                                                cy.reload()

                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)




                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', currentAide)



                                                                                })

                                                                            } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                                cy.reload()

                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)




                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', currentAide)


                                                                                })
                                                                            } else if (toastFirst[0] == "Successfully") {
                                                                                cy.reload()

                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)




                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', aidId)



                                                                                })



                                                                            }

                                                                        })




                                                                    })
                                                                })




                                                            })


                                                        })


                                                    })
                                                })

                                            } else {
                                                cy.wait(100)
                                                cy.reload()
                                                validRow()
                                            }
                                        })




                                    }


                                })
                            })



                        })




                    })
                })




            }


            validRow()



        })


    })
    //done
    it('change aid to aide by Recommanded aide  - From Selected Week Forward - connected-testing.com:90', function() {

        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        }).then(() => {


            const validRow = () => {


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
                cy.wait(5000)
                 cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                cy.get('#appt-filter-date').click({
                    force: true
                }).then(($dates) => {
                    var datestext = $dates.attr('value')
                    var dateArray = datestext.split(' - ')
                    cy.log(dateArray)
                    const first = dateArray[0]
                    const last = dateArray[1]
                    cy.wait(3000)
                    cy.contains('Custom Range').click({
                        force: true
                    })
                    cy.get('.left > .calendar-table > .table-condensed > tbody > :nth-child(4) > .available').then(() => {

                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.in-range').last().then((data) => {

                            const title = data.attr('data-title')
                            const splitedTitle = Array.from(title)
                            cy.log(splitedTitle)
                            cy.log()
                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                force: true
                            })
                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                force: true
                            })

                            cy.contains('Apply').click({
                                force: true
                            })
                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                force: true
                            })

                            //***may be usefull in future***

                            // function StartPoint(splitedTitle) {
                            //     var startDayRow = splitedTitle[1]
                            //     var startday = parseInt(splitedTitle[3]) + 1
                            //     if (startday >= 6) {
                            //         var startday = 1
                            //         var startRow = parseInt(startDayRow) + 1
                            //         var startDate = splitedTitle[0] + startRow + splitedTitle[2] + startday
                            //         return startDate
                            //     } else if (startDayRow >= 5) {

                            //         cy.get('.left > .calendar-table > .table-condensed > thead > :nth-child(1) > .next > .fa').click()

                            //         var startDate = splitedTitle[0] + 0 + splitedTitle[2] + startday

                            //         return startDate

                            //     } else {

                            //         var startDate = splitedTitle[0] + startRow + splitedTitle[2] + startday
                            //         return startDate
                            //     }



                            // }


                            cy.get('#appt-filter-date').then((filterdate) => {

                                const dateValue = filterdate.attr('value')
                                cy.log(dateValue)
                                cy.wait(3000)

                                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                                    cy.log(aidcurrentname)
                                    var newwcurrentname = aidcurrentname.split(' ')
                                    cy.log(newwcurrentname[0])
                                    if (newwcurrentname[0] != "Open") {

                                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                            force: true
                                        })
                                        cy.wait(2000)
                                        cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {

                                            if ($recomanded.children().length > 0) {


                                                cy.wait(3000)
                                                cy.reload()
                                                //here
                                                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentId) => {
                                                    const currentAide = currentId.attr('href')
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
                                                                    cy.log(start1)
                                                                    var year = parseInt(start1[2]) - 1
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
                                                                    var year = parseInt(end[2]) + 1
                                                                    var endMounth = parseInt(end[0]) + 4
                                                                    if (endMounth < 10) {
                                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                        var enddateString = endDAte
                                                                    } else if (endMounth > 12) {

                                                                        var endDAte = '04/' + end[1] + '/' + year
                                                                        var enddateString = endDAte
                                                                    } else {
                                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                        var enddateString = endDAte
                                                                    }

                                                                    return enddateString

                                                                }
                                                                cy.log(endDate(last))
                                                                cy.get('#appt-filter-date').click({
                                                                    force: true
                                                                })
                                                                cy.contains('Custom Range').click({
                                                                    force: true
                                                                })
                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {



                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                        force: true
                                                                    })
                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                                                        force: true
                                                                    })




                                                                    cy.contains('Apply').click({
                                                                        force: true
                                                                    })


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
                                                                     cy.get('input[value="Reset"]').first().click({
                                                                        force: true
                                                                    })
                                                                    cy.get('#appt-search').type(appointmentNumber)

                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()



                                                                    cy.get(':nth-child(1) > :nth-child(2) > .editable-click').click({
                                                                        force: true
                                                                    })
                                                                    cy.wait(500)
                                                                    cy.get(':nth-child(3) > .radio-inline > input').click()


                                                                    var randomAid = Math.floor(Math.random() * 11);


                                                                    function randomeaid(randomAid) {

                                                                        if (randomAid == 0) {
                                                                            randomAid = 1
                                                                            return randomAid
                                                                        }
                                                                        return randomAid
                                                                    }
                                                                    cy.wait(3000)
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
                                                                        cy.get(':nth-child(4) > #cancel-conflicts').click({
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
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', currentAide)



                                                                                })
                                                                            } else if (toastFirst[0] == "Invalid") {
                                                                                cy.reload()

                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)




                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', currentAide)



                                                                                })

                                                                            } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                                cy.reload()

                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)




                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', currentAide)


                                                                                })
                                                                            } else if (toastFirst[0] == "Successfully") {
                                                                                cy.reload()

                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)




                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', aidId)



                                                                                })



                                                                            }

                                                                        })




                                                                    })
                                                                })




                                                            })


                                                        })


                                                    })
                                                })

                                            } else {
                                                cy.wait(100)
                                                cy.reload()
                                                validRow()
                                            }
                                        })




                                    } else {

                                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                            force: true
                                        })
                                        cy.wait(2000)
                                        cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {

                                            if ($recomanded.children().length > 0) {


                                                cy.wait(3000)
                                                cy.reload()
                                                //here
                                                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentId) => {
                                                    const currentAide = currentId.attr('href')
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
                                                                    cy.log(start1)
                                                                    var year = parseInt(start1[2]) - 1
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
                                                                    var year = parseInt(end[2]) + 1
                                                                    var endMounth = parseInt(end[0]) + 4
                                                                    if (endMounth < 10) {
                                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                        var enddateString = endDAte
                                                                    } else if (endMounth > 12) {

                                                                        var endDAte = '04/' + end[1] + '/' + year
                                                                        var enddateString = endDAte
                                                                    } else {
                                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                        var enddateString = endDAte
                                                                    }

                                                                    return enddateString

                                                                }
                                                                cy.log(endDate(last))
                                                                cy.get('#appt-filter-date').click({
                                                                    force: true
                                                                })
                                                                cy.contains('Custom Range').click({
                                                                    force: true
                                                                })
                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {



                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                        force: true
                                                                    })
                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                                                        force: true
                                                                    })




                                                                    cy.contains('Apply').click({
                                                                        force: true
                                                                    })


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
                                                                     cy.get('input[value="Reset"]').first().click({
                                                                        force: true
                                                                    })
                                                                    cy.get('#appt-search').type(appointmentNumber)

                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()



                                                                    cy.get(':nth-child(1) > :nth-child(2) > .editable-click').click({
                                                                        force: true
                                                                    })
                                                                    cy.wait(500)
                                                                    cy.get(':nth-child(3) > .radio-inline > input').click()


                                                                    var randomAid = Math.floor(Math.random() * 11);


                                                                    function randomeaid(randomAid) {

                                                                        if (randomAid == 0) {
                                                                            randomAid = 1
                                                                            return randomAid
                                                                        }
                                                                        return randomAid
                                                                    }
                                                                    cy.wait(3000)
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
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', currentAide)



                                                                                })
                                                                            } else if (toastFirst[0] == "Invalid") {
                                                                                cy.reload()

                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)




                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', currentAide)



                                                                                })

                                                                            } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                                cy.reload()

                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)




                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', currentAide)


                                                                                })
                                                                            } else if (toastFirst[0] == "Successfully") {
                                                                                cy.reload()

                                                                                const arrayeAppo = appointments.text().split('#')
                                                                                const arrayeAppoLast = arrayeAppo.shift()
                                                                                cy.log(arrayeAppoLast)




                                                                                cy.log(arrayeAppo)
                                                                                cy.get('#appt-assignment_id').clear({
                                                                                    force: true
                                                                                })
                                                                                cy.get('#appt-search').clear({
                                                                                    force: true
                                                                                }).type(appointmentNumber)
                                                                                cy.log()
                                                                                cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                    force: true
                                                                                })
                                                                                cy.get('strong > small').invoke('text').then((text1) => {
                                                                                    var fullText = text1;
                                                                                    var pattern = /[0-9]+/g;
                                                                                    var assignmentNumber = fullText.match(pattern).toString();
                                                                                    cy.get('#appt-search').clear({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-assignment_id').clear({
                                                                                        force: true
                                                                                    }).type(assignmentNumber)

                                                                                    cy.get('#appt-search').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('#appt-filter-date').click({
                                                                                        force: true
                                                                                    })

                                                                                    cy.contains('Custom Range').click({
                                                                                        force: true
                                                                                    })
                                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {

                                                                                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.contains('Apply').click({
                                                                                            force: true
                                                                                        })



                                                                                    })
                                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                    cy.log(assignmentNumber)
                                                                                    cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {


                                                                                    }).should('have.attr', 'href').and('contain', aidId)



                                                                                })



                                                                            }

                                                                        })




                                                                    })
                                                                })




                                                            })


                                                        })


                                                    })
                                                })

                                            } else {
                                                cy.wait(100)
                                                cy.reload()
                                                validRow()
                                            }
                                        })




                                    } 


                                })
                            })



                        })




                    })
                })




            }


            validRow()



        })


    })
    //done
    it('change All - From Selected Week Forward - connected-testing.com:90', function() {

        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        }).then(() => {


            const validRow = () => {


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
                cy.wait(5000)
                 cy.get('input[value="Reset"]').first().click({
                    force: true
                })
                cy.get('#appt-filter-date').click({
                    force: true
                }).then(($dates) => {
                    var datestext = $dates.attr('value')
                    var dateArray = datestext.split(' - ')
                    cy.log(dateArray)
                    const first = dateArray[0]
                    const last = dateArray[1]
                    cy.wait(3000)
                    cy.contains('Custom Range').click({
                        force: true
                    })
                    cy.get('.left > .calendar-table > .table-condensed > tbody > :nth-child(4) > .available').then(() => {

                        cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.in-range').last().then((data) => {

                            const title = data.attr('data-title')
                            const splitedTitle = Array.from(title)
                            cy.log(splitedTitle)
                            cy.log()
                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                force: true
                            })
                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                force: true
                            })

                            cy.contains('Apply').click({
                                force: true
                            })
                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                force: true
                            })

                            //***may be usefull in future***

                            // function StartPoint(splitedTitle) {
                            //     var startDayRow = splitedTitle[1]
                            //     var startday = parseInt(splitedTitle[3]) + 1
                            //     if (startday >= 6) {
                            //         var startday = 1
                            //         var startRow = parseInt(startDayRow) + 1
                            //         var startDate = splitedTitle[0] + startRow + splitedTitle[2] + startday
                            //         return startDate
                            //     } else if (startDayRow >= 5) {

                            //         cy.get('.left > .calendar-table > .table-condensed > thead > :nth-child(1) > .next > .fa').click()

                            //         var startDate = splitedTitle[0] + 0 + splitedTitle[2] + startday

                            //         return startDate

                            //     } else {

                            //         var startDate = splitedTitle[0] + startRow + splitedTitle[2] + startday
                            //         return startDate
                            //     }



                            // }


                            cy.get('#appt-filter-date').then((filterdate) => {

                                const dateValue = filterdate.attr('value')
                                cy.log(dateValue)
                                cy.wait(3000)

                                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').invoke('text').then((aidcurrentname) => {
                                    cy.log(aidcurrentname)
                                    var newwcurrentname = aidcurrentname.split(' ')
                                    cy.log(newwcurrentname[0])
                                    if (newwcurrentname[0] != "Open") {

                                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                            force: true
                                        })
                                        cy.wait(2000)
                                        cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {

                                            if ($recomanded.children().length > 0) {


                                                cy.wait(3000)
                                                cy.reload()
                                                //here
                                                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentId) => {
                                                    const currentAide = currentId.attr('href')
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
                                                                    cy.log(start1)
                                                                    var year = parseInt(start1[2]) - 1
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
                                                                    var year = parseInt(end[2]) + 1
                                                                    var endMounth = parseInt(end[0]) + 4
                                                                    if (endMounth < 10) {
                                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                        var enddateString = endDAte
                                                                    } else if (endMounth > 12) {

                                                                        var endDAte = '04/' + end[1] + '/' + year
                                                                        var enddateString = endDAte
                                                                    } else {
                                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                        var enddateString = endDAte
                                                                    }

                                                                    return enddateString

                                                                }
                                                                cy.log(endDate(last))
                                                                cy.get('#appt-filter-date').click({
                                                                    force: true
                                                                })
                                                                cy.contains('Custom Range').click({
                                                                    force: true
                                                                })
                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {



                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                        force: true
                                                                    })
                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                                                        force: true
                                                                    })




                                                                    cy.contains('Apply').click({
                                                                        force: true
                                                                    })


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
                                                                     cy.get('input[value="Reset"]').first().click({
                                                                        force: true
                                                                    })
                                                                    cy.get('#appt-search').type(appointmentNumber)

                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()

                                                                    cy.get('tbody > :nth-child(1) > :nth-child(7)').invoke('text').then((currentDate) => {

                                                                        cy.get(':nth-child(1) > :nth-child(2) > .editable-click').click({
                                                                            force: true
                                                                        })
                                                                        cy.wait(500)
                                                                        cy.get(':nth-child(3) > .radio-inline > input').click()
    
    
                                                                        var randomAid = Math.floor(Math.random() * 11);
    
    
                                                                        function randomeaid(randomAid) {
    
                                                                            if (randomAid == 0) {
                                                                                randomAid = 1
                                                                                return randomAid
                                                                            }
                                                                            return randomAid
                                                                        }
                                                                        cy.wait(3000)
                                                                        cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                                            var aidId = $aid.attr("href");
    
                                                                            var aidName = $aid.text()
                                                                            cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > .radio > .cb-wrapper > .checked').click({
                                                                                force: true
                                                                            })

                                                                            cy.get('#select2-dayofweek_val-container').click({
                                                                                force: true
                                                                            })
            
                                                                            const week = ['Wed', 'Mon', 'Tue', 'Fri', 'Sun', 'Thu', 'Sat']
                                                                            var day = week[Math.floor(Math.random() * week.length)];
                                                                            cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(day)
                                                                            cy.get('#select2-dayofweek_val-results > :nth-child(1)').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('#visit_duration').then((currentTime)=>{
                                                                                const currentDuration = currentTime.attr('value')
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
                                                                                cy.get(':nth-child(4) > #cancel-conflicts').click({
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
                                                                                        cy.get('#appt-search').clear({
                                                                                            force: true
                                                                                        }).type(appointmentNumber)
                                                                                        cy.log()
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                                            var fullText = text1;
                                                                                            var pattern = /[0-9]+/g;
                                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                                            cy.get('#appt-search').clear({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-assignment_id').clear({
                                                                                                force: true
                                                                                            }).type(assignmentNumber)
        
                                                                                            cy.get('#appt-search').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-filter-date').click({
                                                                                                force: true
                                                                                            })
        
                                                                                            cy.contains('Custom Range').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
        
                                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.contains('Apply').click({
                                                                                                    force: true
                                                                                                })
        
        
        
                                                                                            })
                                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                            cy.log(assignmentNumber)
                                                                                            cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                            }).should('have.attr', 'href').and('contain', currentAide)
                                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDate)
                                                                                            cy.get('tbody > tr > :nth-child(9)').each(($data) => {}).should('contain', currentDuration)
        
        
                                                                                        })
                                                                                    } else if (toastFirst[0] == "Invalid") {
                                                                                        cy.reload()
        
                                                                                        const arrayeAppo = appointments.text().split('#')
                                                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                                                        cy.log(arrayeAppoLast)
        
        
        
        
                                                                                        cy.log(arrayeAppo)
                                                                                        cy.get('#appt-assignment_id').clear({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('#appt-search').clear({
                                                                                            force: true
                                                                                        }).type(appointmentNumber)
                                                                                        cy.log()
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                                            var fullText = text1;
                                                                                            var pattern = /[0-9]+/g;
                                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                                            cy.get('#appt-search').clear({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-assignment_id').clear({
                                                                                                force: true
                                                                                            }).type(assignmentNumber)
        
                                                                                            cy.get('#appt-search').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-filter-date').click({
                                                                                                force: true
                                                                                            })
        
                                                                                            cy.contains('Custom Range').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
        
                                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.contains('Apply').click({
                                                                                                    force: true
                                                                                                })
        
        
        
                                                                                            })
                                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                            cy.log(assignmentNumber)
                                                                                            cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                            }).should('have.attr', 'href').and('contain', currentAide)
                                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDate)
                                                                                            cy.get('tbody > tr > :nth-child(9)').each(($data) => {}).should('contain', currentDuration)
        
        
                                                                                        })
        
                                                                                    } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                                        cy.reload()
        
                                                                                        const arrayeAppo = appointments.text().split('#')
                                                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                                                        cy.log(arrayeAppoLast)
        
        
        
        
                                                                                        cy.log(arrayeAppo)
                                                                                        cy.get('#appt-assignment_id').clear({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('#appt-search').clear({
                                                                                            force: true
                                                                                        }).type(appointmentNumber)
                                                                                        cy.log()
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                                            var fullText = text1;
                                                                                            var pattern = /[0-9]+/g;
                                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                                            cy.get('#appt-search').clear({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-assignment_id').clear({
                                                                                                force: true
                                                                                            }).type(assignmentNumber)
        
                                                                                            cy.get('#appt-search').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-filter-date').click({
                                                                                                force: true
                                                                                            })
        
                                                                                            cy.contains('Custom Range').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
        
                                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.contains('Apply').click({
                                                                                                    force: true
                                                                                                })
        
        
        
                                                                                            })
                                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                            cy.log(assignmentNumber)
                                                                                            cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                            }).should('have.attr', 'href').and('contain', currentAide)
                                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDate)
                                                                                            cy.get('tbody > tr > :nth-child(9)').each(($data) => {}).should('contain', currentDuration)
        
                                                                                        })
                                                                                    } else if (toastFirst[0] == "Successfully") {
                                                                                        cy.reload()
        
                                                                                        const arrayeAppo = appointments.text().split('#')
                                                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                                                        cy.log(arrayeAppoLast)
        
        
        
        
                                                                                        cy.log(arrayeAppo)
                                                                                        cy.get('#appt-assignment_id').clear({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('#appt-search').clear({
                                                                                            force: true
                                                                                        }).type(appointmentNumber)
                                                                                        cy.log()
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                                            var fullText = text1;
                                                                                            var pattern = /[0-9]+/g;
                                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                                            cy.get('#appt-search').clear({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-assignment_id').clear({
                                                                                                force: true
                                                                                            }).type(assignmentNumber)
        
                                                                                            cy.get('#appt-search').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-filter-date').click({
                                                                                                force: true
                                                                                            })
        
                                                                                            cy.contains('Custom Range').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
        
                                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.contains('Apply').click({
                                                                                                    force: true
                                                                                                })
        
        
        
                                                                                            })
                                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                            cy.log(assignmentNumber)
                                                                                            cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                            }).should('have.attr', 'href').and('contain', aidId)
                                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', day)
                                                                                            cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                                                            }).should('contain', randome(randomDuration) + .00)
        
        
        
                                                                                        })
        
        
        
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

                                            } else {
                                                cy.wait(100)
                                                cy.reload()
                                                validRow()
                                            }
                                        })




                                    } else {

                                        cy.get(':nth-child(' + randomeEl(randomElement) + ') > :nth-child(2) > .editable-click').click({
                                            force: true
                                        })
                                        cy.wait(2000)
                                        cy.get('#recommend-div > :nth-child(1) > :nth-child(1) > .form-group > :nth-child(1)> :nth-child(2)> :nth-child(1)> :nth-child(1)> :nth-child(1)').then(($recomanded) => {

                                            if ($recomanded.children().length > 0) {


                                                cy.wait(3000)
                                                cy.reload()
                                                //here
                                                cy.get('tbody > :nth-child(' + randomeEl(randomElement) + ') > :nth-child(6) > a').then((currentId) => {
                                                    const currentAide = currentId.attr('href')
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
                                                                    cy.log(start1)
                                                                    var year = parseInt(start1[2]) - 1
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
                                                                    var year = parseInt(end[2]) + 1
                                                                    var endMounth = parseInt(end[0]) + 4
                                                                    if (endMounth < 10) {
                                                                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
                                                                        var enddateString = endDAte
                                                                    } else if (endMounth > 12) {

                                                                        var endDAte = '04/' + end[1] + '/' + year
                                                                        var enddateString = endDAte
                                                                    } else {
                                                                        var endDAte = endMounth + '/' + end[1] + '/' + end[2]
                                                                        var enddateString = endDAte
                                                                    }

                                                                    return enddateString

                                                                }
                                                                cy.log(endDate(last))
                                                                cy.get('#appt-filter-date').click({
                                                                    force: true
                                                                })
                                                                cy.contains('Custom Range').click({
                                                                    force: true
                                                                })
                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {



                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                        force: true
                                                                    })
                                                                    cy.get('.left > .calendar-table > .table-condensed > tbody > tr > [data-title="' + title + '"]').click({
                                                                        force: true
                                                                    })




                                                                    cy.contains('Apply').click({
                                                                        force: true
                                                                    })


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
                                                                     cy.get('input[value="Reset"]').first().click({
                                                                        force: true
                                                                    })
                                                                    cy.get('#appt-search').type(appointmentNumber)

                                                                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()

                                                                    cy.get('tbody > :nth-child(1) > :nth-child(7)').invoke('text').then((currentDate) => {

                                                                        cy.get(':nth-child(1) > :nth-child(2) > .editable-click').click({
                                                                            force: true
                                                                        })
                                                                        cy.wait(500)
                                                                        cy.get(':nth-child(3) > .radio-inline > input').click()
    
    
                                                                        var randomAid = Math.floor(Math.random() * 11);
    
    
                                                                        function randomeaid(randomAid) {
    
                                                                            if (randomAid == 0) {
                                                                                randomAid = 1
                                                                                return randomAid
                                                                            }
                                                                            return randomAid
                                                                        }
                                                                        cy.wait(3000)
                                                                        cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > strong > a').then(($aid) => {
                                                                            var aidId = $aid.attr("href");
    
                                                                            var aidName = $aid.text()
                                                                            cy.get(':nth-child(' + randomeaid(randomAid) + ') > .thumbnail > .caption > .radio > .cb-wrapper > .checked').click({
                                                                                force: true
                                                                            })

                                                                            cy.get('#select2-dayofweek_val-container').click({
                                                                                force: true
                                                                            })
            
                                                                            const week = ['Wed', 'Mon', 'Tue', 'Fri', 'Sun', 'Thu', 'Sat']
                                                                            var day = week[Math.floor(Math.random() * week.length)];
                                                                            cy.get('.select2-dropdown > .select2-search > .select2-search__field').type(day)
                                                                            cy.get('#select2-dayofweek_val-results > :nth-child(1)').click({
                                                                                force: true
                                                                            })
                                                                            cy.get('#visit_duration').then((currentTime)=>{
                                                                                const currentDuration = currentTime.attr('value')
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
                                                                                cy.get(':nth-child(4) > #cancel-conflicts').click({
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
                                                                                        cy.get('#appt-search').clear({
                                                                                            force: true
                                                                                        }).type(appointmentNumber)
                                                                                        cy.log()
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                                            var fullText = text1;
                                                                                            var pattern = /[0-9]+/g;
                                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                                            cy.get('#appt-search').clear({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-assignment_id').clear({
                                                                                                force: true
                                                                                            }).type(assignmentNumber)
        
                                                                                            cy.get('#appt-search').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-filter-date').click({
                                                                                                force: true
                                                                                            })
        
                                                                                            cy.contains('Custom Range').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
        
                                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.contains('Apply').click({
                                                                                                    force: true
                                                                                                })
        
        
        
                                                                                            })
                                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                            cy.log(assignmentNumber)
                                                                                            cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                            }).should('have.attr', 'href').and('contain', currentAide)
                                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDate)
                                                                                            cy.get('tbody > tr > :nth-child(9)').each(($data) => {}).should('contain', currentDuration)
        
        
                                                                                        })
                                                                                    } else if (toastFirst[0] == "Invalid") {
                                                                                        cy.reload()
        
                                                                                        const arrayeAppo = appointments.text().split('#')
                                                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                                                        cy.log(arrayeAppoLast)
        
        
        
        
                                                                                        cy.log(arrayeAppo)
                                                                                        cy.get('#appt-assignment_id').clear({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('#appt-search').clear({
                                                                                            force: true
                                                                                        }).type(appointmentNumber)
                                                                                        cy.log()
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                                            var fullText = text1;
                                                                                            var pattern = /[0-9]+/g;
                                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                                            cy.get('#appt-search').clear({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-assignment_id').clear({
                                                                                                force: true
                                                                                            }).type(assignmentNumber)
        
                                                                                            cy.get('#appt-search').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-filter-date').click({
                                                                                                force: true
                                                                                            })
        
                                                                                            cy.contains('Custom Range').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
        
                                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.contains('Apply').click({
                                                                                                    force: true
                                                                                                })
        
        
        
                                                                                            })
                                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                            cy.log(assignmentNumber)
                                                                                            cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                            }).should('have.attr', 'href').and('contain', currentAide)
                                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDate)
                                                                                            cy.get('tbody > tr > :nth-child(9)').each(($data) => {}).should('contain', currentDuration)
        
        
                                                                                        })
        
                                                                                    } else if ($toast.text() == "The Aide does not have an active wage for this service.") {
                                                                                        cy.reload()
        
                                                                                        const arrayeAppo = appointments.text().split('#')
                                                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                                                        cy.log(arrayeAppoLast)
        
        
        
        
                                                                                        cy.log(arrayeAppo)
                                                                                        cy.get('#appt-assignment_id').clear({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('#appt-search').clear({
                                                                                            force: true
                                                                                        }).type(appointmentNumber)
                                                                                        cy.log()
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                                            var fullText = text1;
                                                                                            var pattern = /[0-9]+/g;
                                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                                            cy.get('#appt-search').clear({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-assignment_id').clear({
                                                                                                force: true
                                                                                            }).type(assignmentNumber)
        
                                                                                            cy.get('#appt-search').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-filter-date').click({
                                                                                                force: true
                                                                                            })
        
                                                                                            cy.contains('Custom Range').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
        
                                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.contains('Apply').click({
                                                                                                    force: true
                                                                                                })
        
        
        
                                                                                            })
                                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                            cy.log(assignmentNumber)
                                                                                            cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                            }).should('have.attr', 'href').and('contain', currentAide)
                                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', currentDate)
                                                                                            cy.get('tbody > tr > :nth-child(9)').each(($data) => {}).should('contain', currentDuration)
        
                                                                                        })
                                                                                    } else if (toastFirst[0] == "Successfully") {
                                                                                        cy.reload()
        
                                                                                        const arrayeAppo = appointments.text().split('#')
                                                                                        const arrayeAppoLast = arrayeAppo.shift()
                                                                                        cy.log(arrayeAppoLast)
        
        
        
        
                                                                                        cy.log(arrayeAppo)
                                                                                        cy.get('#appt-assignment_id').clear({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('#appt-search').clear({
                                                                                            force: true
                                                                                        }).type(appointmentNumber)
                                                                                        cy.log()
                                                                                        cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click({
                                                                                            force: true
                                                                                        })
                                                                                        cy.get('strong > small').invoke('text').then((text1) => {
                                                                                            var fullText = text1;
                                                                                            var pattern = /[0-9]+/g;
                                                                                            var assignmentNumber = fullText.match(pattern).toString();
                                                                                            cy.get('#appt-search').clear({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-assignment_id').clear({
                                                                                                force: true
                                                                                            }).type(assignmentNumber)
        
                                                                                            cy.get('#appt-search').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('#appt-filter-date').click({
                                                                                                force: true
                                                                                            })
        
                                                                                            cy.contains('Custom Range').click({
                                                                                                force: true
                                                                                            })
                                                                                            cy.get('.left > .calendar-table > .table-condensed > tbody > tr > td').then(() => {
        
                                                                                                cy.get('.left > .calendar-table > .table-condensed > tbody > tr >.today').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > thead > :nth-child(1) > .next').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.get('.right > .calendar-table > .table-condensed > tbody > :nth-child(4) > [data-title="r3c4"]').click({
                                                                                                    force: true
                                                                                                })
                                                                                                cy.contains('Apply').click({
                                                                                                    force: true
                                                                                                })
        
        
        
                                                                                            })
                                                                                            cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                                                                                            cy.log(assignmentNumber)
                                                                                            cy.get('tbody > tr > :nth-child(6) > a').each(($editedRow) => {
        
        
                                                                                            }).should('have.attr', 'href').and('contain', aidId)
                                                                                            cy.get('tbody > tr > :nth-child(7)').each(($data) => {}).should('contain', day)
                                                                                            cy.get('tbody > tr > :nth-child(9)').each(($date) => {

                                                                                            }).should('contain', randome(randomDuration) + .00)
        
        
        
                                                                                        })
        
        
        
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

                                            } else {
                                                cy.wait(100)
                                                cy.reload()
                                                validRow()
                                            }
                                        })




                                    }


                                })
                            })



                        })




                    })
                })




            }


            validRow()



        })


    })


})