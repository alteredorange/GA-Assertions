import {
  initialize,
  completedTests,
  allEvents,
  newPage
} from '../helpers/setup.js'
import {
  clickHelper,
  DLCheckHelper,
  simpleDLCheck
} from '../helpers/helpers.js'

const startUrl = 'https://stopandshop.com'

export const browser = await initialize()

//* ======================================================================== *//
//*                               gt-view-cart                               *//
//* ======================================================================== *//
export const gtViewCart = async () => {
  const page = await newPage(browser, startUrl)
  //open empty shopping cart
  await clickHelper(page, '.cart-button-content')
  // await DLCheckHelper(page, 'event', 'gt-view-cart')
  await simpleDLCheck(page, 'event', 'gt-view-cart')
  //close empty shopping cart
  await clickHelper(page, 'div.modal_footer > div > div > footer > button')
  await page.close()
  return `gtViewCart Test Complete`
}
// //* ======================================================================== *//
// //*                              gt-add-to-cart                              *//
// //* ======================================================================== *//
// export const gtAddToCart = async () => {
//   const page = await newPage(browser, startUrl)
//   //add an item to cart
//   await clickHelper(page, 'button.button--add-to-cart')
//   await DLCheckHelper(page, 'event', 'gt-add-to-cart')
//   await page.close()
// }

// //* ======================================================================== *//
// //*                            gt-remove-from-cart                           *//
// //* ======================================================================== *//
// export const gtRemoveFromCart = async () => {
//   const page = await newPage(browser, startUrl)
//   //add an item to cart
//   await clickHelper(page, 'button.button--add-to-cart')
//   await DLCheckHelper(page, 'event', 'gt-add-to-cart')
//   //remove item from cart (cart should be empty now)
//   await clickHelper(page, 'button.button.decrement')
//   await DLCheckHelper(page, 'event', 'gt-remove-from-cart')
//   await page.close()
//   return `gtRemoveFromCart Test Complete`
// }
// //* ======================================================================== *//
// //*                          gt-weekly-special-event                         *//
// //* ======================================================================== *//
// export const gtWeeklySpecialEvent = async () => {
//   const page = await newPage(browser, startUrl)
//   //click the first title from this week's ad section
//   await clickHelper(page, '.item-tile_content > div > .item-tile_title')
//   await DLCheckHelper(page, 'event', 'gt-weekly-special-event')
//   //close the item detail's modal
//   await clickHelper(
//     page,
//     '.modal_body > .modal_header > .modal_close > .modal_close-icon'
//   )
//   await page.close()
//   return `gtWeeklySpecialEvent Test Complete`
// }
// //* ======================================================================== *//
// //*                          gt-product-detail-view                          *//
// //* ======================================================================== *//
export const gtProductDetailView = async () => {
  const page = await newPage(browser, startUrl)
  //open a regular product
  await clickHelper(page, 'div.product-tile_content')
  await complexDLCheck(page, 'gt-product-detail-view')
  // await DLCheckHelper(page, 'event', 'gt-product-detail-view')
  //close the item detail's modal
  await clickHelper(
    page,
    '.modal_body > .modal_header > .modal_close > .modal_close-icon'
  )
  await page.close()
  return `gtProductDetailView Test Complete`
}
// //* ======================================================================== *//
// //*                            gt-promotion-click                            *//
// //* ======================================================================== *//
// export const gtPromotionClick = async () => {
//   const page = await newPage(browser, startUrl)
//   //promotion click from top banner
//   await clickHelper(page, '.kwm-tile_image-container')
//   await DLCheckHelper(page, 'event', 'gt-promotion-click')
//   await page.close()
//   return `gtPromotionClick Test Complete`
// }

// //* ============================= End Of Tests ============================= *//
