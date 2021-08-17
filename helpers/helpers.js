import { completedTests, allEvents } from './setup.js'
import chalk from 'chalk'
import { dictionary } from './dictionary.js'
const failed = element => element.result == 'FAIL'
const passed = element => element.result == 'PASS'

let waitFor = (conditionFunction, time = 100) => {
  const poll = resolve => {
    if (conditionFunction()) resolve()
    else setTimeout(_ => poll(resolve), time)
  }
  return new Promise(poll)
}

const isObject = x => Object(x) === x

const isArray = Array.isArray

const mut = (o, [k, v]) => ((o[k] = v), o)

const diff1 = (left = {}, right = {}, rel = 'left') =>
  Object.entries(left)
    .map(([k, v]) =>
      isObject(v) && isObject(right[k])
        ? [k, diff1(v, right[k], rel)]
        : right[k] !== v
        ? [k, { [rel]: v }]
        : [k, {}]
    )
    .filter(([k, v]) => Object.keys(v).length !== 0)
    .reduce(mut, isArray(left) && isArray(right) ? [] : {})

const merge = (left = {}, right = {}) =>
  Object.entries(right)
    .map(([k, v]) =>
      isObject(v) && isObject(left[k]) ? [k, merge(left[k], v)] : [k, v]
    )
    .reduce(mut, left)

const diff = (x = {}, y = {}) =>
  merge(diff1(x, y, 'left'), diff1(y, x, 'right'))

export const testName = new URL(import.meta.url).pathname
  .split('/')
  .pop()
  .replace(/\.[^/.]+$/, '')

export const clickHelper = async (page, element) => {
  console.log('+ - Clicking ' + element)
  try {
    await page.waitForSelector(element)
  } catch (e) {
    // await page.screenshot({
    //   path:
    //     "pics/errors/" + Date.now().toString().slice(-9) + "-failedClick.png"
    // })
    console.log('Click failed, could not find ' + element)
    return false
  }

  // Use page.evaluate because it's more consistent than page.click()
  await page.click(element)
  // await page.evaluate((e) => {
  //   document.querySelector(e).click()
  // }, element)

  //standard wait after click time
  await page.waitForTimeout(750)
  // await page.screenshot({
  //   path: "pics/" + Date.now().toString().slice(-9) + "-click.png"
  // })
  return true
}

export const DLCheckHelper = async (page, key, value, name) => {
  let DLCheckFinished = false
  if (!name) name = value
  try {
    // Get the current dataLayer
    const pageDataLayer = await page.evaluate(() => dataLayer)
    // console.log(pageDataLayer)

    // if (!pageDataLayer) {
    //   console.log(pageDataLayer)
    //   completedTests.push({
    //     name: name,
    //     result: "FAIL",
    //     reason: "dataLayer undefined (try different click selector)"
    //   })
    // } else {
    // (backup = await page.evaluate(() => dataLayer))

    // console.log(backup)

    // Check for existence of a key / value pair in the datalayer
    // const result = await pageDataLayer.find((x) => x[key] == value)

    const deepSameKeys = (o1, o2) => {
      // Both nulls = yes
      if (o1 === null && o2 === null) {
        return true
      }
      // Get the keys of each object
      const o1keys = o1 === null ? [] : Object.keys(o1)
      const o2keys = o2 === null ? [] : Object.keys(o2)
      if (o1keys.length !== o2keys.length) {
        // Different number of own properties = not the same
        return false
      }

      // At this point, one of two things is true:
      // A) `o1` and `o2` are both `!null`, or
      // B) One of them is `null` and the other has own "own" properties
      // The logic below relies on the fact we only try to use `o1` or
      // `o2` if there's at least one entry in `o1keys`, which we won't
      // given the guarantee above.

      // Handy utility function
      const hasOwn = Object.prototype.hasOwnProperty

      // Check that the keys match and recurse into nested objects as necessary
      return o1keys.every(key => {
        if (!hasOwn.call(o2, key)) {
          // Different keys
          return false
        }
        // Get the values and their types
        const v1 = o1[key]
        const v2 = o2[key]
        const t1 = typeof v1
        const t2 = typeof v2
        if (t1 === 'object') {
          if (t2 === 'object' && !deepSameKeys(v1, v2)) {
            return false
          }
        }
        if (t2 === 'object') {
          if (t1 === 'object' && !deepSameKeys(v1, v2)) {
            return false
          }
        }
        return true
      })
    }

    const regexCheck = async () => {
      if (item.hasOwnProperty(step.test.match.key)) {
        const regex = new RegExp(step.test.match.value)

        if (item[step.test.match.key].match(regex) != null) {
          return true
        }
      } else {
        return false
      }
    }
    let eventDetails

    const DLCheck = async (attempt = 1) => {
      let pageDataLayer = await page.evaluate(() => dataLayer)
      //  const dataLayer = await page.evaluate("typeof dataLayer")
      console.log(
        '$ - DL Check (' + key + ': ' + value + ') Attempt: ' + attempt
      )
      if (attempt > 3) {
        DLCheckFinished = true
        return completedTests.push({
          name: name,
          result: 'FAIL',
          reason: 'Could not find matching key:value pair'
        })
      }

      let dupEvents = []
      // let eventDetails = []

      await pageDataLayer?.map(e => {
        if (e?.event !== undefined) {
          allEvents.push(e.event)
        }
      })

      let eventIndex = await pageDataLayer.findIndex(e => e.event == value)
      eventDetails = await pageDataLayer[eventIndex]
      // console.log(eventDetails)
      // console.log(pageDataLayer)
      // eventDetails.push(pageDataLayer?.event, pageDataLayer?.ecommerce)
      // console.log("EVENT DETAILS: ")
      // console.log(eventDetails)
      // console.log(uniqueEvents)

      let result = await pageDataLayer?.find(x => x[key] == value)
      if (!result) return setTimeout(() => DLCheck(attempt + 1), 1000)
      DLCheckFinished = true
      return completedTests.push({
        name: name,
        result: 'PASS'
      })
    }
    const get = (path, object) =>
      path.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), object)

    await DLCheck()
    await waitFor(() => DLCheckFinished === true)
    console.log(eventDetails)
    if (eventDetails.event == 'gt-product-detail-view') {
      console.log('KEY CHECK: ')
      console.log(deepSameKeys(eventDetails, gt_product_detail_view[1]))
      console.log('DIF CHECK: ')
      console.log(diff(gt_product_detail_view[1], eventDetails))
      console.log('REGEX TEST: ')

      // let blah = get(eventDetails)
      // console.log(blah)
      //  let Index = await gt_product_detail_view[1].find(
      //    (e) => e.event == value
      //  )
      // console.log(gt_product_detail_view[0])
      gt_product_detail_view[0].forEach(e => {
        console.log('THING: ')
        let thing = get(e.path, eventDetails)
        console.log(thing)
        if (e.regex.test(thing)) return console.log('Regex test passed!')
        console.log('Regex failed: ' + e.error)
        // console.log(e.regex.test(thing))
        // console.log(e.path)
        // console.log(eventDetails[e.path[0]][e.path[1]])
        // console.log(Object.keys(e)[0])
        // console.log(eventDetails[Object.keys(e)[0]])
      })
      // Object.keys(gt_product_detail_view[0]).forEach((key) => {
      //   console.log("Testing REGEX")
      //   console.log(key)
      //   const k = key
      //   console.log(eventDetails.key)
      //   console.log(gt_product_detail_view[0][key].test(eventDetails.key))
      // })

      // let regex = gt_product_detail_view.ecommerce.detail.products[0].id
      // console.log(regex)
      // console.log(regex.test(eventDetails.ecommerce.detail.products[0].id))
    }
    // console.log(result)
    // console.log(pageDataLayer)

    // completedTests.push({
    //   name: name,
    //   result: result === undefined ? "FAIL" : "PASS"
    // })
    // }
    //       console.log(`{
    //           name: ${step.test.name},
    //           result:
    //             ${
    //               result === undefined
    //                 ? chalk.red("FAIL")
    //                 : chalk.green("PASS")
    //             }
    //         }
    //       }`)
  } catch (e) {
    await page.screenshot({ path: 'DLCheckFail.png' })
    console.error(e)
  }
  return completedTests
}

export const parseResults = results => {
  console.log('')
  if (results.every(failed)) {
    console.log(chalk.bold.red.underline('ALL Tests Failed!!!'.toUpperCase()))
    console.log(results)
  } else if (results.some(failed)) {
    console.log(chalk.bold.green.underline('Some Tests Passed:'.toUpperCase()))
    let passedTests = results.filter(passed)
    console.log(passedTests)
    console.log('')
    console.log(chalk.bold.red.underline('Some Tests Failed:'.toUpperCase()))
    let failedTests = results.filter(failed)
    console.log(failedTests)
  } else {
    console.log(chalk.bold.green('All Tests Passed!'.toUpperCase()))
    console.log(results)
  }
  console.log('')
}
