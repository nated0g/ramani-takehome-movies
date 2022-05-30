// These tests require the TMDB API to be mocked, make sure 
// the environment variable NEXT_PUBLIC_API_MOCKING=enabled is set
describe('Filter test', () => {
  it('Should filter by genre', () => {
    cy.visit('http://localhost:3000');

    cy.intercept('/api/genres').as('genres');
    cy.wait('@genres')
    // Full list should have 20 items
    cy.findByRole('list').find('li').should('have.length', 20);

    // Open the Genre filter menu
    cy.findByRole('button', {
      name: /select one or more genres/i
    }).click();
    // All genres should be rendered in filter listbox
    cy.findByRole('listbox').find('li').should('have.length', 19)

    // Select the Genre "Action"
    cy.findByText(/action/i).click();

    // Result should be filtered to 11 items
    cy.findByRole('list').find('li').should('have.length', 11);

    // Click the close button on the "Action" filter 
    cy.get('#Action > button').click();
    // List should have 20 elements again
    cy.findByRole('list').find('li').should('have.length', 20);

  })

  it('Should filter by media type', () => {
    cy.visit('http://localhost:3000');

    // Full list should have 20 items
    cy.findByRole('list').find('li').should('have.length', 20);

    // Remove movies from filter list
    cy.get('#movie > button').click();

    // Should filter to 5 items
    cy.findByRole('list').find('li').should('have.length', 5);

  })
})

describe('Modal test', () => {
  it('Should open the correct modal when item is clicked', () => {
    cy.visit('http://localhost:3000');
    // Open modal on first item
    cy.get('div:nth-child(1) > .relative > .group > .absolute').click();
    // Item should be Top Gun
    cy.get(':nth-child(2) > :nth-child(1) > .text-xl').should('have.text', 'Top Gun: Maverick');
  })

  it('Should close the modal when "x" is clicked', () => {
    cy.visit('http://localhost:3000');
    // Open modal on first item
    cy.get('div:nth-child(1) > .relative > .group > .absolute').click();
    // Close the modal
    cy.get('.h-6 > path').click();
    cy.get(':nth-child(2) > :nth-child(1) > .text-xl').should('not.exist');
  })
})

describe('Search test', () => {
  it('Should display the correct number of search suggestions', () => {
    cy.visit('http://localhost:3000');
    // Open modal on first item
    cy.get('#headlessui-combobox-input-1').type('lo');
    cy.findByRole('listbox').find('li').should('have.length', 4)
    // Item should be Top Gun
  })


  it('Should open a modal for the selected item', () => {
    cy.visit('http://localhost:3000');
    // Open modal on first item
    cy.get('#headlessui-combobox-input-1').type('lo');
    cy.findByRole('option', {
      name: /halo/i
    }).click();
    cy.findByRole('heading', {
      name: /halo/i
    }).should('exist');
    // Item should be Top Gun
  })
})


