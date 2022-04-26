const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const RAW_DATA_FILE = "./beach_list.txt";
const RATING_FILE = "./frontend/rating.json";

const getBeachListFromFile = () => {
  console.log("getBeachListFromFile");
  try {
    const data = fs.readFileSync(path.resolve(__dirname, RAW_DATA_FILE), "utf-8");
    const tempList = data.split("\n");
    return tempList.filter((item) => item && item.length > 0);
  } catch (error) {
    console.error(error);
  }
};

const makeRatingFile = (scrapedData) => {
  console.log("makeRatingFile");
  try {
    fs.writeFileSync(path.resolve(__dirname, RATING_FILE), JSON.stringify(scrapedData, null, 4), "utf-8");
  } catch (error) {
    console.error(error);
  }
};

const getGoogleReview = async (name) => {
  console.log(`getGoogleReview: [${name}]`);
  const url = `https://www.google.com.au/search?q=${name.replace(" ", "+")}`;
  const imageUrl = `${url}&tbm=isch`;
  console.log(url);

  const browser = await puppeteer.launch({
    // args: ['--no-sandbox','--disable-setuid-sandbox'],
    headless: true,
  });
  try {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (req.resourceType() === "stylesheet" || req.resourceType() === "font") {
        req.abort();
      } else {
        req.continue();
      }
    });
    await page.goto(url, { waitUntil: "networkidle2" });
    const result = await page.evaluate(() => {
      //
      const stars = document.querySelector(".Aq14fc")?.textContent; // '4.6'
      const reviews = document.querySelector(".hqzQac")?.textContent.split(" ")[0]; // '19 Google reviews' -> '19'
      return { stars, reviews };
    });

    await page.goto(imageUrl, { waitUntil: "networkidle2" });
    const imageSrc = await page.evaluate(() => {
      return document.querySelector(".islrc img").src;
    });
    console.log(imageSrc.slice(0, 20));

    return { ...result, imageSrc };
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
};

const scrapeStarsAndReviews = async (beachList) => {
  console.log("scrapeStarsAndReviews");
  const data = [];
  try {
    for (const name of beachList) {
      const { stars, reviews, imageSrc } = await getGoogleReview(name);
      console.log(name, stars, reviews);
      if (stars && reviews && imageSrc) {
        data.push({ name, stars, reviews, imageSrc });
      }
    }
  } catch (error) {
    console.error(error);
  }
  // console.log(data);
  return data;
};

const main = async () => {
  const beachList = getBeachListFromFile();
  const scrapedData = await scrapeStarsAndReviews(beachList);
  makeRatingFile(scrapedData);
};

main();
