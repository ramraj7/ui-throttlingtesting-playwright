import test, { expect } from "@playwright/test";
import { CommonMethods } from "../utilities/CommonMethods";
const fs = require("fs").promises;

test("Verify load time of entire user flow", async ({ page }) => {
  let stepResults: { step: string; time: number }[] = [];
  let totalUserFlowTime = 0;
  let stepTime = 0;
  let finalResults = {};

  // Helper to measure each step
  const measureStep = async (stepName: string, stepFunction: () => Promise<void>) => {
    const commonMethods = new CommonMethods(page);

    // Emulates 3G network
    commonMethods.set3GNetwork(page);

    const startTime = performance.now();
    await stepFunction();
    const endTime = performance.now();
    stepTime = endTime - startTime;

    expect(stepTime).toBeLessThan(10000);

    const stepResult = {
      step: stepName,
      time: stepTime
    };

    stepResults.push(stepResult);
    totalUserFlowTime += stepTime;

    console.log(stepResult);

    finalResults = {
      totalFlowTime: totalUserFlowTime.toFixed(2),
      steps: stepResults,
    };
  };

  // User Flow Steps
  // Step 1: Login
  await measureStep("Login", async () => {
    await page.goto("https://www.saucedemo.com", { waitUntil: "load" });
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await page.waitForURL("**/inventory.html");
  });

  // Step 2: Browse Products
  await measureStep("Browse Products", async () => {
    await page.waitForSelector(".inventory_list");
    // Simulate scrolling or interaction
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  });

  // Step 3: Add to Cart
  await measureStep("Add to Cart", async () => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.waitForSelector(".shopping_cart_badge");
  });

  // Step 4: Checkout
  await measureStep("Checkout", async () => {
    await page.click(".shopping_cart_link");
    await page.click("#checkout");
    await page.fill("#first-name", "John");
    await page.fill("#last-name", "Doe");
    await page.fill("#postal-code", "12345");
    await page.click("#continue");
  });

  // Step 5: Order Confirmation
  await measureStep("Order Confirmation", async () => {
    await page.click("#finish");
    await page.waitForSelector(".complete-header");
  });

  console.log(`Full Result Time: ${totalUserFlowTime}`);

  await fs.writeFile(
    "./performance-testresult/multipage-performance-results.json",
    JSON.stringify(finalResults, null, 2)
  );
});