/// <reference types="cypress" />

const SELECTORS = {
  modal: '[data-testid="modal"]',
  modalClose: '[data-testid="modal-close"]',
  modalOverlay: '[data-testid="modal-overlay"]',
  orderButton: '[data-testid="order-button"]',
  addIngredient: (id: string) => `[data-testid="add-ingredient-${id}"] button`,
  ingredientLink: (id: string) => `[data-testid="ingredient-link-${id}"]`,
  ingredient: (id: string) => `[data-testid="ingredient-${id}"]`
};

const closeModalByOverlay = () => cy.get(SELECTORS.modalOverlay).click({ force: true });
const closeModalByButton = () => cy.get(SELECTORS.modalClose).click({ force: true });
const assertModalClosed = () => cy.get(SELECTORS.modal).should('not.exist');

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

    cy.visit('/');

    cy.setCookie('accessToken', 'aaa.bbb.ccc');

    localStorage.setItem('refreshToken', 'mock-refresh-token');

    cy.getCookie('accessToken').should('exist');

    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Добавление ингредиентов', () => {
    cy.get(SELECTORS.ingredient('643d69a5c3f7b9001cfa093c'))
      .find('p')
      .last()
      .invoke('text')
      .then((bunName) => {
        const bun = bunName.trim();
        cy.get(SELECTORS.addIngredient('643d69a5c3f7b9001cfa093c')).as('addBun');
        cy.get('@addBun').click();
        cy.get('[data-testid="constructor-root"]').contains(bun).should('exist');
      });

    cy.get(SELECTORS.ingredient('643d69a5c3f7b9001cfa0941'))
      .find('p')
      .last()
      .invoke('text')
      .then((fillingName) => {
        const filling = fillingName.trim();
        cy.get(SELECTORS.addIngredient('643d69a5c3f7b9001cfa0941')).as('addFilling');
        cy.get('@addFilling').click();
        cy.get('[data-testid="constructor-list"]').contains(filling).should('exist');
      });
  });

  it('Работа модалок', () => {
    cy.get(SELECTORS.ingredientLink('643d69a5c3f7b9001cfa0941')).as('linkFilling');
    cy.get('@linkFilling').click({force: true});
    cy.get(SELECTORS.modal, {timeout: 3000}).as('modal').should('be.visible');
    cy.get(SELECTORS.modalClose).as('modalClose');
    cy.get('@modalClose').click();
    assertModalClosed();

    cy.get(SELECTORS.ingredientLink('643d69a5c3f7b9001cfa093e')).as('linkFilet');
    cy.get('@linkFilet').click({ force: true });
    cy.get('@modal').should('be.visible');
    cy.get(SELECTORS.modalOverlay).as('overlay');
    cy.get('@overlay').click({ force: true });
    assertModalClosed();
  });

  it('Создание заказа', () => {
    cy.get(SELECTORS.addIngredient('643d69a5c3f7b9001cfa093c')).as('addBun');
    cy.get('@addBun').click();

    cy.get(SELECTORS.addIngredient('643d69a5c3f7b9001cfa0941')).as('addFilet');
    cy.get('@addFilet').click();

    cy.get(SELECTORS.orderButton).as('orderBtn');

    cy.get(SELECTORS.ingredient('643d69a5c3f7b9001cfa093c')).find('p').invoke('text').as('bunName');
    cy.get(SELECTORS.ingredient('643d69a5c3f7b9001cfa0941')).find('p').invoke('text').as('filetName');

    cy.get('@orderBtn').click({ force: true });

    cy.wait('@createOrder', { timeout: 20000 });

    cy.get(SELECTORS.modal).as('modal').should('contain', '96097');
    cy.get(SELECTORS.modalOverlay).as('overlay').click({ force: true });
    assertModalClosed();

    cy.get('[data-testid="constructor-root"]').contains('Выберите булки').should('exist');
    cy.get('[data-testid="constructor-list"]').contains('Выберите начинку').should('exist');

    cy.get('@bunName').then((bn: unknown) => {
      const name = String(bn).trim();
      cy.get('[data-testid="constructor-root"]').contains(name).should('not.exist');
    });

    cy.get('@filetName').then((fn: unknown) => {
      const name = String(fn).trim();
      cy.get('[data-testid="constructor-list"]').contains(name).should('not.exist');
    });
  });
});
