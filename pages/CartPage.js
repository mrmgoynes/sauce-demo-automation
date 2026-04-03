export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItemName = page.locator('.inventory_item_name');
    }

    async verifyItemInCart() {
        return await this.cartItemName.textContent();
    }
}