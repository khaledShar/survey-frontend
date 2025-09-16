// https://on.cypress.io/api

describe('Team Survey', () => {
  const SURVEY_ID = 1

  it('fills out the survey and sees results', () => {
    cy.visit(`/surveys/${SURVEY_ID}`)

    cy.get('[type="radio"]').then(radios => {
      for (let i = 0; i < radios.length; i += 5) {
        cy.wrap(radios[i + 2]).click()
      }
    })

    cy.contains('button', 'Submit').click()

    cy.url().should('include', `/surveys/${SURVEY_ID}/results`)

    cy.get('table').should('exist')
    cy.get('table tbody tr').should('have.length', 5)
  })
})
