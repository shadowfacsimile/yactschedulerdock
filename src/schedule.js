'use script'

const cron = require('node-cron');
const request = require('request');
const fs = require('fs');
const csv = require("csvtojson");

let casesUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
let deathsUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
let recoveriesUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";
let indiaStatsUrl = "https://api.covid19india.org/states_daily.json";

let casesFile = "/home/facsimile/yactschedulerdock/files/time_series_covid19_confirmed_global.json";
let deathsFile = "/home/facsimile/yactschedulerdock/files/time_series_covid19_deaths_global.json";
let recoveriesFile = "/home/facsimile/yactschedulerdock/files/time_series_covid19_recovered_global.json";
let indiaStatsFile = "/home/facsimile/yactschedulerdock/files/states_daily.json";

cron.schedule('*/30 * * * *', () => {
    let jsondata = '[';

    csv()
        .fromStream(request.get(casesUrl))
        .subscribe((json) => {
            jsondata += JSON.stringify(json) + ',';
        }, error => console.log(error), () => {
            jsondata = jsondata.slice(0, -1) + ']';
            fs.writeFileSync(casesFile, jsondata);
            console.log('Done writing cases');
        });
});

cron.schedule('*/30 * * * *', () => {
    let jsondata = '[';

    csv()
        .fromStream(request.get(deathsUrl))
        .subscribe((json) => {
            jsondata += JSON.stringify(json) + ',';
        }, error => console.log(error), () => {
            jsondata = jsondata.slice(0, -1) + ']';
            fs.writeFileSync(deathsFile, jsondata);
            console.log('Done writing deaths');
        });
});

cron.schedule('*/30 * * * *', () => {
    let jsondata = '[';

    csv()
        .fromStream(request.get(recoveriesUrl))
        .subscribe((json) => {
            jsondata += JSON.stringify(json) + ',';
        }, error => console.log(error), () => {
            jsondata = jsondata.slice(0, -1) + ']';
            fs.writeFileSync(recoveriesFile, jsondata);
            console.log('Done writing recoveries');
        });
});

cron.schedule('*/30 * * * *', () => {
    request(indiaStatsUrl, (error, response, body) => {
        fs.writeFileSync(indiaStatsFile, body);
        console.log('Done writing India Stats');
    });
});
