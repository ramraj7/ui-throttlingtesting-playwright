import { Page } from "@playwright/test";

class CommonMethods {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async emulateNetwork(page: Page, downloadThroughput: number, uploadThroughput: number, latency: number): Promise<void> {
        const client = await page.context().newCDPSession(page);
        await client.send("Network.enable");
        await client.send("Network.emulateNetworkConditions", {
            offline: false,
            downloadThroughput: downloadThroughput / 8,
            uploadThroughput: uploadThroughput / 8,
            latency: latency,
        });
    }

    async blockImages(page: Page): Promise<void> {
        await page.route("**/*", (route) => {
            return route.request().resourceType() === "image"
                ? route.abort()
                : route.continue();
        });
    }

    async set4GNetwork(page: Page): Promise<void> {
        await this.emulateNetwork(page, 4 * 1024 * 1024, 3 * 1024 * 1024, 20);
    }

    async set3GNetwork(page: Page): Promise<void> {
        await this.emulateNetwork(page, 1.5 * 1024 * 1024, 750 * 1024, 40);
    }

    async launchBrowser(url: string): Promise<void> {
        try {
            await this.page.goto(url);
            await this.page.waitForTimeout(5000);
        } catch (error) {
            console.error("Error in launchBrowser method:", error);
        }
    }

    async click(locator: string): Promise<void> {
        try {
            await this.page.click(locator);
            await this.page.waitForTimeout(5000);
        } catch (error) {
            console.error("Error in click method:", error);
        }
    }

    async enterText(locator: string, text: string): Promise<void> {
        try {
            await this.page.fill(locator, text);
            await this.page.waitForTimeout(5000);
        } catch (error) {
            console.error("Error in enterText method:", error);
        }
    }

    async getText(locator: string): Promise<string | null> {
        try {
            const text = await this.page.textContent(locator);
            return text;
        } catch (error) {
            console.error("Error in getText method:", error);
            return null;
        }
    }

    async closeBrowser(): Promise<void> {
        try {
            await this.page.close();
        } catch (error) {
            console.error("Error in closeBrowser method:", error);
        }
    }
}

export { CommonMethods };