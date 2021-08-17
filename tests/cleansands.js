import {
  initialize,
  completedTests,
  allEvents,
  newPage
} from '../helpers/setup.js'
import { parseResults } from '../helpers/helpers.js'
import { totalEvents } from '../helpers/totalEvents.js'
import { clickHelper, DLCheckHelper } from '../helpers/helpers.js'
import * as tests from './justTests.js'
import { browser } from './justTests.js'
// import { page } from '../oldss.js'
// import { doesNotThrow } from 'assert'

const startUrl = 'https://stopandshop.com'

// export const [page, browser] = await initialize(startUrl)
// export const browser = await initialize()

// import { DLCheck, click } from '../helpers/SSHelper.js'
// export const click = async element => {
//   let res = await clickHelper(page, element)
//   return res
// }

// export const DLCheck = async (key, value, testName) => {
//   let res = await DLCheckHelper(page, testName || value, key, value)
//   return res
// }
//* ======================================================================== *//
//*                               gt-view-cart                               *//
//* ======================================================================== *//

const gtViewCart = async () => {
  const page = await newPage(browser, startUrl)
  //open empty shopping cart
  await clickHelper(page, '.cart-button-content')
  await DLCheckHelper(page, 'event', 'gt-view-cart')
  //close empty shopping cart
  await clickHelper(page, 'div.modal_footer > div > div > footer > button')
  await page.close()
  return `gtViewCart Test Complete`
}
// //* ======================================================================== *//
// //*                              gt-add-to-cart                              *//
// //* ======================================================================== *//
const gtAddToCart = async () => {
  const page = await newPage(browser, startUrl)
  //add an item to cart
  await clickHelper(page, 'button.button--add-to-cart')
  await DLCheckHelper(page, 'event', 'gt-add-to-cart')
  await page.close()
}

// //* ======================================================================== *//
// //*                            gt-remove-from-cart                           *//
// //* ======================================================================== *//
const gtRemoveFromCart = async () => {
  const page = await newPage(browser, startUrl)
  //add an item to cart
  await clickHelper(page, 'button.button--add-to-cart')
  await DLCheckHelper(page, 'event', 'gt-add-to-cart')
  //remove item from cart (cart should be empty now)
  await clickHelper(page, 'button.button.decrement')
  await DLCheckHelper(page, 'event', 'gt-remove-from-cart')
  await page.close()
  return `gtRemoveFromCart Test Complete`
}
// //* ======================================================================== *//
// //*                          gt-weekly-special-event                         *//
// //* ======================================================================== *//
const gtWeeklySpecialEvent = async () => {
  const page = await newPage(browser, startUrl)
  //click the first title from this week's ad section
  await clickHelper(page, '.item-tile_content > div > .item-tile_title')
  await DLCheckHelper(page, 'event', 'gt-weekly-special-event')
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
const gtProductDetailView = async () => {
  const page = await newPage(browser, startUrl)
  //open a regular product
  await clickHelper(page, 'div.product-tile_content')
  await DLCheckHelper(page, 'event', 'gt-product-detail-view')
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
const gtPromotionClick = async () => {
  const page = await newPage(browser, startUrl)
  //promotion click from top banner
  await click('.kwm-tile_image-container')
  await DLCheck('event', 'gt-promotion-click')
  await page.close()
  return `gtPromotionClick Test Complete`
}

//* ============================= End Of Tests ============================= *//

//* ============================= End Of Tests ============================= *//

// completedTests.push({ name: "failed-Test", result: "FAIL" })

// const testers = [
//   gtViewCart,
//   gtAddToCart,
//   gtProductDetailView,
//   gtViewCart,
//   gtRemoveFromCart,
//   gtPromotionClick,
//   gtProductDetailView
// ]

let pages = await browser.pages()

const delay = async milisecs => {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, milisecs)
  })
}

const importAll = () => {
  return {
    mod: null,
    from (modName) {
      this.mod = require(modName)
      Object.keys(this.mod).forEach(
        exportedElementId =>
          (global[exportedElementId] = this.mod[exportedElementId])
      )
    }
  }
}

// console.log(Object.keys(tests))

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

// console.log(Object.values(tests).length)

await asyncForEach(Object.values(tests), async (test, index, array) => {
  console.log(index)

  if (typeof test !== 'function') return
  // console.log('STARETED')
  // console.log(test)

  // let firstPageUrl = (await browser.pages())[0]._target._targetInfo.url
  // if (firstPageUrl == 'about:blank') return test(), await delay(500)

  pages = await browser.pages()
  while (pages.length == 5) {
    pages = await browser.pages()
    console.log('Too many pages open, waiting...')
    await delay(1000)
  }
  console.log('not enough pages, starting test ')

  test()
  await delay(500)

  if (index === array.length - 1) {
    while (pages.length > 1) {
      pages = await browser.pages()
      console.log("Tests are still running, don't shut down...")
      await delay(5000)
    }
  }
})

// await Object.values(tests).forEach(async grrrr => {
//   pages = await browser.pages()
//   while (pages.length == 3) {
//     pages = await browser.pages()
//     console.log('Too many pages open, waiting...')
//     await delay(1000)
//   }
//   console.log('not enough pages, starting test ')
//   await grrrr()
//   await delay(2000)
// })

// for (let i = 0; i < Object.values(tests).length; i++) {
//   // console.log(Object.keys(tests)[i])
//   // await delay(1000)
//   // console.log(i)
//   pages = await browser.pages()
//   // console.log(pages.length)
//   while (pages.length == 2) {
//     pages = await browser.pages()
//     // console.log('Too many pages open, waiting...')
//     await delay(1000)
//   }
//   // console.log('not enought pages, starting test ' + i)
//   Object.keys(tests)[i]
//   await delay(500)
// }

// for (let i = 0; i < testers.length; i++) {
//   // await delay(1000)
//   // console.log(i)
//   pages = await browser.pages()
//   // console.log(pages.length)
//   while (pages.length == 5) {
//     pages = await browser.pages()
//     // console.log('Too many pages open, waiting...')
//     await delay(1000)
//   }
//   // console.log('not enought pages, starting test ' + i)
//   testers[i]()
//   await delay(500)
// }

// await testers.forEach(async e => {
//   pages = await browser.pages()
//   // if (pages > 2) {
//   //       console.log('more than two pages!')
//   //   await module.exports.delay(2000)
//   //   console.log('done waiting...')
//   // }

//   // do {
//   //   pages = browser.pages()
//   //   await module.exports.delay(2000)
//   // }while (pages > 2)
//   console.log(pages.length)
//   while (pages.length < 3) {
//     pages = await browser.pages()
//     e()

//     console.log('asdflkjs')
//     await delay(2000)
//   }
// })

// for (let i = 0; i < tests.length; i++) {
//   if (i > 0 && (i % 3 == 0 || i == tests.length - 1)) {
//     var responses = await Promise.allSettled(promises).then(console.log)
//     promises = []
//   }
//   promises.push(tests[i])
// }

// await Promise.allSettled([gtViewCart(), gtProductDetailView()]).then(
//   console.log
// )

// while (completedTests.length != testers.length + 2) {
//   console.log('still waiting for tests to finish...')
//   console.log('COMPLETED TESTS: ' + completedTests.length)
//   console.log('Testers Length: ' + testers.length)
//   await delay(5000)
// }

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
