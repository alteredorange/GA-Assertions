//* ======================================================================== *//
//*                                  working                                 *//
//* ======================================================================== *//

dataLayer.push({
  event: "gt-view-additional-images",
  pageURL: "page.com/grapes",
  marketplaceItem: "yes",
  productName: "Grapes",
  productId: 1233
})
dataLayer.push({
  event: "gt-view-reviews-tab",
  pageURL: "page.com/peanuts",
  marketplaceItem: "yes",
  productName: "peanuts"
})
//label didn't fire (DL-product detail ID: DL product Detail Name )
dataLayer.push({
  event: "gt-view-marketplace-seller",
  pageURL: "page.com/bob",
  productName: "bat", //wouldn't there be multiple products?
  productId: "1255",
  marketplaceSellerName: "Bob",
  marketplaceId: "1455"
})
// label didn't fire (DL-product detail ID: DL product Detail Name )
dataLayer.push({
  event: "gt-marketplace-click-learn-more-link",
  pageURL: "page.com/learn",
  productName: "car",
  productId: "1455"
})
// with marketplace item -- Do we need to add - marketplace details to Action?
dataLayer.push({
  event: "gt-view-cart",
  cartQuantity: 9,
  cartValue: 62.53,
  cartItemsType: "grocery, marketplace",
  groceryitemCount: 2,
  groceryitemTotal: "35.99",
  marketplaceitemCount: 5, //or "5", seems to work with strings and digits, nice!
  marketplaceitemTotal: "24.99",
  itemsInCart: [
    {
      productId: 38796,
      price: 9.99,
      quantity: 1,
      dimension156: "marketplace"
    }
  ]
})
//without marketplace item
dataLayer.push({
  event: "gt-view-cart",
  cartQuantity: 9,
  cartValue: 62.53,
  cartItemsType: "grocery, marketplace",
  groceryitemCount: 2,
  groceryitemTotal: "35.99",
  marketplaceitemCount: 0,
  marketplaceitemTotal: "0",
  itemsInCart: [
    {
      productId: 38796,
      price: 9.99,
      quantity: 1,
      dimension156: "marketplace"
    }
  ]
})
//with marketplace item --just checking marketplaceitemCount -- Do we need to add - marketplace details to Action?
dataLayer.push({
  event: "gt-checkout-step",
  cartQuantity: 9,
  cartValue: 62.53,
  cartItemsType: "grocery, marketplace",
  groceryitemCount: 2,
  groceryitemTotal: "35.99",
  marketplaceitemCount: 5,
  marketplaceitemTotal: "0"
})
//without marketplace item
dataLayer.push({
  event: "gt-checkout-step",
  cartQuantity: 9,
  cartValue: 62.53,
  cartItemsType: "grocery, marketplace",
  groceryitemCount: 2,
  groceryitemTotal: "35.99",
  marketplaceitemCount: 0,
  marketplaceitemTotal: "0"
})
dataLayer.push({
  event: "gt-order-placed",
  userId: 97537740,
  customerType: "C",
  selectedDeliveryTimestamp: 1590796800000,
  tomorrowAvailable: true,
  sameDayAvailable: true,
  daysPresented: 14,
  currentTimestamp: 1590159462000,
  deliveryOption: "pick up",
  ecommerce: {
    currencyCode: "USD",
    cartItemsType: "grocery, marketplace", // main basketId type
    groceryitemCount: 1,
    groceryitemTotal: "4.99",
    purchase: {
      actionField: {
        mainBasketId: "1234",
        id: "45678",
        revenue: 35.92,
        shipping: 0,
        tax: 0,
        coupon: "BUYONETEST"
      },
      products: [
        {
          name: "Bubba Burger Choice Beef",
          id: 140219,
          dimension37: false,
          dimension156: "grocery"
        }
      ]
    }
  }
})
dataLayer.push({
  event: "gt-ship2me-order-placed",
  userId: 97537740,
  customerType: "C",
  selectedDeliveryTimestamp: 1590796800000,
  tomorrowAvailable: true,
  sameDayAvailable: true,
  daysPresented: 14,
  currentTimestamp: 1590159462000,
  deliveryOption: "pick up",
  ecommerce: {
    currencyCode: "USD",
    cartItemsType: "grocery, marketplace", // main basketId type
    groceryitemCount: 1,
    groceryitemTotal: "4.99",
    purchase: {
      actionField: {
        mainBasketId: "1234",
        id: "45678",
        revenue: 35.92,
        shipping: 0,
        tax: 0,
        coupon: "BUYONETEST"
      },
      products: [
        {
          name: "Bubba Burger Choice Beef",
          id: 140219,
          dimension37: false,
          dimension156: "marketplace"
        }
      ]
    }
  }
})
dataLayer.push({
  event: "gt-order-status",
  cartItemsType: "grocery, marketplace",
  transactionId: "12354"
})
dataLayer.push({
  event: "gt-order-history-details",
  transactionId: "m100002893",
  invoiceDate: "Jun 18, 2021",
  orderType: "ship2me",
  hasRefund: undefined,
  EbtPayment: undefined,
  status: "success"
})
dataLayer.push({
  event: "gt-order-history-details-expand",
  isOpen: true
})

dataLayer.push({
  event: "gt-order-details-faq",
  faqLocation: "order_details"
})

dataLayer.push({
  event: "gt-order-details-contact",
  contactType: "phone"
})
dataLayer.push({
  event: "gt-order-details-contact",
  contactType: "email"
})
dataLayer.push({
  event: "gt-order-history-details-report-issue",
  transactionId: "m135967961", // orderId of order
  invoiceDate: "2020-03-27", // date when order was picked up or delivered
  orderType: "pickup" // pickup, delivery, marketplace, in-store, locker (or abbreviate P for pickup, D for delivery, M for marketplace, B for in-store, L for locker)
})
dataLayer.push({
  event: "gt-order-history-details-report-issue",
  transactionId: "m135967961", // orderId of order
  invoiceDate: "2020-03-27", // date when order was picked up or delivered
  orderType: "marketplace" // pickup, delivery, marketplace, in-store, locker (or abbreviate P for pickup, D for delivery, M for marketplace, B for in-store, L for locker)
})

dataLayer.push({
  event: "gt-order-history-details-report-issue-submit",
  transactionId: "m135967961", // orderId of order
  invoiceDate: "2020-03-27", // date when order was picked up or delivered
  orderType: "marketplace" // pickup, delivery, marketplace, in-store, locker (or abbreviate P for pickup, D for delivery, M for marketplace, B for in-store, L for locker)
})
dataLayer.push({
  event: "gt-order-history-return-item",
  ecommerce: {
    currencyCode: "USD",
    add: {
      actionField: {},
      products: [
        {
          name: "Stop & Shop Spinach Microwave",
          id: 194915,
          dimension156: "marketplace" // add to comma-separated values if others exist
        }
      ]
    }
  }
})
dataLayer.push({
  event: "gt-order-history-details-request-return-submit",
  transactionId: "m135967961", // orderId of order
  invoiceDate: "2020-03-27", // date when order was picked up or delivered
  orderType: "pickup", // pickup, delivery, marketplace, in-store, locker (or abbreviate P for pickup, D for delivery, M for marketplace, B for in-store, L for locker)
  topic: "No longer needed" // specific reason selected from dropdown
})

dataLayer.push({
  event: "gt-add-to-cart",
  addToCartLocation: "ORDER_STATUS_SCREEN",
  addToCartType: "start new cart",
  addToCartLocationdetail: "Past Purchases", // e.g. PAST_PURCHASES, SEARCH_BY_KEYWORD, etc
  ecommerce: {
    products: []
  }
})

dataLayer.push({
  event: "gt-remove-from-cart",
  removeFromCartLocation: "ORDER_STATUS_SCREEN",
  ecommerce: {
    products: []
  }
})
dataLayer.push({
  event: "gt-order-update-product-search",
  searchTerm: "bananas",
  numSearchResults: 50,
  searchLocation: "ORDER_STATUS_ADD_ITEMS"
})
//slide 29
dataLayer.push({
  event: "gt-order-update-add-items",
  transactionId: "m135967961",
  marketplaceOrder: "yes"
})
dataLayer.push({
  event: "gt-order-update-change-time",
  transactionId: "m135967961",
  marketplaceOrder: "no"
})
dataLayer.push({
  event: "gt-order-update-cancel-order",
  transactionId: "m135967961",
  marketplaceOrder: "yes"
})
//slide 22 - updated
dataLayer.push({
  event: "gt-order-history-details-expand",
  isOpen: false
})

//* ======================================================================== *//
//*                                Questions                                  *//
//* ======================================================================== *//
//slide 24 says marketplace order no matter what, and marketplaceOrder is crossed out on slide
dataLayer.push({
  event: "gt-order-details-track",
  orderDate: "5-6-2018",
  transactionId: "123546"
})

//Slide 37 - fires [GA - Event - Homepage Order Status - View] but doesn't log any of the values, need a seperate tag?
dataLayer.push({
  event: "gt-hpmodal-orderStatus-view",
  numofOrders: 567,
  numofPickupOrders: 777,
  numOfDeliveryOrders: 789,
  numOfMarketplaceOrders: 678
})

//* ======================================================================== *//
//*                                      Issues                              *//
//* ======================================================================== *//

//slide 32 - No Tags fire
dataLayer.push({
  event: "gt-working-orders",
  orderStatusNumOfOpenOrders: 5
})

// slide 33 & slide 35 - No Tags fire
dataLayer.push({
  event: "gt-cart-update-existing-order",
  transactionId: "123546",
  addToCartType: "add to existing"
})

// can't access slide 36 (DAWS-1195)

//* ======================================================================== *//
//*                   No tag Fired - Ok For Now                              *//
//* ======================================================================== *//
//slide 5
dataLayer.push({
  event: "gt-pdp-image-scroll",
  marketplaceItem: "yes",
  pageURL: "page.com",
  productName: "Avacados"
})

// slide 7
dataLayer.push({
  event: "gt-zoom-into-image",
  pageURL: "page.com/apples",
  marketplaceItem: "yes",
  productName: "apples"
})
