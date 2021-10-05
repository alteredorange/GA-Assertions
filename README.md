# GA Assertion Test Proof Of Concept

## Install
Clone repo then `pnpm/npm install`

## Run Stop and Shop Test
`node --no-warnings  ./tests/SS-Runner.js`
(If you don't have connected displays, or are using something like WSL, you might need to turn on headless mode, or it will throw an error. In `helpers/setup.js` change `headless: false,` to `headless: true` in the options array near the top of the file.

## Key Files
`tests/SS-Tests.js` - Runs the Stop and shop tests in parallel.  Each test is it's own exported function (so it can be run by `SS-Runner.js`).
Basically it clicks a CSS selector, and then waits for the expected GA event to fire. 

Some events would obviously be more comple, i.e. `gt-order-placed` would require logging in, adding stuff to cart, and then completing the checkout process.

`helpers/helpers.js` - Contains the two testing funcitons `simpleDLCheck` and `complexDLCheck`. The script is checking the page dataLayer for the expected event. `complexDLCheck` can also check key/value pairs or regex tests from a dictionary file (`helpers/dicitonary.js`). Also contians `parseResults` which is how the results are deisplayed after all tests are completed.

`helpers/setup.js` - Contains the Puppeteer setup details

'tests/SS-Runner.js` - Runs all the tests exported from `tests/SS-Tests.js`. Also contains some parallelization settings, which currently run 5 tests at one time.
