"use strict";
// // Set up our environmental variables, you'll need to add a
// // .env file into your root directory in order for this to work!
// require('dotenv/config')
// import rp from 'request-promise';
// import checksum from 'checksum';
// import co from 'cheerio';
// import config from 'config';
// console.log('🕵🏠 Initiating Pad-Patrol...')
// function generateApartmentString(url: any) {
//   rp(url)
//     .then((HTMLresponse: any) => {
//       const $ = co.load(HTMLresponse);
//       let apartmentString = "";
//       // use cheerio to parse HTML response and find all search results
//       // then find all apartmentlistingIDs and concatenate them 
//       $(".search-item.regular-ad").each((i: any, element: { attribs: { [x: string]: any; }; }) => {
//         apartmentString += `${element.attribs["data-ad-id"]}`;
//       });
//       return apartmentString
//     }).catch((err: any) => {
//       console.log(`Could not complete fetch of ${url}: ${err}`)
//     })
// }
// // Instantiate the site URLs outsite of any method.
// // This way, they will keep their state so we can check against
// // previous values
// const sitesToCrawl = config.get("urls");
// const sitesWithHash = sitesToCrawl.map(async (url: string) => {
//   console.log(`Setting up search for ${url.split('/')[5]}`)
//   const hash = checksum(await generateApartmentString(url))
//   return {
//     url,
//     hash
//   }
// });
// function buildMessage(url: string) {
//   // This is the position of the search query inside kijiji's URL slug
//   const location = url.split('/')[5]
//   return {
//     to: process.env.NUMBER_TO_TEXT,
//     from: process.env.TWILIO_NUMBER,
//     body: `
//            There are new listings available in your search for ${location} - 
//            check them out here:  ${url}
//            `
//   };
// }
// async function huntForChanges(index: string | number) {
//   // We pass only the index to avoid complex mutations of the site objects
//   // instead we mofidy the main object directly by using it's index
//   const {
//     url,
//     hash: oldHash
//   } = await sitesWithHash[index];
//   const apartmentString = generateApartmentString(url)
//   const newHash = checksum(apartmentString);
//   // if the new hash and old hash are not equal, set the site hash to the new value
//   // and send an SMS alerting changes
//   if (newHash !== oldHash) {
//     console.log(`💡 There is a new post!`);
//     sitesWithHash[index].hash = newHash;
//     // send.SMS(buildMessage(url)); // send message
//     return;
//   }
//   // if we find no updates, report back and return
//   console.log(`😓 Nothing to report on your search for ${url.split('/')[5]}.`)
// }
// // This function will run inside our setInterval
// function checkURL(sites: any[]) {
//   console.log(`🕵️  Checking for updates...`);
//   sites.forEach(async (site: any, index: any) => {
//     await huntForChanges(index);
//   });
// }
// // 600000ms = 10 minutes
// setInterval(() => {
//   if (sitesWithHash) {
//     checkURL(sitesWithHash);
//   } else {
//     console.log(`Please add URLs to your .env file!`)
//   }
// }, 600000);
