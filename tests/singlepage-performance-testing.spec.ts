import test, { expect } from "@playwright/test";
const fs = require("fs").promises;

test.describe("Single Page Performance Testing", () => {
  test("Verify load time of page and page resources", async ({ page }) => {
    const startTime = performance.now();

    await page.goto("https://www.amazon.com");
    await page.waitForLoadState("domcontentloaded");

    const pageLoadTime = performance.now() - startTime;
    console.log(`Full Load Time: ${pageLoadTime}`);
    expect(pageLoadTime).toBeLessThan(10000);

    const navigationJson = await page.evaluate(() =>
      JSON.stringify(performance.getEntriesByType("navigation"))
    );

    const navigationTiming = JSON.parse(navigationJson);

    console.log(`DOM Content Loaded: ${navigationTiming[0].domContentLoadedEventEnd}`);
    expect(navigationTiming[0].domContentLoadedEventEnd).toBeLessThan(5000);

    console.log(`Time taken for DOM Content Interaction: ${navigationTiming[0].domInteractive}`);
    expect(navigationTiming[0].domInteractive).toBeLessThan(5000);

    // Capture loading time for each resource
    const resources = await page.evaluate(() => {
      return performance.getEntriesByType("resource").map(resource => ({
        name: resource.name,
        duration: resource.duration.toFixed(2),
      }));
    });

    console.log(resources);

    // Adding the result to a JSON file
    const results = { resources, pageLoadTime };
    await fs.writeFile(
      "./performance-testresult/singlepage-performance-results.json",
      JSON.stringify(results, null, 2)
    );
  });
});