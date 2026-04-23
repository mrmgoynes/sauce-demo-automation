import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Login Functionality', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();

    });

    test('should login successfully with valid credentials', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');

        //Verify successful login
        await expect(page).toHaveURL(/inventory.html/);

    });

    test('should show error with invalid credentials', async ({ page }) => {
        await loginPage.login('wrong_user', 'wrong_password');

        const errorContainer = page.locator('[data-test="error"]');
        await expect(errorContainer).toContainText('Username and password do not match any user in this service');

    });

    test('should show error for  locked out user', async ({ page }) => {
        await loginPage.login('locked_out_user', 'secret_sauce');

        const errorContainer = page.locator('[data-test="error"]');
        await expect(errorContainer).toContainText('Epic sadface: Sorry, this user has been locked out.');

    });

    test('should show error for empty username', async ({ page }) => {
        await loginPage.login('', 'secret_sauce');

        const errorContainer = page.locator('[data-test="error"]');
        await expect(errorContainer).toContainText('Epic sadface: Username is required');

    });

    test('should show error for empty password', async ({ page }) => {
        await loginPage.login('standard_user', '');

        const errorContainer = page.locator('[data-test="error"]');
        await expect(errorContainer).toContainText('Epic sadface: Password is required');

    });

    test('should be case sensitive for username', async ({ page }) => {
        await loginPage.login('STANDARD_USER', 'secret_sauce');

        const errorContainer = page.locator('[data-test="error"]');
        await expect(errorContainer).toContainText('Epic sadface: Username and password do not match any user in this service');
    });

});

test.describe('Add item to cart', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('should add backpack to cart and verify', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addBackpackToCart();
        await inventoryPage.goToCart();

        //Verify backpack is in the cart
        const itemName = await cartPage.verifyItemInCart();
        expect(itemName).toBe('Sauce Labs Backpack');

    });

    test('should remove backpack from cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addBackpackToCart();

        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

        //Go to the cart to verify it's empty
        await inventoryPage.goToCart();

        //Verify backpack is no longer in the cart
        await expect(page.locator('.cart_item')).toHaveCount(0);

    });

    test('add multiple items to cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addBackpackToCart();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await inventoryPage.goToCart();

        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
        //Verify backpack is in the cart
        const cartList = page.locator('.cart_list');
        await expect(cartList).toContainText('Sauce Labs Backpack');
        await expect(cartList).toContainText('Sauce Labs Bike Light');

    });

});