const {
    forEach
} = require("lodash")
///<reference types = "Cypress" />

describe('log in and go to billing and change servicd/price  ', function() {
    beforeEach("viewport", function() {
        cy.viewport(1280, 720)
        cy.visit(Cypress.env("baseUrl"))



        cy.get('#email').type(Cypress.env('username'))
        cy.get('#password').type(Cypress.env('password'), { log: false })
        cy.get('.btn').click()
        Cypress.on('uncaught:exception', (err, runnable) => {

            return false
        });
    })

    it.skip('billing - only this visit  - conected-testing.com', function() {
     

      
        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        })

        const numbers = [1]

        function addNumber(numbers) {
            let arr1 = [];
            for (let i = 1; i <= 50; i++) {
                if (i === 1) {
                    i = 1
                } else {
                    i = i + 2
                }

                arr1.push((i))
            }
            return arr1
            // 
            // return randomElement;
        }
        cy.log(addNumber(numbers))
        const randomElement = addNumber(numbers)[Math.floor(Math.random() * addNumber(numbers).length)];
        cy.get(':nth-child('+ randomElement +') > :nth-child(2) > .btn').invoke('text').then((text) => {
            var fullText = text;
            var pattern = /[0-9]+/g;
            var appointmentNumber = fullText.match(pattern).toString();


            cy.get(':nth-child(' + randomElement + ') > :nth-child(1) > .cid').click()
            cy.get('.col-md-7 > .btn-group > .btn-success').click()
            cy.get('#changeservicebtn').click({force: true})
            cy.get(':nth-child(3) > :nth-child(3) > label > input').click()
            cy.get('#select2-authorization_id-container').click()
            var lis = [];
            cy.get('#select2-authorization_id-results> li').each(function($item ,$lis){

                  lis.push($item)
                 
            }).then(()=>{
                lis.shift()
                var targetLi = lis[Math.floor(Math.random()*lis.length)];
                if(targetLi == lis[0]){
                    lis[0] = lis[1]
                }
                cy.log(lis)
                cy.log(targetLi)
               
               var id = targetLi.attr('id')
               cy.log(id)
              
               cy.get('#'+id).click({force: true})
               var authName = targetLi.text()
             var arrAuthName =  authName.split(' |')
               var authUsableName = arrAuthName[0]
               cy.log(authUsableName)
               cy.get('div[style="margin-top:50px;"] > :nth-child(2) > label > input').click()
               cy.get('.modal-footer>:nth-child(1)>:nth-child(1)>:nth-child(1)').click()
               cy.get('.toast-message').then(($toastMessege)=>{
                   if($toastMessege.text() === 'The Caregiver does not have a valid wage for this service.'){
                    cy.get('#confirmation_checkbox_container > input').click()
                    cy.get('.modal-footer>:nth-child(1)>:nth-child(1)>:nth-child(1)').click()
                    cy.reload()
                    cy.get('#appt-search').type(appointmentNumber)
                    cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                    cy.log('error')
                    cy.get(':nth-child(1) > :nth-child(8) > .text-green-3 > a').should('contain',authUsableName)
                   
                   }else{
                      cy.reload()
                       cy.get('#appt-search').type(appointmentNumber)
                       cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                       cy.log(authUsableName)
                       cy.get(':nth-child(1) > :nth-child(8) > .text-green-3 > a').should('contain',authUsableName)
                   }
               
               })
         

            })
     

          
           
        
        })


    })

    
    it.skip('billing- from this visit forward - conected-testing.com', function() {
     

      
        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        })

        const numbers = [1]

        function addNumber(numbers) {
            let arr1 = [];
            for (let i = 1; i <= 50; i++) {
                if (i === 1) {
                    i = 1
                } else {
                    i = i + 2
                }

                arr1.push((i))
            }
            return arr1
            // 
            // return randomElement;
        }
        function randomeEl(randomElement) {

            if (randomElement === 0) {
              randomElement = 1
              return randomElement
            }
            return randomElement
          }
        cy.log(addNumber(numbers))
        const randomElement = addNumber(numbers)[Math.floor(Math.random() * addNumber(numbers).length)];
        cy.get(':nth-child('+ randomeEl(randomElement) +') > :nth-child(2) > .btn').invoke('text').then((text) => {
            var fullText = text;
            var pattern = /[0-9]+/g;
            var appointmentNumber = fullText.match(pattern).toString();
            cy.get(':nth-child('+randomeEl(randomElement)+') > :nth-child(2) > strong > small').invoke('text').then((smalltext) => {
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
                      var startmounth1 = parseInt(start1[0])
                      if (startmounth1 < 10) {
                        var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
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
                      if (endMounth < 10) {
                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
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
                    cy.get('.show-calendar > .ranges > .range_inputs > .applyBtn').click()
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
                      cy.get(':nth-child(2) > .col-md-12 > .btn-orange').click({
                        force: true
                      })
                      cy.get('#appt-search').type(appointmentNumber)
    
                      cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                      cy.get('.cid').click({force:true})
                      cy.get('.col-md-7 > .btn-group > .btn-success').click()
                      cy.get('#changeservicebtn').click()
                      cy.get(':nth-child(3) > :nth-child(3) > label > input').click()
                      cy.get('#select2-authorization_id-container').click()
                      var lis = [];
                      cy.get('#select2-authorization_id-results> li').each(function($item ,$lis){

                        lis.push($item)
                       
                  }).then(()=>{
                    lis.shift()
                    var targetLi = lis[Math.floor(Math.random()*lis.length)];
                    if(targetLi == lis[0]){
                        lis[0] = lis[1]
                    }
                    cy.log(lis)
                    cy.log(targetLi)
                   
                   var id = targetLi.attr('id')
                   cy.log(id)
                   var authName = targetLi.text()
                   var arrAuthName =  authName.split(' |')
                     var authUsableName = arrAuthName[0]
                     cy.log(authUsableName)
                   cy.get('#'+id).click({force: true})
                   cy.get('div[style="margin-top:50px;"] > :nth-child(3) > label > input').click()
                   cy.get('.modal-footer>:nth-child(1)>:nth-child(1)>:nth-child(1)').click()
                   cy.get('.toast-message').then(($toastMessege)=>{
                       if($toastMessege.text() === 'The Caregiver does not have a valid wage for this service.'){
                        cy.get('#confirmation_checkbox_container > input').click()
                        cy.get('.modal-footer>:nth-child(1)>:nth-child(1)>:nth-child(1)').click()
                      
                      
                       
                       }else{
                       
                          
                      
                       }
                   
                   })
                   cy.reload()
                   cy.get('#appt-assignment_id').clear()
                   cy.get('#appt-search').clear().type(appointmentNumber)
                   cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                    force: true
                  })
                  cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                  cy.get('strong > small').invoke('text').then((newassignment)=>{
                    var fullTextSmll = newassignment;
                    var pattern = /[0-9]+/g;
                    var asignmentNumbernew = fullTextSmll.match(pattern).toString(); 
                     cy.get('#appt-assignment_id').type(asignmentNumbernew, {
                  force: true
                   })
                  cy.get('#appt-search').clear()
                  cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()

                  })
                  cy.get('tr > :nth-child(8) > .text-green-3 > a').each(($element)=>{
                   
                  }).should('contain',authUsableName)
    
                  })
               
    
                  
                    })
                   
                  
  
  
                  })


              })

      
     

          
           
        
        })


    })

    it.skip('billing- all visites assigned to this auth  - conected-testing.com', function() {
     

      
        cy.get('.navbar-right > :nth-child(1) > a').should('contain', 'Dashboard')
        cy.get(':nth-child(1) > .multi-column-dropdown > :nth-child(2) > a').click({
            force: true
        })

        const numbers = [1]

        function addNumber(numbers) {
            let arr1 = [];
            for (let i = 1; i <= 50; i++) {
                if (i === 1) {
                    i = 1
                } else {
                    i = i + 2
                }

                arr1.push((i))
            }
            return arr1
            // 
            // return randomElement;
        }
        function randomeEl(randomElement) {

            if (randomElement === 0) {
              randomElement = 1
              return randomElement
            }
            return randomElement
          }
        cy.log(addNumber(numbers))
        const randomElement = addNumber(numbers)[Math.floor(Math.random() * addNumber(numbers).length)];
        cy.get(':nth-child('+ randomeEl(randomElement) +') > :nth-child(2) > .btn').invoke('text').then((text) => {
            var fullText = text;
            var pattern = /[0-9]+/g;
            var appointmentNumber = fullText.match(pattern).toString();
            cy.get(':nth-child('+randomeEl(randomElement)+') > :nth-child(2) > strong > small').invoke('text').then((smalltext) => {
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
                      var startmounth1 = parseInt(start1[0])-3
                      if (startmounth1 < 10) {
                        var startdate1 = '0' + startmounth1 + '/' + start1[1] + '/' + start1[2]
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
                      if (endMounth < 10) {
                        var endDAte = '0' + endMounth + '/' + end[1] + '/' + end[2]
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
                    cy.get('.show-calendar > .ranges > .range_inputs > .applyBtn').click()
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
                      cy.get(':nth-child(2) > .col-md-12 > .btn-orange').click({
                        force: true
                      })
                      cy.get('#appt-search').type(appointmentNumber)
    
                      cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                      cy.get('.cid').click({force:true})
                      cy.get('.col-md-7 > .btn-group > .btn-success').click()
                      cy.get('#changeservicebtn').click()
                      cy.get(':nth-child(3) > :nth-child(3) > label > input').click()
                      cy.get('#select2-authorization_id-container').click()
                      var lis = [];
                      cy.get('#select2-authorization_id-results> li').each(function($item ,$lis){

                        lis.push($item)
                       
                  }).then(()=>{
                    lis.shift()
                    var targetLi = lis[Math.floor(Math.random()*lis.length)];
                    if(targetLi == lis[0]){
                        lis[0] = lis[1]
                    }
                    cy.log(lis)
                    cy.log(targetLi)
                   
                   var id = targetLi.attr('id')
                   cy.log(id)
                   var authName = targetLi.text()
                   var arrAuthName =  authName.split(' |')
                     var authUsableName = arrAuthName[0]
                     cy.log(authUsableName)
                   cy.get('#'+id).click({force: true})
                   cy.get(':nth-child(4) > label > input').click()
                   cy.get('.modal-footer>:nth-child(1)>:nth-child(1)>:nth-child(1)').click()
                   cy.get('.toast-message').then(($toastMessege)=>{
                       if($toastMessege.text() === 'The Caregiver does not have a valid wage for this service.'){
                        cy.get('#confirmation_checkbox_container > input').click()
                        cy.get('.modal-footer>:nth-child(1)>:nth-child(1)>:nth-child(1)').click()
                      
                      
                       
                       }else{
                       
                          
                      
                       }
                   
                   })
                   cy.reload()
                   cy.get('#appt-assignment_id').clear()
                   cy.get('#appt-search').clear().type(appointmentNumber)
                   cy.get('#appt-filter-date').clear().type(startDate(first) + ' - ' + endDate(last), {
                    force: true
                  })
                  cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()
                  cy.get('strong > small').invoke('text').then((newassignment)=>{
                    var fullTextSmll = newassignment;
                    var pattern = /[0-9]+/g;
                    var asignmentNumbernew = fullTextSmll.match(pattern).toString(); 
                     cy.get('#appt-assignment_id').type(asignmentNumbernew, {
                  force: true
                   })
                  cy.get('#appt-search').clear()
                  cy.get(':nth-child(2) > .col-md-12 > .btn-primary').click()

                  })
                  cy.get('tr > :nth-child(8) > .text-green-3 > a').each(($element)=>{
                   
                  }).should('contain',authUsableName)
    
                  })
               
    
                  
                    })
                   
                  
  
  
                  })


              })

      
     

          
           
        
        })


    })

    





})