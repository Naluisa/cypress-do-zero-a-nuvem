///<reference types="Cypress"/>

describe("Central de atendimento ao cliente TAT", () => {

    beforeEach(() => cy.visit('../../src/index.html'))

    it('Verifica o título da aplicação', () => {
        cy.title().should('equals', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Teste de nome')
        cy.get('#lastName').type('Teste sobrenome')
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type('Teste feedback')
        cy.get('.button').click()

        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', () => {
        cy.get('#firstName').type('Teste de nome')
        cy.get('#lastName').type('Teste sobrenome')
        cy.get('#email').type('teste')
        cy.get('#open-text-area').type('Teste feedback')
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })

    it('Verifica se o campo telefone aceita apenas numeros', () => {
        cy.get('#phone').type('asas cxc').should('have.value', '')
    })

    it('Verifica se o telefone é obrigatório e exibe mensagem', () => {
        cy.get('#firstName').type('Teste de nome')
        cy.get('#lastName').type('Teste sobrenome')
        cy.get('#email').type('teste')
        cy.get('#open-text-area').type('Teste feedback')
        cy.get('#phone-checkbox').click()
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Teste de nome').should('have.value', 'Teste de nome')
        cy.get('#lastName').type('Teste sobrenome').should('have.value', 'Teste sobrenome')
        cy.get('#email').type('teste').should('have.value', 'teste')
        cy.get('#open-text-area').type('Teste feedback').should('have.value', 'Teste feedback')
        cy.get('#firstName').type('Teste de nome').clear().should('have.value', '')
        cy.get('#lastName').type('Teste sobrenome').clear().should('have.value', '')
        cy.get('#email').type('teste').clear().should('have.value', '')
        cy.get('#open-text-area').type('Teste feedback').clear().should('have.value', '')
        cy.get('.button').click()
    })

    it('Exibe mensagem de erro ao enviar formulario sem preencher campos obrigatorios', () => {
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia formulário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro usando um comando customizado sem preencher campos obrigatóios', () => {
        cy.CamposObrigatoriosNaoPreenchidos()
        cy.get('.error').should('be.visible')
    })

    it('Passando valores pro meu teste', () => {

        const dados = {
            nome: 'Walmyr',
            sobrenome: 'Lima e Silva Filho',
            email: 'walmyr@talkingabouttesting.com',
            texto: 'Teste'
        }

        cy.PassaValores(dados)
        cy.get('.success').should('be.visible')
    })

    it('Altera o cy.get para cy.contains', () => {

        cy.contains('button', 'Enviar').click()
    })

    it('seleciona um produto (YouTube) por seu texto', () => {

        cy.get('select').select('youtube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Blog) por seu índice', () => {

        cy.get('select').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {

        cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {

        cy.get('input[type="radio"]').check('elogio').should('have.value', 'elogio').should('be.checked')
        cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback').should('be.checked')
        cy.get('input[type="radio"]').check('ajuda').should('have.value', 'ajuda').should('be.checked')
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {

        cy.get('input[type="checkbox"]').check().should('be.checked')
        cy.get('input[type="checkbox"]').uncheck((['phone'])).last().should('not.be.checked')
    })

    it('Verifica se o telefone é obrigatório e exibe mensagem', () => {
        cy.get('#firstName').type('Teste de nome')
        cy.get('#lastName').type('Teste sobrenome')
        cy.get('#email').type('teste')
        cy.get('#open-text-area').type('Teste feedback')
        cy.get('#phone-checkbox').check()
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json').should(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }).should(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('nomeArquivo')
        cy.get('input[type="file"]').selectFile('@nomeArquivo').should(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a, Política de Privacidade').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a, Política de Privacidade').invoke('removeAttr', 'target').click()
    })

    it('testa a página da política de privacidade de forma independente', () => {
        cy.visit('../../src/privacy.html')
        cy.contains('p', 'Talking About Testing').should('be.visible')
        cy.contains('p', 'Utilzamos as tecnologias HTML').should('be.visible')
        cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    })

    it('Verifica se o telefone é obrigatório e exibe mensagem', () => {
        cy.get('#firstName').type('Teste de nome')
        cy.get('#lastName').type('Teste sobrenome')
        cy.get('#email').type('teste')
        cy.get('#open-text-area').type('Teste feedback')
        cy.get('#phone-checkbox').check()
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })

    it('exibe mensagem por 3 segundos', function () {
        cy.clock()
        cy.get('#firstName').type('Teste de nome')
        cy.get('#lastName').type('Teste sobrenome')
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type('Teste feedback')
        cy.tick(3000)
        cy.get('.button').click()

        cy.get('.success').should('be.visible')

    })

    it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche o campo da área de texto usando o comando invoke', () => {
        cy.get('#firstName').type('Teste de nome')
        cy.get('#lastName').type('Teste sobrenome')
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').invoke('val', 'Teste feedback').should('have.value', 'Teste feedback')
        cy.get('.button').click()

        cy.get('.success').should('be.visible')
    })

    it('faz uma requisição HTTP', () => {
        cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
            .as('getRequest')
            .its('status').should('be.equal', 200)

        cy.get('@getRequest')
            .its('statusText').should('be.equal', 'OK')

        cy.get('@getRequest')
            .its('body').should('include', 'CAC TAT')
    })

     it('encontre o gato escondido', () => {
        cy.get('#cat').invoke('show').should('be.visible')
        cy.get('#subtitleg').invoke('text', 'Eu amo gatos')
    })
})