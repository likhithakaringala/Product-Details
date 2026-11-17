
const { Builder, By, until } = require("selenium-webdriver");

async function testProducts() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.get("http://localhost:8085");

        const buttons = await driver.findElements(By.tagName("button"));

        console.log("Number of product buttons:", buttons.length);

        const products = ["Laptop", "Mobile Phone", "Headphones"];

        for (let i = 0; i < products.length; i++) {
            await buttons[i].click();

            let alert = await driver.wait(
                until.alertIsPresent(),
                5000
            );

            let message = await alert.getText();

            console.log(products[i] + ": " + message);

            if (!message.includes(products[i])) {
                throw new Error("Test failed for " + products[i]);
            }

            await alert.accept();
        }

        console.log("All Selenium tests passed!");

    } catch (error) {
        console.log("Test failed:", error);
        process.exitCode = 1;

    } finally {
        await driver.quit();
    }
}

testProducts();
