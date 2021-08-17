import puppeteer from 'puppeteer'
;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://example.com')
  await console.log(await (await browser.pages()).length)
  let firstPageUrl = (await browser.pages())[0]._target._targetInfo.url
  if (firstPageUrl == 'about:blank')
    return console.log('first page is blank yo')
  await console.log((await browser.pages())[0]._target._targetInfo.url)
  await page.screenshot({ path: 'example.png' })

  await browser.close()
})()
