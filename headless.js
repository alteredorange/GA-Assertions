const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
puppeteer.use(StealthPlugin())
//const puppeteer = require("puppeteer")
const blah = async () => {
  //   const browser = await puppeteer.launch()

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      //       "--single-process",
      //       "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36"
    ]
  })

  const page = await browser.newPage()
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1
  })
  await page.goto("https://stopandshop.com/")

  //   await page.setViewport({ width: 1885, height: 954 })
  await page.screenshot({ path: "grrrrrr.png" })
  await page.waitForSelector(
    ".product-tile_content > .product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .button"
  )
  await page.click(
    ".product-tile_content > .product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .button"
  )

  await page.screenshot({ path: "pics/1.png" })

  await page.waitForSelector(
    ".product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .increment"
  )
  await page.click(
    ".product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .increment"
  )

  await page.screenshot({ path: "pics/2.png" })

  await page.waitForSelector(
    ".product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .decrement"
  )
  await page.click(
    ".product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .decrement"
  )

  await page.screenshot({ path: "pics/3.png" })

  await page.waitForSelector(
    ".product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .decrement"
  )
  await page.click(
    ".product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .decrement"
  )

  await page.screenshot({ path: "pics/4.png" })

  await page.waitForSelector(".item-tile_content > div > .item-tile_title")
  await page.click(".item-tile_content > div > .item-tile_title")
  await page.waitForTimeout(1000)
  await page.screenshot({ path: "pics/5.png" })

  await page.waitForSelector(
    ".modal_body > .modal_header > .modal_close > .modal_close-icon > svg"
  )
  await page.click(
    ".modal_body > .modal_header > .modal_close > .modal_close-icon > svg"
  )

  await page.screenshot({ path: "pics/6.png" })

  await browser.close()
}

blah()
