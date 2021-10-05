import {
  initialize,
  completedTests,
  allEvents,
  newPage
} from '../helpers/setup.js'
import {
  clickHelper,
  DLCheckHelper,
  simpleDLCheck,
  complexDLCheck
} from '../helpers/helpers.js'

const startUrl = 'https://stopandshop.com'

export const browser = await initialize()

//* ======================================================================== *//
//*                               gt-view-cart                               *//
//* ======================================================================== *//
export const gtViewCart = async () => {
  const page = await newPage(browser, startUrl, 'gt-view-cart')
  if (page?.error) return
  //open empty shopping cart
  await clickHelper(page, '.cart-button-content')
  await simpleDLCheck(page, 'event', 'gt-view-cart')
  //close empty shopping cart
  await clickHelper(page, 'div.modal_footer > div > div > footer > button')
  await page.close()
  return `gtViewCart Test Complete`
}
//* ======================================================================== *//
//*                              gt-add-to-cart                              *//
//* ======================================================================== *//
export const gtAddToCart = async () => {
  const page = await newPage(browser, startUrl, 'gt-add-to-cart')
  if (page?.error) return

  //add an item to cart
  await clickHelper(page, 'button.button--add-to-cart')
  //wait for loading to cart
  await page.waitForTimeout(2000)
  await simpleDLCheck(page, 'event', 'gt-add-to-cart')
  await page.close()
}

//* ======================================================================== *//
//*                            gt-remove-from-cart                           *//
//* ======================================================================== *//
export const gtRemoveFromCart = async () => {
  const page = await newPage(browser, startUrl, 'gt-remove-from-cart')
  if (page?.error) return

  //add an item to cart
  await clickHelper(page, 'button.button--add-to-cart')
  //remove item from cart (cart should be empty now)
  await clickHelper(page, 'button.button.decrement')
  await simpleDLCheck(page, 'event', 'gt-remove-from-cart')
  await page.close()
  return `gtRemoveFromCart Test Complete`
}
//* ======================================================================== *//
//*                          gt-weekly-special-event                         *//
//* ======================================================================== *//
export const gtWeeklySpecialEvent = async () => {
  const page = await newPage(browser, startUrl, 'gt-weekly-special-event')
  if (page?.error) return

  //click the first title from this week's ad section
  await clickHelper(page, '.item-tile_content > div > .item-tile_title')
  await simpleDLCheck(page, 'event', 'gt-weekly-special-event')
  //close the item detail's modal
  await clickHelper(
    page,
    '.modal_body > .modal_header > .modal_close > .modal_close-icon'
  )
  await page.close()
  return `gtWeeklySpecialEvent Test Complete`
}
//* ======================================================================== *//
//*                          gt-product-detail-view                          *//
//* ======================================================================== *//
export const gtProductDetailView = async () => {
  const page = await newPage(browser, startUrl, 'gt-product-detail-view')
  if (page?.error) return

  //open a regular product
  await clickHelper(page, 'div.product-tile_content')
  await complexDLCheck(page, 'gt-product-detail-view')
  //close the item detail's modal
  await clickHelper(
    page,
    '.modal_body > .modal_header > .modal_close > .modal_close-icon'
  )
  await page.close()
  return `gtProductDetailView Test Complete`
}
//* ======================================================================== *//
//*                            gt-promotion-click                            *//
//* ======================================================================== *//
export const gtPromotionClick = async () => {
  const page = await newPage(browser, startUrl, 'gt-promotion-click')
  if (page?.error) return

  //promotion click from top banner
  await clickHelper(page, '.kwm-tile_image-container')
  await simpleDLCheck(page, 'event', 'gt-promotion-click')
  await page.close()
  return `gtPromotionClick Test Complete`
}

//* ============================= End Of Tests ============================= *//

// export const deepCheck = async () => {
//   await complexDLCheck('hi', 'gt-product-detail-view')
// }
