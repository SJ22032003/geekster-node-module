import puppeteer from "puppeteer";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto("https://www.iplt20.com/stats/");
    await page.setViewport({ width: 1080, height: 1024 });

    // Function to scrape data for a single season and stat category
    const scrapeSeasonData = async (season, statCategory) => {
      // Select the season filter element and click
      try {
        // Example adjustment for season filter selector
        await page.waitForSelector(".cSBListItems.seasonFilterItems", {
          timeout: 60000,
        });

        await page.evaluate((season) => {
          const seasonElement = Array.from(
            document.querySelectorAll(".cSBListItems.seasonFilterItems")
          ).find((el) => el.getAttribute("data-val") === season);
          if (seasonElement) {
            seasonElement.click();
          }
        }, season);
      } catch (error) {
        console.error("Error waiting for season filter:", error);
        throw error;
      }

      // Wait for the statistic category button to load and click it
      try {
        await page.waitForSelector(".cSBListItemsFilter");
        await page.evaluate((statCategory) => {
          const statCategoryElement = Array.from(
            document.querySelectorAll(
              ".cSBListItems.batters.ng-binding.ng-scope"
            )
          ).find((el) => el.innerText.trim().includes(statCategory));
          if (statCategoryElement) {
            statCategoryElement.click();
          }
        }, statCategory);
      } catch (error) {
        console.error("Error waiting for stat category filter:", error);
        throw error;
      }

      // Wait for the table rows to load after clicking the category
      await page.waitForSelector(".statsTable > tbody > tr", {
        timeout: 60000,
      });

      // Extract data from the table (limit to top 10)

      const stats = await page.evaluate(() => {
        const rows = document.querySelectorAll(".statsTable > tbody > tr");

        const stats = [];
        rows.forEach((row, index) => {
          if (index < 10) {
            const cols = row.querySelectorAll(".ng-binding");
            const playerStat = {
              position: cols[0]?.innerText.trim(),
              player: cols[1]?.innerText.trim(),
              runs: cols[5]?.innerText.trim(),
              fours: cols[12]?.innerText.trim(),
              sixes: cols[13]?.innerText.trim(),
              centuries: cols[10]?.innerText.trim(),
              fifties: cols[11]?.innerText.trim(),
            };
            stats.push(playerStat);
          }
        });
        return stats;
      });

      return { season, statCategory, stats };
    };

    const allSeasonsData = [];

    // Define the last five seasons and stat categories
    const seasons = ["2024"];
    const statCategories = [
      "Most Fours ",
      "Most Sixes ",
      "Orange Cap",
      "Most Centuries",
      "Most Fifties",
    ];

    // Loop through each season and each stat category and scrape data
    for (const season of seasons) {
      for (const statCategory of statCategories) {
        console.log(
          `Scraping data for season: ${season}, category: ${statCategory}`
        );
        const seasonData = await scrapeSeasonData(season, statCategory);
        allSeasonsData.push(seasonData);
      }
    }

    // Resolve the current directory path
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Write data to a JSON file
    const filePath = `${__dirname}/data.json`;
    await fs.writeFile(filePath, JSON.stringify(allSeasonsData, null, 2));
    console.log(`Data successfully written to ${filePath}`);
  } catch (error) {
    console.error("Error during scraping:", error);
  } finally {
    await browser.close(); // Close the browser
  }
})();
