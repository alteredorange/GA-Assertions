const { chromium } = require("playwright")
;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36"
  })
  await page.goto("https://giantfood.com/")

  await page.setViewportSize({ width: 1885, height: 954 })
  await page.screenshot({ path: "pics/play.png" })
  await page.waitForSelector(
    "#product-118590-16281934603665113 > .product-tile_content > .product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .button"
  )
  await page.click(
    "#product-118590-16281934603665113 > .product-tile_content > .product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .button"
  )

  await page.waitForSelector(
    ".product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .increment"
  )
  await page.click(
    ".product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .increment"
  )

  await page.waitForSelector(
    ".product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .decrement"
  )
  await page.click(
    ".product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .decrement"
  )

  await page.waitForSelector(
    ".product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .decrement"
  )
  await page.click(
    ".product-grid-cell_price-tag > .margin-top--one > .pdl-add-to-cart > .pdl-add-to-cart_button > .decrement"
  )

  await page.waitForSelector("#itemLink-588061015")
  await page.click("#itemLink-588061015")

  await page.waitForSelector(
    ".modal_body > .modal_header > .modal_close > .modal_close-icon > svg"
  )
  await page.click(
    ".modal_body > .modal_header > .modal_close > .modal_close-icon > svg"
  )

  await browser.close()
})()
