// import { ulid } from "ulid"

import { page, browser } from '../tests/cleansands.js'
import { clickHelper, DLCheckHelper } from './helpers.js'

export const click = async element => {
  let res = await clickHelper(page, element)
  return res
}

export const DLCheck = async (key, value, testName) => {
  let res = await DLCheckHelper(page, testName || value, key, value)
  return res
}
