import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Functionality', () => {

    test('should login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        //Verify succesful login
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('should show error with invlaid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('wrong_user', 'wrong_password');

        const errorContainer = page.locator('[data-test="error"]');
        await expect(errorContainer).toContainText('Username and password do not match');
    });

});