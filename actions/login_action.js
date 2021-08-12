import { initialize, options } from "../helpers/setup.js"
// import { clickHelper } from "./helper.js"

const startUrl = "https://stopandshop.com"

const [page, browser] = await initialize(startUrl, options)
import { clickHelper } from "./helper.js"

const click = (element) => {
  return clickHelper(page, element)
}

await page.screenshot({ path: "freshStart.png" })
await click("#header-account-button")
await browser.close()
console.log("done!")

const start = async () => {
  const [page, browser] = await initialize(startUrl, options)
  const click = (element) => {
    return clickHelper(page, element)
  }

  console.log("Started!")

  await page.screenshot({ path: "freshStart.png" })
  await click("#header-account-button")
  await click("#nav-sign-in")

  await browser.close()
  return "Done!"
}

// start().then((res) => console.log(res))

const user = "bob@dole.com"
const pass = "Falling1!"
const login = {
  name: "login",
  steps: [
    {
      action: "goto",
      value: "https://stopandshop.com"
    },
    {
      description: "click account login",
      action: "click",
      element: "#header-account-button"
    },
    {
      action: "wait",
      value: 750
    },
    {
      description: "click sub nav account login",
      action: "click",
      element: "#nav-sign-in"
    },
    {
      action: "wait",
      value: 750
    },
    {
      action: "input",
      element: "#login-username",
      value: user
    },
    {
      action: "input",
      element: "#login-password",
      value: pass
    },
    {
      description: "click Sign In",
      action: "click",
      element: "#sign-in-button"
    },
    {
      description: "Dismiss Success popup",
      action: "click",
      element: "#alert-button_primary-button"
    }
  ]
}
