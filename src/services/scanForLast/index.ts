
require('dotenv/config')
import checksum from 'checksum';
require('dotenv').config()



import getLastChapter from '../getTitlesService/index'
import { messageFunction } from '../../index'



const urls = [ process.env.URL ]

const sitesToCrawl:any = urls
const sitesWithHash = sitesToCrawl.map(async (url: string) => {
  console.log(`Setting up search for ${url}`)

  const { chapterString } = await getLastChapter()
  const  hash = checksum(chapterString)
  return {
    url,
    hash,
   
  }
});




async function huntForChanges(index: string | number) {

  const { url, hash } = await sitesWithHash[index];
  const { chapterString, lastChapter, lastLink } = await getLastChapter()

  var oldHash:any = hash
  var newHash = checksum(chapterString);

  if (newHash !== oldHash) {

    var oldHash:any = checksum(chapterString);
    
    
    messageFunction(lastChapter)
    messageFunction(`${lastLink}`)
    clearInterval(checkInterval)
    return oldHash
  }
 
  console.log(`😓 Nothing to report on your search for ${url}.`)
}

function checkURL(sites: any[]) {
  console.log(`🕵️  Checking for updates...`);
  sites.forEach(async (site: any, index: any) => {
    await huntForChanges(index);

  });
}



var checkInterval: NodeJS.Timeout;

function scheduleStuff() {
  console.log("schedulleStuff")

  checkInterval = setInterval(doStuff, 600000);
}

function doStuff() {

  if(sitesWithHash){
    console.log("checkURL")
    checkURL(sitesWithHash)
  } else {
    console.log(`Please add URLs to your config file!`)
  }

}




export function stopScan(){
    console.log('stopped')
    clearInterval(checkInterval)
}

export function startScan(){
  scheduleStuff();
  
}

