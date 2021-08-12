// const puppeteer = require("puppeteer")
const puppeteer = require("puppeteer-extra")
const chalk = require("chalk")
// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
puppeteer.use(StealthPlugin())
// const ora = require("ora")

// const spinner = (text, action, id) => {
// 	let id = {
//   if (action == "start") return ora(text).start()
//   if (action == "fail") return  ora(text).fail()
//   if (action == "succeed") return ora(text).succeed()
// 	}
//   console.log("Spinner action not valid")
// }

let completedTests = []
const runTest = async (testObject, options = { headless: true }) => {
  /*
   * Run a single test from a browser and test sequence
   *
   */
  //   spinner("Starting tests...", "start", "s1")

  const browser = await puppeteer.launch({
    headless: options.headless,
    args: [
      //       "--single-process",
      //       "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36"
    ]
  })

  // Open new page in browser for the test to run
  const page = await browser.newPage()
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1
  })
  //   await page.setUserAgent(
  //     //     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
  //     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36"
  //   )

  //   let newWindow = browser.newWindow(
  //     "about:blank",
  //     "",
  //     "width=1, height=1, left=-1, top=-1"
  //   )
  //   let newWindowuserAgent = newWIndow.navigator.userAgent
  //   await newWindow.close()

  //   if (navigator.userAgent !== newWindowuserAgent) {
  //     console.log("BUSTED!")
  //   }
  //   await page.close()

  let networkRequests = {}
  if (options.trackRequests) {
    // Turn on request interception to track hits and parameters for e.g. Google Analytics
    await page.setRequestInterception(true)

    // Create an empty array for each domain we want to track to push to
    options.trackRequests.forEach((tracker) => {
      networkRequests[tracker.name] = []
    })

    const requestUrlParamsToJSON = (requestURL) => {
      // Split request parameters and store as key-value object for easy access
      let params = requestURL.split("?")[1]
      return JSON.parse(
        '{"' +
          decodeURI(params)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      )
    }

    page.on("request", (req) => {
      // Determine what to do with every request and create an object with the request params when needed
      const requestURL = req.url()
      let abortRequest = false
      options.trackRequests.forEach((tracker) => {
        if (requestURL.indexOf(tracker.url) > -1) {
          networkRequests[tracker.name].push(requestUrlParamsToJSON(requestURL))
          if (tracker.abortRequest) {
            abortRequest = true
          }
        }
      })
      abortRequest ? req.abort() : req.continue()
      //       abortRequest ? req.continue() : req.continue()
    })
  }

  // Execute the steps you want to take e.g. go to page, click element, type text, wait, etc. one by one
  try {
    // Go over every step one by one
    for (let i = 0; i < testObject.steps.length; i++) {
      let step = testObject.steps[i]

      // Execute the right step action
      switch (step.action) {
        case "goto":
          console.log("-> Go to: " + step.value)
          //   await page.goto("https://shop.foodlion.com")
          //   await page.screenshot({ path: "example.png" })
          await page.goto(step.value, { waitUntil: "networkidle2" })
          //   await page.screenshot({ path: "initialGoto.png" })
          //   console.log("starting wait...")
          await page.waitForTimeout(2000)
          //   console.log("wait ended...")
          await page.screenshot({ path: "initialGoto.png" })
          await page.mouse.wheel({ deltaY: 2000 })
          await page.screenshot({ path: "afterScroll.png" })
          //   await page.waitForTimeout(1000)
          break

        case "getElements":
          await page.screenshot({ path: "PreCart.png" })
          await page.click("button.button--add-to-cart")
          await page.waitForTimeout(1000)
          await page.screenshot({ path: "addedToCart.png" })
          //       await page.click(
          //         "ul.tile-list > li:nth-child(2) > div.shopping-list-menu_container"
          //       )
          break

        case "click":
          console.log(
            "+ Click " +
              (step?.xpath ? "xpath" : "element") +
              ": " +
              (step?.element || step?.xpath)
          )
          if (step.xpath) {
            // let xpathElement
            // try {
            const xpathElement = await page.$x(
              '//*[contains(., "continue shopping")]'
            )
            console.log("got here")
            // } catch (e) {
            //   await page.screenshot({ path: "failedXpath.png" })
            //   console.log("Click failed, could not find " + step.xpath)
            // }
            console.log(xpathElement)
            // await page.click(xpathElement)
            // await page.evaluate((e) => {
            //   console.log(e)
            //   document.querySelector(e).click()
            // }, xpathElement)
            await page.waitForTimeout(1000)
            console.log("farther?")
          } else {
            // Wait for the element to appear on screen (useful for asynchronicity)
            try {
              await page.waitForSelector(step.element)
            } catch (e) {
              await page.screenshot({ path: "failedClick.png" })
              console.log("Click failed, could not find " + step.element)
            }

            // Use page.evaluate because it's more consistent than page.click()
            await page.evaluate((e) => {
              console.log(e)
              document.querySelector(e).click()
            }, step.element)
            await page.waitForTimeout(1000)
          }
          await page.screenshot({ path: "click.png" })
          break

        case "wait":
          // console.log("- Waiting for " + step.value / 1000 + " seconds")
          await page.waitForTimeout(step.value)
          //   console.log("### Done Waiting for: " + step.value)
          break

        case "type":
          await page.waitForSelector(step.element)
          if (step.clear) {
            await page.evaluate((e) => {
              document.querySelector(e).value = ""
            }, step.element)
          }
          await page.type(step.element, step.value, { delay: 200 })
          console.log(
            "### Typing '" + step.value + "' - on DOM element: " + step.element
          )
          break

        case "test":
          console.log("$ Running " + step.test.name)
          // TEST A: check whether a request parameter matches a value
          if (step.test.type == "requestMatchRegex") {
            // Test for request to regex match a value
            try {
              // Look at all request objects in the array or only the last one
              const testObject =
                step.test.options.matchAnyRequest == true
                  ? networkRequests[step.test.for]
                  : [
                      networkRequests[step.test.for][
                        networkRequests[step.test.for].length - 1
                      ]
                    ]
              const matchRegex = testObject.map((item) => {
                // If the parameter exists, test for a matching value
                if (item.hasOwnProperty(step.test.match.key)) {
                  const regex = new RegExp(step.test.match.value)

                  if (item[step.test.match.key].match(regex) != null) {
                    return true
                  }
                } else {
                  return false
                }
              })

              //push completed test
              completedTests.push({
                name: step.test.name,
                result: matchRegex.indexOf(true) > -1 ? "PASS" : "FAIL"
              })

              // Log a PASS or FAIL for the test
              //       console.log({
              //         test: {
              //           name: step.test.name,
              //           result:
              //             matchRegex.indexOf(true) > -1
              //               ? chalk.yellow("PASS")
              //               : chalk.red("FAIL")
              //         }
              //       })
            } catch (e) {
              console.error(e)
            }
          }

          // TEST B: check wheter a dataLayer event key matches a specific value
          if (step.test.type == "matchDataLayerKeyValue") {
            try {
              // Get the current dataLayer
              const pageDataLayer = await page.evaluate(() => dataLayer)
              // console.log(pageDataLayer)

              if (!pageDataLayer) {
                console.log(pageDataLayer)
                completedTests.push({
                  name: step.test.name,
                  result: "FAIL"
                })
              } else {
                // (backup = await page.evaluate(() => dataLayer))

                // console.log(backup)

                // Check for existence of a key / value pair in the datalayer
                const result = await pageDataLayer.find(
                  (x) => x[step.test.key] == step.test.value
                )

                completedTests.push({
                  name: step.test.name,
                  result: result === undefined ? "FAIL" : "PASS"
                })
              }
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
          }

          break

        default:
          console.log(
            "This step is not recognised, please use a valid step in your test."
          )
      }
    }
  } catch (e) {
    // Make sure the browser is closed, even on time-outs
    await browser.close()
    //     testSpinner.fail(e)
    throw e
  }
  //add a failed test
  // completedTests.push({ name: "Fail Test", result: "FAIL" })
  await browser.close()
  return completedTests
}

const test1 = {
  name: "Demo Store Tests",
  steps: [
    {
      action: "goto",
      value: "https://enhancedecommerce.appspot.com/"
    },
    {
      action: "test",
      test: {
        name: "Product on homepage",
        description:
          "Check whether the first product's ID on the homepage matches the general format for product ID's",
        for: "GoogleAnalytics",
        type: "requestMatchRegex",
        match: {
          key: "il1pi1id",
          value: "[a-z0-9]{5}"
        },
        options: {
          matchAnyRequest: true
        }
      }
    },
    {
      action: "click",
      element: ".thumbnail a.itemLink"
    },
    {
      action: "wait",
      value: 1000
    },
    {
      action: "click",
      element: "#addToCart"
    },
    {
      action: "test",
      test: {
        name: "Google Analytics Add to Cart event",
        description: "Clicking add to cart on product detail page",
        for: "GoogleAnalytics",
        type: "requestMatchRegex",
        match: {
          key: "ea",
          value: "add_to_cart"
        },
        options: {
          matchAnyRequest: true
        }
      }
    }
  ]
}

const test3 = {
  name: "Stop And Shop Tests",
  steps: [
    {
      action: "goto",
      value: "https://stopandshop.com"
    },
    // {
    //   description: "Open EMPTY shopping cart",
    //   action: "click",
    //   element:
    //     "button.btn.btn--primary.cart-btn.global-header_cart-button-container"
    //   //  element: "div > .global-header-base > .global-header > .global-header_nav"
    //   // button.btn.btn--primary.cart-btn.global-header_cart-button-container
    // },
    // {
    //   action: "wait",
    //   value: 750
    // },
    // {
    //   action: "test",
    //   test: {
    //     name: "DL Test: gt-view-cart",
    //     description: "Clicking on cart should trigger gt-view-cart",
    //     for: "GoogleAnalytics",
    //     type: "matchDataLayerKeyValue",
    //     match: {
    //       key: "event",
    //       value: "gt-view-cart"
    //     }
    //   }
    // },
    // {
    //   description: "Close EMPTY shopping cart",
    //   action: "click",
    //   element: "div.modal_footer > div > div > footer > button"
    // },
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
    // {
    //   description: "Open EMPTY shopping cart",
    //   action: "click",
    //   element:
    //     "button.btn.btn--primary.cart-btn.global-header_cart-button-container"
    //   //  element: "div > .global-header-base > .global-header > .global-header_nav"
    //   // button.btn.btn--primary.cart-btn.global-header_cart-button-container
    // },
    // {
    //   action: "wait",
    //   value: 1000
    // },
    // {
    //   action: "test",
    //   test: {
    //     name: "DL Test: gt-view-cart",
    //     description: "Clicking on cart should trigger gt-view-cart",
    //     for: "GoogleAnalytics",
    //     type: "matchDataLayerKeyValue",
    //     match: {
    //       key: "event",
    //       value: "gt-view-cart"
    //     }
    //   }
    // },
    // {
    //   description: "Close EMPTY shopping cart",
    //   action: "click",
    //   element: "div.modal_footer > div > div > footer > button"
    // }
    // #app > div:nth-child(3) > aside > div > div > div > div.modal_footer > div > div > footer > button
    // #app > div:nth-child(2) > div > header > nav > button.btn.btn--primary.cart-btn.global-header_cart-button-container.btn--small
    //     {
    //       action: "test",
    //       test: {
    //         name: "Google Analytics Add to Cart event",
    //         description: "Clicking add to cart on product detail page",
    //         for: "GoogleAnalytics",
    //         type: "requestMatchRegex",
    //         match: {
    //           key: "ea",
    //           value: "add_to_cart"
    //         },
    //         options: {
    //           matchAnyRequest: true
    //         }
    //       }
    //     }
  ]
}

const options = {
  trackRequests: [
    {
      name: "GoogleAnalytics",
      url: "www.google-analytics.com/collect",
      abortRequest: true
    },
    {
      name: "Facebook",
      url: "www.facebook.com/tr",
      abortRequest: true
    }
  ],

  headless: true
}

const failed = (element) => element.result == "FAIL"
const passed = (element) => element.result == "PASS"

runTest(test3, options)
  .then((results) => {
    console.log("")
    if (results.every(failed)) {
      console.log(chalk.bold.red.underline("ALL Tests Failed!!!".toUpperCase()))
      console.log(results)
    } else if (results.some(failed)) {
      console.log(
        chalk.bold.green.underline("Some Tests Passed:".toUpperCase())
      )
      passedTests = results.filter(passed)
      console.log(passedTests)
      console.log("")
      console.log(chalk.bold.red.underline("Some Tests Failed:".toUpperCase()))
      failedTests = results.filter(failed)
      console.log(failedTests)
    } else {
      console.log(chalk.bold.green("All Tests Passed!".toUpperCase()))
      console.log(results)
    }
    console.log("")
  })
  .catch((e) => {
    console.log(e)
  })

// runTest(test2, options).catch((e) => console.log(e))
const res = [
  { name: "Add to Cart DL Check", result: "PASS" },
  { name: "Remove From Cart DL Check", result: "PASS" },
  { name: "Fail Test", result: "FAIL" },
  { name: "another Fail", result: "FAIL" }
]

const testing = (results) => {
  //   console.log(results)
  console.log("")
  if (results.every(failed)) {
    console.log(chalk.bold.red.underline("ALL Tests Failed!!!".toUpperCase()))
    console.log(results)
  } else if (results.some(failed)) {
    console.log(chalk.bold.green.underline("Some Tests Passed:".toUpperCase()))
    passedTests = results.filter(passed)
    console.log(passedTests)
    console.log("")
    console.log(chalk.bold.red.underline("Some Tests Failed:".toUpperCase()))
    failedTests = results.filter(failed)
    console.log(failedTests)
  } else {
    console.log(chalk.bold.green("All Tests Passed!!!".toUpperCase()))
    console.log(results)
  }
  console.log("")
}

// testing(res)
