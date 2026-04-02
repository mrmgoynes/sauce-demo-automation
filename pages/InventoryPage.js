export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.backpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.shoppingCartLink = page.locator('.shopping_cart_link')
    }

    async addBackpackToCart() {
        await this.backpackAddToCartButton.click();
    }
}