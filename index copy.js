require ('dotenv').config();
const puppeteer = require('puppeteer');

const url = 'https://www.instagram.com/jmessias_carvalho/';

(async () => {
  const browser = await puppeteer.launch({
      headless: false,
  });
  const page = await browser.newPage();
  await page.goto(url);

  // Acessar a página de Login
  await page.click('[href="https://unsplash.com/login"]');

  const content = await page.$eval('.login__alt-cta', el => el.innerHTML = 'oi');

  await page.type('[name="user[email]"]', content);
  await page.type('[id="user_password"]', 'eusouninja792');

  

  /*
  await page.click('[type="submit"]');
  await page.waitForNavigation();*/

  

  //await browser.close();
})();
