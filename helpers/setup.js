import puppeteer from "puppeteer-extra"
// const chalk = require("chalk")
import chalk from "chalk"
// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
import StealthPlugin from "puppeteer-extra-plugin-stealth"

puppeteer.use(StealthPlugin())

export const completedTests = []
export const allEvents = []

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

  headless: true,
  devtools: true,
  slowMo: 0
}

export const initialize = async (startUrl) => {
  const browser = await puppeteer.launch({
    headless: options.headless,
    // devtools: options.devtools,
    // slowMo: options.slowMo || 0,

    args: [
      // "--no-sandbox",
      // "--disable-setuid-sandbox",
      // "--disable-dev-shm-usage"
      // "--single-process"
      //       "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36"
    ]
  })

  // const page = await browser.newPage()
  // await page.goto("https://example.com")
  // await page.screenshot({ path: "example.png" })

  // await browser.close()

  // Open new page in browser for the test to run
  const page = await browser.newPage()
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1
  })

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
    })
  }
  try {
    await page.goto(startUrl, { waitUntil: "networkidle2", timeout: 11000 })
  } catch (e) {
    if (e?.name === "TimeoutError") {
      console.log("page failed to load, retrying...")
      await page.goto(startUrl, { waitUntil: "networkidle2", timeout: 11000 })
    } else {
      console.log("navigation failed.")
    }
  }
  console.log("page loaded!")
  await page.waitForTimeout(1000)
  await page.screenshot({ path: "*initialLoad.png" })
  await page.mouse.wheel({ deltaY: 2000 })
  await page.waitForTimeout(1000)
  await page.screenshot({ path: "*afterScroll.png" })
  await page.mouse.wheel({ deltaY: 2000 })
  await page.waitForTimeout(1000)
  await page.screenshot({ path: "*afterScroll2.png" })
  return [page, browser]
  //   await browser.close()
  //   return completedTests
}
