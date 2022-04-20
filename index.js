const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const RAW_DATA_FILE = "./beach_list.txt";
const RANKING_FILE = "./frontend/ranking.json";

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

const getWeightedRanking = (R, v, m, C) => {
  // https://www.quora.com/How-does-IMDbs-rating-system-work
  // IMDB formula, true 'Bayesian estimate'
  // weighted rating (WR) = (v ÷ (v+m)) × R + (m ÷ (v+m)) × C
  // R = average for the movie (mean) = (Rating)
  // v = number of votes for the movie = (votes)
  // m = minimum votes required to be listed in the Top 250 (currently 25000)
  // C = the mean vote across the whole report (currently 7.0)
  //
  // In this case:
  // R = average for the beach (mean) = (Rating)
  // v = number of reviews for the beach = (reviews)
  // m = minimum reviews required to be listed
  // C = the mean review across the whole reviews
  return (v / (v + m)) * R + (m / (v + m)) * C;
};

const makeWeightedRankingFile = (scrapedData) => {
  console.log("makeWeightedRankingFile");

  let totalReviewCount = 0;
  let averageStars = 0;
  let stars_x_reviews = 0;

  scrapedData.forEach((row) => {
    const reviewsInNumber = parseInt(row.reviews.replace(/,/g, ""));
    totalReviewCount += reviewsInNumber;
    stars_x_reviews += parseFloat(row.stars) * reviewsInNumber;
  });

  averageStars = stars_x_reviews / totalReviewCount;
  // console.log(`averageStars: ${averageStars}`);
  // console.log(`stars_x_reviews: ${stars_x_reviews}`);
  // console.log(`totalReviewCount: ${totalReviewCount}`);

  try {
    scrapedData.forEach((row) => {
      const R = parseFloat(row.stars);
      const v = parseInt(row.reviews.replace(/,/g, ""));
      const m = 20;
      // "C": 'averageStars' not used and hardcoded
      // average is quite high smaller reviews of same stars rank higher from 4.6 stars
      // therefore need to lower the average
      const C = 3.9;
      row.ranking = getWeightedRanking(R, v, m, C);
    });

    console.log(scrapedData);

    fs.writeFileSync(path.resolve(__dirname, RANKING_FILE), JSON.stringify(scrapedData, null, 4), "utf-8");
  } catch (error) {
    console.error(error);
  }
};

const getGoogleReview = async (name) => {
  console.log(`getGoogleReview: [${name}]`);
  const url = `https://www.google.com.au/search?q=${name.replace(" ", "+")}`;
  const imageUrl = `${url}&source=lnms&tbm=isch`;
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
    console.log(imageSrc);

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
  makeWeightedRankingFile(scrapedData);
};

main();
