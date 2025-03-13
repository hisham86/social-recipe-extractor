const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: {
        width: 1280,
        height: 800
      }
    });

    console.log('Opening page...');
    const page = await browser.newPage();
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle0'
    });

    console.log('Taking screenshot...');
    const screenshotPath = path.join(__dirname, '../public/screenshot.png');
    await page.screenshot({
      path: screenshotPath,
      fullPage: false
    });

    console.log(`Screenshot saved to ${screenshotPath}`);
    await browser.close();
  } catch (error) {
    console.error('Error taking screenshot:', error);
    process.exit(1);
  }
})(); 