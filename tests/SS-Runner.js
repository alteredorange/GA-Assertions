import { completedTests } from '../helpers/setup.js'
import { parseResults, delay, asyncForEach } from '../helpers/helpers.js'
import { totalEvents } from '../helpers/totalEvents.js'
import * as tests from './SS-Tests.js'
import { browser } from './SS-Tests.js'

//* ======================================================================== *//
//*                               RUN THE TESTS                              *//
//* ======================================================================== *//

let pages = await browser.pages()

await asyncForEach(Object.values(tests), async (test, index, array) => {
  if (typeof test !== 'function') return

  // let firstPageUrl = (await browser.pages())[0]._target._targetInfo.url
  // if (firstPageUrl == 'about:blank') return test(), await delay(500)

  pages = await browser.pages()
  while (pages.length == 5) {
    pages = await browser.pages()
    // console.log('Too many pages open, waiting...')
    await delay(1000)
  }

  // console.log('not enough pages, starting test ')
  test()
  await delay(500)

  if (index === array.length - 1) {
    while (pages.length > 1) {
      pages = await browser.pages()
      // console.log("Tests are still running, don't shut down...")
      await delay(5000)
    }
  }
})

//* ======================================================================== *//
//*                        Unique Events and Coverage                        *//
//* ======================================================================== *//

// let uniqueEvents = [...new Set(allEvents)]
// // console.log(uniqueEvents)
// let totalCount = totalEvents.length
// let eventsCovered = 0
// uniqueEvents.map(value => {
//   if (totalEvents.includes(value)) {
//     eventsCovered += 1
//   }
// })

// let coverage = eventsCovered / totalCount
// console.log(eventsCovered + ' / ' + totalCount)
// console.log('COVERAGE: ' + coverage + '%')

//* ======================================================================== *//
//*                                  RESULTS                                 *//
//* ======================================================================== *//

parseResults(completedTests)

//* ======================================================================== *//
//*                                 CLOSE OUT                                *//
//* ======================================================================== *//

await browser.close()

//* ======================================================================== *//
//*                              EXTRA COMMANDS                              *//
//* ======================================================================== *//
// await page.waitForTimeout(2000)
// await page.screenshot({ path: "START-gt-add-to-cart.png" })
// completedTests.push({ name: "failed-Test", result: "FAIL" })
