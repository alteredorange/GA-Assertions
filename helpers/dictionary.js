export const dictionary = [
  [
    {
      testName: 'gt-product-detail-view',
      description: 'deep check on gt-product-detail-view'
    },
    [
      {
        title: 'ID check',
        description: 'Make sure product ID is exactly 6 digits',
        error: 'Product ID was not formed correctly (6 numbers).',
        dot: 'ecommerce.detail.products[0].id',
        path: ['ecommerce', 'detail', 'products', 0, 'id'],
        regex: /^[0-9]{7}$/ //will fail
        // regex: /^[0-9]{7}$/ //will pass
      },
      {
        title: 'Sustainable flag check',
        description: 'Make sure product sustainable flag is true or false',
        error: 'Product sustainable was not true or false',
        dot: 'ecommerce.detail.products[0].sustainable',
        path: ['ecommerce', 'detail', 'products', 0, 'sustainable'],
        regex: /(true|false)/
      }
    ],
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
              name: 'Pork Tenderloin',
              // price: 1.66,
              sustainable: false,
              // brand: 'USDA Produce',
              ebtEligible: true,
              animal: 'cow',
              dimension37: false,
              dimension156: ['ebt']
            }
          ]
        }
      },
      'gtm.uniqueEventId': 753
    }
  ],
  [
    {
      objectname: 'test'
    }
  ]
]
