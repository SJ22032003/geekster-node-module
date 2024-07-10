import puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.flipkart.com/search?q=iphone+14");

  // Set screen size.
  await page.setViewport({ width: 1080, height: 1024 });

  // Take screenshot
  // await page.screenshot({ path: "flipkart.png" });

  // Create PDF
  // await page.pdf({ path: "flipkart.pdf", format: "A4" });
  

  // select element
  const elements = await page.$$('.CGtC98');

  for (let ele of elements) {
    const text = await page.evaluate((ele) => ele.textContent, ele);
    console.log(text);
  }



  // close the browser
  await browser.close();
})();
