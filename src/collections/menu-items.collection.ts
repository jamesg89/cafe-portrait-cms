import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'menu-items',
  displayName: 'Menu Items',
  description: 'Individual menu items',

  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', title: 'Name', required: true },
      description: { type: 'string', title: 'Description' },
      price: { type: 'string', title: 'Price', required: true },
      category: { type: 'reference', title: 'Category', required: true, collection: 'menu-categories' },
      sortOrder: { type: 'number', title: 'Sort Order', required: true },
    },
    required: ['name', 'price', 'category', 'sortOrder']
  },

  listFields: ['name', 'price', 'category', 'sortOrder'],
  searchFields: ['name', 'description'],
  defaultSort: 'sortOrder',
  defaultSortOrder: 'asc',
} satisfies CollectionConfig
