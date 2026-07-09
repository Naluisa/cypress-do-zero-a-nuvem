Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Teste de nome')
    cy.get('#lastName').type('Teste sobrenome')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('Teste feedback')
    cy.get('.button').click()
})

Cypress.Commands.add('CamposObrigatoriosNaoPreenchidos', () => {
    cy.get('#firstName').clear()
    cy.get('#lastName').clear()
    cy.get('#email').clear()
    cy.get('#open-text-area').clear()
    cy.get('.button').click()
})

Cypress.Commands.add('PassaValores', (dados) => {
    cy.get('#firstName').type(dados.nome)
    cy.get('#lastName').type(dados.sobrenome)
    cy.get('#email').type(dados.email)
    cy.get('#open-text-area').type(dados.texto)
    cy.get('.button').click()
})