import { completedTests, allEvents } from "./setup.js"
import chalk from "chalk"

const failed = (element) => element.result == "FAIL"
const passed = (element) => element.result == "PASS"

let waitFor = (conditionFunction, time = 100) => {
  const poll = (resolve) => {
    if (conditionFunction()) resolve()
    else setTimeout((_) => poll(resolve), time)
  }
  return new Promise(poll)
}

export const testName = new URL(import.meta.url).pathname
  .split("/")
  .pop()
  .replace(/\.[^/.]+$/, "")

export const clickHelper = async (page, element) => {
  console.log("+ - Clicking " + element)
  try {
    await page.waitForSelector(element)
  } catch (e) {
    // await page.screenshot({
    //   path:
    //     "pics/errors/" + Date.now().toString().slice(-9) + "-failedClick.png"
    // })
    console.log("Click failed, could not find " + element)
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

export const DLCheckHelper = async (page, name, key, value) => {
  let DLCheckFinished = false
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

    const DLCheck = async (attempt = 1) => {
      let pageDataLayer = await page.evaluate(() => dataLayer)
      console.log(
        "$ - DL Check (" + key + ": " + value + ") Attempt: " + attempt
      )
      if (attempt > 3) {
        DLCheckFinished = true
        return completedTests.push({
          name: name,
          result: "FAIL",
          reason: "Could not find matching key:value pair"
        })
      }

      let dupEvents = []

      await pageDataLayer?.map((e) => {
        if (e?.event !== undefined) {
          allEvents.push(e.event)
        }
      })

      // console.log(uniqueEvents)

      let result = await pageDataLayer?.find((x) => x[key] == value)
      if (!result) return setTimeout(() => DLCheck(attempt + 1), 1000)
      DLCheckFinished = true
      return completedTests.push({
        name: name,
        result: "PASS"
      })
    }

    await DLCheck()
    await waitFor(() => DLCheckFinished === true)
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
    await page.screenshot({ path: "DLCheckFail.png" })
    console.error(e)
  }
  return completedTests
}

export const parseResults = (results) => {
  console.log("")
  if (results.every(failed)) {
    console.log(chalk.bold.red.underline("ALL Tests Failed!!!".toUpperCase()))
    console.log(results)
  } else if (results.some(failed)) {
    console.log(chalk.bold.green.underline("Some Tests Passed:".toUpperCase()))
    let passedTests = results.filter(passed)
    console.log(passedTests)
    console.log("")
    console.log(chalk.bold.red.underline("Some Tests Failed:".toUpperCase()))
    let failedTests = results.filter(failed)
    console.log(failedTests)
  } else {
    console.log(chalk.bold.green("All Tests Passed!".toUpperCase()))
    console.log(results)
  }
  console.log("")
}
