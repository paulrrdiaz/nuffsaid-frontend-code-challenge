describe('Messages Lists', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show the page with all its elements', () => {
    const pauseButton = cy.findByText('pause').parent();
    pauseButton.should('have.length', 1);
    pauseButton.click();

    const resumeButton = cy.findByText('resume').parent();
    resumeButton.should('have.length', 1);
    resumeButton.click();

    const clearMessagesButton = cy.findByText('Clear all messages');
    clearMessagesButton.should('have.length', 1);
  });

  it('should render MessagesItem component Total times', () => {
    cy.wait(5000);

    const pauseButton = cy.findByText('pause').parent();
    pauseButton.click();

    cy.findByTestId('total').then(($total) => {
      const total = Number($total.text());
      const messagesItems = cy.findAllByTestId('MessagesItem');
      messagesItems.should('have.length', $total.text());
      expect(total).be.greaterThan(0);
    });
  });
});
