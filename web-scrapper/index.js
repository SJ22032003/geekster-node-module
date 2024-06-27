const cheerio = require("cheerio");
const xlsx = require("xlsx");

const url = `https://www.geeksforgeeks.org/jobs`;

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
  console.log($.text());
  console.log($(".jobs_jobs_animation_parent__PtUER").length);

  $(".jobs_jobs_animation_parent__PtUER").each((index, element) => {
    const data = {};
    data.id = index;
    data.title = $(element).find(".jobs_designation__fVwb4").text();
    data.company = $(element).find(".jobs_company_name__vfAr8").text();
    data.img = $(element).find(".ui.image.jobs_logo__s9Hn_").attr("src");
    phoneData.push(data);
  });
  console.log(phoneData);
  return phoneData;
};

getPhoneData();

// const createExcelFile = async () => {
//   const data = await getPhoneData();
//   const ws = xlsx.utils.json_to_sheet(data);
//   const wb = xlsx.utils.book_new();
//   xlsx.utils.book_append_sheet(wb, ws, "Phones");
//   xlsx.writeFile(wb, "phones.xlsx");
// }

// createExcelFile();