import { initialize, completedTests } from "../helpers/setup.js"
import { parseResults } from "../helpers/helpers.js"
// import { completedTests } from "../helpers/setup.js"
// import { testName } from "../helpers/helpers.js"

const startUrl = "https://stopandshop.com"

export const [page, browser] = await initialize(startUrl)
import { DLCheck, click } from "../helpers/SSHelper.js"

//open empty shopping cart
await click(".cart-button-content")
await DLCheck("event", "gt-view-cart")
//close empty shopping cart
await click("div.modal_footer > div > div > footer > button")
//add an item to cart
await click("button.button--add-to-cart")
await DLCheck("event", "gt-add-to-cart")
//remove item from cart (cart should be empty now)
await click("button.button.decrement")
await DLCheck("event", "gt-remove-from-cart")
//click the first title from this week's ad section
await click(".item-tile_content > div > .item-tile_title")
await DLCheck("event", "gt-weekly-special-event")
//close the item detail's modal
await click(".modal_body > .modal_header > .modal_close > .modal_close-icon")

//open a regular product
// await page.waitForTimeout(2000)
// await page.waitForSelector("div.product-tile_content")
// // await click("div.product-tile_content")
// await page.click("div.product-tile_content")
await click("div.product-tile_content")

await page.screenshot({ path: "afterClikcDetail.png" })
await DLCheck("event", "gt-product-detail-view")
//close the item detail's modal
await click(".modal_body > .modal_header > .modal_close > .modal_close-icon")

//promotion click from top banner
await click(".kwm-tile_image-container")
await DLCheck("event", "gt-promotion-click")
await page.waitForTimeout(1000)
await page.goto("https://stopandshop.com", { waitUntil: "networkidle2" })
// await page.waitForTimeout(10000)

completedTests.push({ name: "failed-Test", result: "FAIL" })

parseResults(completedTests)
// console.log(completedTests)

await browser.close()
// console.log("done!")

// await page.waitForTimeout(2000)
// await page.screenshot({ path: "START-gt-add-to-cart.png" })
const tester = [
  {
    description: "Open EMPTY shopping cart",
    action: "click",
    element: ".cart-button-content"
    //  element: "div > .global-header-base > .global-header > .global-header_nav"
    // button.btn.btn--primary.cart-btn.global-header_cart-button-container
  },
  {
    action: "wait",
    value: 750
  },
  {
    action: "test",
    test: {
      name: "DL Test: gt-view-cart",
      description: "Clicking on cart should trigger gt-view-cart",
      for: "GoogleAnalytics",
      type: "matchDataLayerKeyValue",
      match: {
        key: "event",
        value: "gt-view-cart"
      }
    }
  },
  {
    description: "Close EMPTY shopping cart",
    action: "click",
    element: "div.modal_footer > div > div > footer > button"
  },
  {
    action: "wait",
    value: 750
  },
  {
    action: "click",
    element: "button.button--add-to-cart"
  },
  {
    action: "wait",
    value: 750
  },
  {
    action: "test",
    test: {
      name: "DL Test: gt-add-to-cart",
      description: "Clicking add to cart on product detail page",
      for: "GoogleAnalytics",
      type: "matchDataLayerKeyValue",
      match: {
        key: "event",
        value: "gt-add-to-cart"
      },
      options: {
        matchAnyRequest: true
      }
    }
  },
  {
    action: "click",
    element: "button.button.decrement"
  },
  {
    action: "wait",
    value: 750
  },
  {
    action: "test",
    test: {
      name: "DL Test: gt-remove-from-cart",
      description: "Clicking remove from cart on homepage",
      for: "GoogleAnalytics",
      type: "matchDataLayerKeyValue",
      match: {
        key: "event",
        value: "gt-remove-from-cart"
      }
    }
  },
  {
    description: "click the first title from this week's ad section",
    action: "click",
    element: ".item-tile_content > div > .item-tile_title"
  },
  {
    action: "wait",
    value: 750
  },
  {
    action: "test",
    test: {
      name: "DL Test: gt-product-detail-view",
      description:
        "Clicking on a product should trigger gt-product-detail-view",
      for: "GoogleAnalytics",
      type: "matchDataLayerKeyValue",
      match: {
        key: "event",
        value: "gt-product-detail-view"
      }
    }
  },

  {
    description: "close product detail view",
    action: "click",
    element: ".modal_body > .modal_header > .modal_close > .modal_close-icon"
  },
  {
    action: "wait",
    value: 1000
  }
]
