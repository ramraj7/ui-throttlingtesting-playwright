import test from "@playwright/test";
import { CommonMethods } from "../utilities/CommonMethods";
const fs = require("fs").promises;

test.describe("3G Performance Throttling Testing", () => {
  test("3G Throttling Performance Test", async ({ page }) => {
    const commonMethods = new CommonMethods(page);

    // Emulates 3G network
    commonMethods.set3GNetwork(page);

    const startTime = performance.now();

    await page.goto("https://www.amazon.com");
    await page.waitForLoadState("domcontentloaded");

    const loadTime = performance.now() - startTime;
    console.log(`Full Load Time: ${loadTime}`);

    const navigationJson = await page.evaluate(() =>
      JSON.stringify(performance.getEntriesByType("navigation"))
    );

    const navigationTiming = JSON.parse(navigationJson);

    console.log(`DOM Content Loaded: ${navigationTiming[0].domContentLoadedEventEnd}`);
    console.log(`Time taken for DOM Content Interaction: ${navigationTiming[0].domInteractive}`);

    // Capture loading time for each resource
    const resources = await page.evaluate(() => {
      return performance.getEntriesByType("resource").map(resource => ({
        name: resource.name,
        duration: resource.duration.toFixed(2),
      }));
    });

    console.log(resources);

    // Adding the result to a JSON file
    const results = { resources, loadTime };
    await fs.writeFile(
      "./performance-testresult/performance-results-3g-network-throttling.json",
      JSON.stringify(results, null, 2)
    );
  });

  test("3G Throttling Performance Test - Blocked Images", async ({ page }) => {
    const commonMethods = new CommonMethods(page);

    // Emulates 3G network
    commonMethods.set3GNetwork(page);

    // Blocks image resources from the page
    commonMethods.blockImages(page);

    const startTime = performance.now();

    await page.goto("https://www.amazon.com");
    await page.waitForLoadState("domcontentloaded");

    const loadTime = performance.now() - startTime;
    console.log(`Full Load Time: ${loadTime}`);

    const navigationJson = await page.evaluate(() =>
      JSON.stringify(performance.getEntriesByType("navigation"))
    );

    const navigationTiming = JSON.parse(navigationJson);

    console.log(`DOM Content Loaded: ${navigationTiming[0].domContentLoadedEventEnd}`);
    console.log(`Time taken for DOM Content Interaction: ${navigationTiming[0].domInteractive}`);

    // Capture loading time for each resource
    const resources = await page.evaluate(() => {
      return performance.getEntriesByType("resource").map(resource => ({
        name: resource.name,
        duration: resource.duration.toFixed(2),
      }));
    });

    console.log(resources);

    // Adding the result to a JSON file
    const results = { resources, loadTime };
    await fs.writeFile(
      "./performance-testresult/performance-results-3g-network-throttling-blocked-images.json",
      JSON.stringify(results, null, 2)
    );
  });
});