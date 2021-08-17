import { dictionary } from '../helpers/dictionary.js'
// import { DL } from "../helpers/DL.js"
const DL = [
  {
    event: 'gt-dataLayer-initialized',
    pageCategory: 'landing',
    userId: 2,
    userGuid: '',
    userLoggedIn: false,
    zipCode: '06851',
    state: 'CT',
    city: 'Norwalk',
    daysSinceLastOrder: 0,
    numberOfOrders: 0,
    brand: 'STSH',
    customerType: 'C',
    orderStatus: 'WORKING',
    'gtm.uniqueEventId': 55
  },
  {
    'gtm.start': 1628786553530,
    event: 'gtm.js',
    'gtm.uniqueEventId': 84
  },
  {
    event: 'gt-platform',
    pageCategory: 'landing',
    platform: 'web',
    'gtm.uniqueEventId': 111
  },
  {
    event: 'gt-pageview',
    pageURL: '/',
    pageTitle: 'Stop & Shop | Online Grocery Delivery and Pickup | Pharmacy',
    pageCategory: 'ecommerce',
    'gtm.uniqueEventId': 138
  },
  { event: 'gt-home-page', 'gtm.uniqueEventId': 178 },
  { event: 'dli-cid', 'gtm.uniqueEventId': 205 },
  { event: 'gtm.dom', 'gtm.uniqueEventId': 232 },
  { event: 'gt-loyalty-id', 'gtm.uniqueEventId': 259 },
  {
    event: 'session-start',
    ssCartSubtotal: '0.00',
    'gtm.uniqueEventId': 327
  },
  {
    event: 'gt-product-impression',
    ecommerce: { currencyCode: 'USD', impressions: [Array] },
    modelId: 'home1_rr',
    'gtm.uniqueEventId': 358
  },
  {
    event: 'gt-product-impression',
    ecommerce: { currencyCode: 'USD', impressions: [Array] },
    modelId: 'home1_rr',
    'gtm.uniqueEventId': 389
  },
  {
    event: 'c3-set-lasturl',
    'c3-lasturl': 'https://stopandshop.com/',
    'gtm.uniqueEventId': 420
  },
  {
    event: 'clear-algorhytm',
    recommendationAlgorithm: '',
    modelId: '',
    'gtm.uniqueEventId': 447
  },
  {
    event: 'clear-algorhytm',
    recommendationAlgorithm: '',
    modelId: '',
    'gtm.uniqueEventId': 474
  },
  {
    event: 'gtm.click',
    'gtm.element': { _prevClass: 'cart-button-content_text' },
    'gtm.elementClasses': 'cart-button-content_text',
    'gtm.elementId': '',
    'gtm.elementTarget': '',
    'gtm.elementUrl': '',
    'gtm.uniqueEventId': 501
  },
  {
    event: 'gt-virtual-pageview',
    pageTitle: 'Cart Modal',
    pageURL: '/',
    'gtm.uniqueEventId': 735
  },
  {
    event: 'gt-view-cart',
    cartQuantity: 0,
    cartValue: 0,
    itemsInCart: [],
    orderMinimumMet: false,
    'gtm.uniqueEventId': 784
  },
  {
    event: 'gt-product-detail-view',
    ecommerce: {
      currencyCode: 'USD',
      detail: {
        actionField: {
          action: 'detail'
        },
        products: [
          {
            id: 118590, //118590 - check if it's exactly 6 numbers  [ecommerce.detail.products[0].id]
            category: 'Produce',
            variant: '1 EA',
            name: 'Avocados Hass',
            price: 1.66,
            sustainable: false,
            brand: 'USDA Produce',
            ebtEligible: true,
            dimension37: false,
            dimension156: ['ebt']
          }
        ]
      }
    },
    'gtm.uniqueEventId': 753
  }
]

const index = DL.findIndex(e => e.event == 'gt-view-cart')
console.log(index)
console.log(DL[1].event)
// console.log("a.b.etc[0].path".split(".").reduce((o, i) => o[i], obj))
// function indexer(obj, i) {
//   return obj[i]
// }
let obj = { a: { b: { etc: [5, 6, 9] } } }

function indexer (obj, is, value) {
  if (/\[/.test(is))
    return indexer(
      obj,
      is
        .replace(/]/g, '')
        .replace(/\[/g, '.')
        .split('.'),
      value
    )
  if (typeof is == 'string') return indexer(obj, is.split('.'), value)
  else if (is.length == 1 && value !== undefined) return (obj[is[0]] = value)
  else if (is.length == 0) return obj
  else return indexer(obj[is[0]], is.slice(1), value)
}

let stringer = 'a.b.etc[43]'
let fixed = stringer
  .replace(/]/g, '')
  .replace(/\[/g, '.')
  .split('.')
console.log(fixed)
// console.log(fixed.split(".").reduce(indexer, obj))
console.log(indexer(obj, fixed))
console.log(indexer(dictionary[0][2], 'ecommerce.detail.products[0].price'))

function findNestedObject (obj, key, value) {
  // Base case
  if (obj[key] === value) {
    return obj
  } else {
    for (var i = 0, len = Object.keys(obj).length; i < len; i++) {
      if (typeof obj[i] == 'object') {
        var found = findNestedObject(obj[i], key, value)
        if (found) {
          // If the object was found in the recursive call, bubble it up.
          return found
        }
      }
    }
  }
}

// let eventIndex = await pageDataLayer.findIndex((e) => e.event == value)
// eventDetails = await pageDataLayer[eventIndex]

//I can find the object in the DL, and then run tests on it. Now I have to check each Dicitonary value

dictionary.forEach(tag => {
  if (!tag[0].key) return
  console.log(tag[0].key)

  let res = findNestedObject(DL, tag[0].key, tag[0].value)
  console.log('RES')
  console.log(res)
})

import * as tests from './SS-Tests.js/index.js'

// console.log(tests.gtAddToCart())
// let thing = [...tests]

Object.values(tests).forEach(f => console.log(f))

tests.forEach(e => {
  consonle.log(e)
})
// console.log(findNestedObject(DL, dictionary[0][0].key, dictionary[0][0].value))
