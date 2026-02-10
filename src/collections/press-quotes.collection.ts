import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'press-quotes',
  displayName: 'Press Quotes',
  description: 'Press and media quotes',

  schema: {
    type: 'object',
    properties: {
      quote: { type: 'string', title: 'Quote', required: true },
      attribution: { type: 'string', title: 'Attribution', required: true },
    },
    required: ['quote', 'attribution']
  },

  listFields: ['quote', 'attribution'],
  searchFields: ['quote', 'attribution'],
} satisfies CollectionConfig
