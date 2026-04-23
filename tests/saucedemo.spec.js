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

});