
// Helpers for testing offline functionality
const goOffline = () => {
  cy.log('**go offline**')
  .then(() => {
    return Cypress.automation('remote:debugger:protocol',
      {
        command: 'Network.enable',
      })
  })
  .then(() => {
    return Cypress.automation('remote:debugger:protocol',
      {
        command: 'Network.emulateNetworkConditions',
        params: {
          offline: true,
          latency: -1,
          downloadThroughput: -1,
          uploadThroughput: -1,
        },
      })
  })
}
const goOnline = () => {
  // disable offline mode, otherwise we will break our tests :)
  cy.log('**go online**')
  .then(() => {
    // https://chromedevtools.github.io/devtools-protocol/1-3/Network/#method-emulateNetworkConditions
    return Cypress.automation('remote:debugger:protocol',
      {
        command: 'Network.emulateNetworkConditions',
        params: {
          offline: false,
          latency: -1,
          downloadThroughput: -1,
          uploadThroughput: -1,
        },
      })
  })
  .then(() => {
    return Cypress.automation('remote:debugger:protocol',
      {
        command: 'Network.disable',
      })
  })
}

beforeEach(goOnline);
afterEach(goOnline);

// These tests require the TMDB API to be mocked, make sure 
// the environment variable NEXT_PUBLIC_API_MOCKING=enabled is set
describe('Network offline test', () => {
  it('Should deliver cached data when offline', () => {
    cy.visit('http://localhost:3000');
    goOffline();
    cy.visit('http://localhost:3000');
    cy.findByRole('list').find('li').should('have.length', 20);
    //cy.wait('@trending').its('response.statusCode').should('eq', 304);
  })
})
