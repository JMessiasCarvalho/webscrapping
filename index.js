require ('dotenv').config();
const puppeteer = require('puppeteer');
const fs = require('fs');
const csv = require('fast-csv');
const entrada = fs.createReadStream('perfisUrl.csv')

const imgsList = [];

const saveDB = async (url) => {
    const imgList = await openWeb(url.perfilURL);
    imgsList.push(imgList);
    return imgList;
}

const csvStream = entrada.pipe(csv.parse({headers: true}))
  .on('data', perfilURL => {
    csvStream.pause();
    saveDB(perfilURL).then(()=>{
        csvStream.resume();
    })
}).on('end', e => {finished()});

const finished = () => {
  fs.writeFile('urls.json', JSON.stringify(imgsList, null, 2), err => {
    if(err) throw new Error('something went wrong')
    
    console.log('well done!')
  })
}


const openWeb = async (url) => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto(url);

  const imgList = await page.evaluate(() => {

    const nodeList = document.querySelectorAll('.eegew6e2 img')

    const imgArray = [...nodeList]

    const imgList = imgArray.map( ({src}) => ({
      src
    }))
  
    return imgList;
    
  });

  //await browser.close();
  return imgList;
  
};