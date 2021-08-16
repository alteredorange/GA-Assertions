import { initialize, completedTests, allEvents } from '../helpers/setup.js'
import { parseResults } from '../helpers/helpers.js'
import { totalEvents } from '../helpers/totalEvents.js'

const startUrl = 'https://stopandshop.com'

export const [page, browser] = await initialize(startUrl)
import { DLCheck, click } from '../helpers/SSHelper.js'

//* ======================================================================== *//
//*                               gt-view-cart                               *//
//* ======================================================================== *//
const gtViewCart = async () => {
  //open empty shopping cart
  await click('.cart-button-content')
  await DLCheck('event', 'gt-view-cart')
  //close empty shopping cart
  await click('div.modal_footer > div > div > footer > button')
}
// //* ======================================================================== *//
// //*                              gt-add-to-cart                              *//
// //* ======================================================================== *//
// //add an item to cart
// await click("button.button--add-to-cart")
// await DLCheck("event", "gt-add-to-cart")
// //* ======================================================================== *//
// //*                            gt-remove-from-cart                           *//
// //* ======================================================================== *//
// //remove item from cart (cart should be empty now)
// await click("button.button.decrement")
// await DLCheck("event", "gt-remove-from-cart")
// //* ======================================================================== *//
// //*                          gt-weekly-special-event                         *//
// //* ======================================================================== *//
// //click the first title from this week's ad section
// await click(".item-tile_content > div > .item-tile_title")
// await DLCheck("event", "gt-weekly-special-event")
// //close the item detail's modal
// await click(".modal_body > .modal_header > .modal_close > .modal_close-icon")
//* ======================================================================== *//
//*                          gt-product-detail-view                          *//
//* ======================================================================== *//
const gtProductDetailView = async () => {
  //open a regular product
  await click('div.product-tile_content')
  await DLCheck('event', 'gt-product-detail-view')
  //close the item detail's modal
  await click('.modal_body > .modal_header > .modal_close > .modal_close-icon')
}
//* ======================================================================== *//
//*                            gt-promotion-click                            *//
//* ======================================================================== *//
// //promotion click from top banner
// await click(".kwm-tile_image-container")
// await DLCheck("event", "gt-promotion-click")
// await page.waitForTimeout(1000)
// await page.goto("https://stopandshop.com", { waitUntil: "networkidle2" })

//* ============================= End Of Tests ============================= *//

// completedTests.push({ name: "failed-Test", result: "FAIL" })

await Promise.allSettled([gtViewCart(), gtProductDetailView()]).then(
  console.log
)

let uniqueEvents = [...new Set(allEvents)]
// console.log(uniqueEvents)
let totalCount = totalEvents.length
let eventsCovered = 0
uniqueEvents.map(value => {
  if (totalEvents.includes(value)) {
    eventsCovered += 1
  }
})

// let coverage = eventsCovered / totalCount
// console.log(eventsCovered + ' / ' + totalCount)
// console.log('COVERAGE: ' + coverage + '%')

parseResults(completedTests)

await browser.close()

// =============================================================================
// extra commands
// =============================================================================
// await page.waitForTimeout(2000)
// await page.screenshot({ path: "START-gt-add-to-cart.png" })
