const cheerio = require("cheerio");
const xlsx = require("xlsx");

const url = `https://www.amazon.com/s?k=phone&page=2&crid=18EUYBSP7O1SQ&qid=1702535235&sprefix=phon%2Caps%2C280&ref=sr_pg_2`;

const fetchDataAndLoadCheerio = async () => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "text/html",
    },
  })
    .then(async (response) => await response.text())
    .catch((err) => console.log(err));

  return cheerio.load(res);
};

const phoneData = [];

const getPhoneData = async () => {
  const $ = await fetchDataAndLoadCheerio();
  console.log($.html())

  
  $(".puisg-row").each((index, element) => {
    const data = {};
    data.id = index;
    data.title = $(element).find(".a-size-medium.a-color-base.a-text-normal").text();
    data.price = $(element).find(".a-price").text();
    data.img = $(element).find(".s-image.s-image-optimized-rendering").attr("src");
    phoneData.push(data);
  });
  return phoneData;
};

const createExcelFile = async () => {
  const data = await getPhoneData();
  const ws = xlsx.utils.json_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Phones");
  xlsx.writeFile(wb, "phones.xlsx");
}

createExcelFile();