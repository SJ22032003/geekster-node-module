const cheerio = require('cheerio');
const axios = require('axios');

const url = `https://www.naukri.com/it-jobs?src=gnbjobs_homepage_srch`;

const fetchData = async () => {
  console.log("fetching data")
  const result = await fetch(url, {
    headers: {
      "Content-Type": "text/html",
    },
  });
  return cheerio.load(await result.text());
};

const getResults = async () => {
  console.log("run")
  const $ = await fetchData();
  console.log($.text(), "data");
  const getPhoneListing = $('.cust-job-tuple.layout-wrapper.lay-2.sjw__tuple');

  const result = [];

  getPhoneListing.each((i, phone) => {
    const obj = {};
    obj.title = $(phone).text();
    console.log(obj.title);
  })

}

getResults();