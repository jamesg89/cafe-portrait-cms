import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'menu-items',
  displayName: 'Menu Items',
  description: 'Individual menu items',

  schema: {
    type: 'object',
    properties: {
      name:        { type: 'string', title: 'Name', required: true },
      description: { type: 'string', title: 'Description' },
      price:       { type: 'string', title: 'Price (e.g. "$5.50", can be empty)' },
      category:    { type: 'string', title: 'Category (menu-categories record id)', required: true },
      sortOrder:   { type: 'number', title: 'Sort Order', required: true },
    },
    required: ['name', 'category', 'sortOrder'],
  },

  listFields: ['name', 'price', 'category', 'sortOrder'],
  searchFields: ['name', 'description'],
  defaultSort: 'sortOrder',
  defaultSortOrder: 'asc',
} satisfies CollectionConfig
